import { POST } from "./route";

const endpoint = "https://portfolio.test/api/contact";
const valid = { name: "Test visitor", email: "visitor@example.com", message: "A project inquiry for testing." };
const request = (fields = valid, headers: Record<string, string> = {}) => new Request(endpoint, {
  method: "POST",
  headers: { origin: "https://portfolio.test", "content-type": "application/x-www-form-urlencoded", ...headers },
  body: new URLSearchParams(fields),
});

const originalKey = process.env.FORM_ACCESS_KEY;
const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.FORM_ACCESS_KEY;
  else process.env.FORM_ACCESS_KEY = originalKey;
});

test("rejects cross-site requests, invalid fields, and oversized bodies before contacting the provider", async () => {
  const send = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();
  global.fetch = send;
  expect((await POST(request(valid, { origin: "https://attacker.test" }))).status).toBe(403);
  expect((await POST(request(valid, { "content-type": "application/json" }))).status).toBe(415);
  expect((await POST(request({ ...valid, email: "invalid" }))).status).toBe(400);
  expect((await POST(request({ ...valid, name: "Injected\r\nname" }))).status).toBe(400);
  expect((await POST(request(valid, { "content-length": "20000" }))).status).toBe(413);
  expect((await POST(request({ ...valid, message: "x".repeat(20_000) }))).status).toBe(413);
  expect(send).not.toHaveBeenCalled();
});

test("keeps provider credentials and forwarding fields under server control", async () => {
  process.env.FORM_ACCESS_KEY = "test-key";
  const send = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>().mockResolvedValue(Response.json({ success: true }));
  global.fetch = send;
  const response = await POST(request({ ...valid, ...{ access_key: "attacker-key", redirect: "https://attacker.test", subject: "override" } }));
  expect(response.status).toBe(200);
  const forwarded = send.mock.calls[0][1]?.body as FormData;
  expect(forwarded.get("access_key")).toBe("test-key");
  expect(forwarded.get("redirect")).toBeNull();
  expect(forwarded.get("subject")).toBe("New portfolio inquiry from ahmedakram.com");
});

test("fails closed without configuration or when the provider fails", async () => {
  delete process.env.FORM_ACCESS_KEY;
  expect((await POST(request())).status).toBe(503);
  process.env.FORM_ACCESS_KEY = "test-key";
  global.fetch = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>().mockResolvedValue(Response.json({ success: false, message: "private upstream detail" }));
  const response = await POST(request());
  expect(response.status).toBe(502);
  expect(await response.text()).not.toContain("private upstream detail");
  global.fetch = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>().mockRejectedValue(new Error("timeout"));
  expect((await POST(request())).status).toBe(502);
});
