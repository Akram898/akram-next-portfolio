import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 16_384;
const fail = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(request: Request) {
  // This endpoint is for the site's own form, including trusted preview hosts.
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return fail("Please send your inquiry from this website.", 403);
  }
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^(application\/x-www-form-urlencoded|multipart\/form-data)(;|$)/i.test(contentType)) {
    return fail("Unsupported form format.", 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return fail("Your message is too large.", 413);
  }

  let form: FormData;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("A message is required.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return fail("Your message is too large.", 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
    form = await new Response(body, { headers: { "content-type": contentType } }).formData();
  } catch {
    return fail("Unable to read your message.", 400);
  }

  const text = (key: string) => typeof form.get(key) === "string" ? String(form.get(key)).trim() : "";
  if (text("botcheck")) return NextResponse.json({ success: true });
  const name = text("name");
  const email = text("email");
  const message = text("message");
  if (!name || name.length > 100 || /[\r\n]/.test(name) ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 10 || message.length > 5000) {
    return fail("Please include your name, a valid email, and a message of 10 to 5,000 characters.", 400);
  }

  const accessKey = process.env.FORM_ACCESS_KEY;
  if (!accessKey) return fail("Please use the direct email link to get in touch.", 503);

  // Only forward known fields; visitors cannot override recipients or redirects.
  const payload = new FormData();
  for (const [key, value] of Object.entries({
    name, email, message, access_key: accessKey,
    subject: "New portfolio inquiry from ahmedakram.com",
    from_name: "Ahmed Akram Portfolio",
  })) payload.set(key, value);
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST", body: payload, cache: "no-store", signal: AbortSignal.timeout(10_000),
    });
    const data = await response.json();
    if (!response.ok || data.success !== true) return fail("Unable to send your message. Please use the direct email link.", 502);
    return NextResponse.json({ success: true });
  } catch {
    return fail("Unable to send your message. Please use the direct email link.", 502);
  }
}
