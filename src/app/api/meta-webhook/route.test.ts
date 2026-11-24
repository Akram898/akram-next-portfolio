import crypto from "node:crypto";

jest.mock("@/lib/guides", () => ({
  getAllGuides: () => [{ keyword: "OPUS", slug: "opus-5-5", title: "Opus 5.5 guide" }],
}));

type Route = typeof import("./route");
const URL_ = "https://ahmedakram.test/api/meta-webhook";
const SECRET = "test-app-secret";

const ENV_KEYS = ["META_VERIFY_TOKEN", "META_APP_SECRET", "INSTAGRAM_APP_SECRET", "FB_PAGE_TOKEN_TEST", "META_PUBLIC_REPLY"];
const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
const originalFetch = global.fetch;

/** A fresh copy of the route, so its per-instance token cache starts empty. */
function load(): Route {
  let mod!: Route;
  jest.isolateModules(() => { mod = require("./route"); });
  return mod;
}

function signed(body: unknown, secret = SECRET): Request {
  const raw = JSON.stringify(body);
  const sig = "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
  return new Request(URL_, { method: "POST", headers: { "x-hub-signature-256": sig, "content-type": "application/json" }, body: raw });
}

const pageComment = (text: string) => ({
  object: "page",
  entry: [{ id: "p1", changes: [{ field: "feed", value: { item: "comment", verb: "add", comment_id: "c1", message: text, from: { id: "u9" } } }] }],
});

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

beforeEach(() => ENV_KEYS.forEach((k) => delete process.env[k]));
afterEach(() => {
  global.fetch = originalFetch;
  for (const [k, v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
});

test("verification answers only Meta's handshake with the right token", async () => {
  const { GET } = load();
  const q = (token: string, challenge = "12345") =>
    new Request(`${URL_}?hub.mode=subscribe&hub.verify_token=${encodeURIComponent(token)}&hub.challenge=${encodeURIComponent(challenge)}`);

  expect((await GET(q("anything"))).status).toBe(403); // not configured
  process.env.META_VERIFY_TOKEN = "right-token";
  expect((await GET(q("wrong"))).status).toBe(403);
  const ok = await GET(q("right-token"));
  expect(ok.status).toBe(200);
  expect(await ok.text()).toBe("12345");
  expect((await GET(q("right-token", "<script>alert(1)</script>"))).status).toBe(403);
});

test("rejects every POST without a valid Meta signature and never calls Meta", async () => {
  const send = jest.fn();
  global.fetch = send as unknown as typeof fetch;
  const { POST } = load();

  expect((await POST(signed(pageComment("OPUS")))).status).toBe(401); // no secret configured
  process.env.META_APP_SECRET = SECRET;
  expect((await POST(signed(pageComment("OPUS"), "attacker-secret"))).status).toBe(401);
  expect((await POST(new Request(URL_, { method: "POST", body: "{}" }))).status).toBe(401);
  expect((await POST(new Request(URL_, { method: "POST", headers: { "content-length": "5000000" }, body: "{}" }))).status).toBe(413);
  expect(send).not.toHaveBeenCalled();
});

test("a signed event with no tokens configured is acknowledged and ignored", async () => {
  const send = jest.fn();
  global.fetch = send as unknown as typeof fetch;
  process.env.META_APP_SECRET = SECRET;
  const { POST } = load();
  expect((await POST(signed(pageComment("OPUS")))).status).toBe(200);
  expect(send).not.toHaveBeenCalled();
});

test("an expired token is logged, Meta still gets 200, and nothing is sent", async () => {
  process.env.META_APP_SECRET = SECRET;
  process.env.FB_PAGE_TOKEN_TEST = "expired";
  const calls: string[] = [];
  global.fetch = (async (url: string) => {
    calls.push(String(url));
    return json(400, { error: { message: "Session has expired", code: 190 } });
  }) as unknown as typeof fetch;
  const err = jest.spyOn(console, "error").mockImplementation(() => {});
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const { POST } = load();

  expect((await POST(signed(pageComment("OPUS")))).status).toBe(200);
  expect(calls.every((u) => u.includes("/me?"))).toBe(true);
  err.mockRestore(); warn.mockRestore();
});

test("a keyword comment on a Page gets a private reply and a public reply", async () => {
  process.env.META_APP_SECRET = SECRET;
  process.env.FB_PAGE_TOKEN_TEST = "page-token";
  const posts: { url: string; body: any }[] = [];
  global.fetch = (async (url: string, init?: RequestInit) => {
    if (init?.method === "POST") { posts.push({ url: String(url), body: JSON.parse(String(init.body)) }); return json(200, { id: "ok" }); }
    return json(200, { id: "p1", name: "The Akram AI" });
  }) as unknown as typeof fetch;
  const log = jest.spyOn(console, "log").mockImplementation(() => {});
  const { POST } = load();

  expect((await POST(signed(pageComment("send me OPUS please")))).status).toBe(200);
  expect(posts[0].url).toMatch(/\/p1\/messages$/);
  expect(posts[0].body.recipient).toEqual({ comment_id: "c1" });
  expect(posts[0].body.message.text).toContain("/guides/");
  expect(posts[1].url).toMatch(/\/c1\/comments$/);
  log.mockRestore();
});
