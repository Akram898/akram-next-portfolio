// One-time setup for the comment-to-DM bot. Run from this folder:
//   node --env-file=.env.local scripts/meta-setup.mjs
// For each token it shows which account it belongs to and subscribes that account
// to comment webhooks. Prints names and IDs only, never the tokens.

const VERSION = process.env.META_GRAPH_VERSION || "v23.0";

async function call(method, url, token) {
  const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message ?? `HTTP ${res.status}`);
  return data;
}

const tokens = (prefix) =>
  Object.entries(process.env).filter(([k, v]) => k.startsWith(prefix) && v).map(([k, v]) => [k, v.trim()]);

const missing = ["META_VERIFY_TOKEN", "META_APP_SECRET", "INSTAGRAM_APP_SECRET"].filter((k) => !process.env[k]);
if (missing.length) console.log(`Not set yet: ${missing.join(", ")}`);

for (const [name, token] of tokens("IG_TOKEN_")) {
  const base = `https://graph.instagram.com/${VERSION}`;
  try {
    const me = await call("GET", `${base}/me?fields=user_id,username`, token);
    await call("POST", `${base}/me/subscribed_apps?subscribed_fields=comments,messages`, token);
    console.log(`OK  ${name}: @${me.username} (id ${me.user_id}) subscribed to comments + messages`);
  } catch (e) {
    console.log(`ERR ${name}: ${e.message}`);
  }
}

for (const [name, token] of tokens("FB_PAGE_TOKEN_")) {
  const base = `https://graph.facebook.com/${VERSION}`;
  try {
    const me = await call("GET", `${base}/me?fields=id,name`, token);
    await call("POST", `${base}/${me.id}/subscribed_apps?subscribed_fields=feed,messages`, token);
    console.log(`OK  ${name}: Page "${me.name}" (id ${me.id}) subscribed to feed + messages`);
  } catch (e) {
    console.log(`ERR ${name}: ${e.message}`);
  }
}

if (!tokens("IG_TOKEN_").length && !tokens("FB_PAGE_TOKEN_").length) {
  console.log("No IG_TOKEN_* or FB_PAGE_TOKEN_* found in .env.local yet.");
}
