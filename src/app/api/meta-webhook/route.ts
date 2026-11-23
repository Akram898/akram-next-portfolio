import { getAllGuides } from "@/lib/guides";
import {
  ACCOUNT_LANG, dmText, extractComments, matchGuide, publicReply, validSignature,
  type CommentEvent, type KeywordGuide, type Lang,
} from "@/lib/meta-bot";

/* Meta webhook for comment-to-DM replies (replaces ManyChat).
   GET  = Meta's one-time verification handshake.
   POST = comment events from Instagram (comments field) and Facebook Pages (feed field).

   Env vars, set in Vercel and in .env.local in this folder:
     META_VERIFY_TOKEN       any string you choose; pasted into the Meta Webhooks form
     META_APP_SECRET         App settings > Basic > App secret (signs Page webhooks)
     INSTAGRAM_APP_SECRET    Instagram > API setup with Instagram login > Instagram app secret
     IG_TOKEN_<NAME>         one Instagram access token per Instagram account
     FB_PAGE_TOKEN_<NAME>    one Page access token per Facebook Page
     META_GRAPH_VERSION      optional, default v23.0
     META_PUBLIC_REPLY       optional, "off" disables the public "check your DMs" reply */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = process.env.META_GRAPH_VERSION || "v23.0";
const IG = `https://graph.instagram.com/${VERSION}`;
const FB = `https://graph.facebook.com/${VERSION}`;

type Account = { token: string; lang: Lang; ids: string[]; name: string };

let accountsPromise: Promise<Map<string, Account>> | null = null;
let guidesCache: KeywordGuide[] | null = null;

function tokensWithPrefix(prefix: string): string[] {
  return Object.entries(process.env)
    .filter(([k, v]) => k.startsWith(prefix) && v)
    .map(([, v]) => String(v).trim());
}

async function graphGet(url: string, token: string): Promise<Record<string, any>> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? `HTTP ${res.status}`);
  return data;
}

/** Looks up which account each token belongs to, once per server instance. */
function loadAccounts(): Promise<Map<string, Account>> {
  accountsPromise ??= (async () => {
    const map = new Map<string, Account>();
    const add = (a: Account) => a.ids.filter(Boolean).forEach((id) => map.set(id, a));

    await Promise.all([
      ...tokensWithPrefix("IG_TOKEN_").map(async (token) => {
        try {
          const me = await graphGet(`${IG}/me?fields=user_id,username`, token);
          const name = String(me.username ?? "");
          add({ token, name, lang: ACCOUNT_LANG[name.toLowerCase()] ?? "en", ids: [String(me.user_id ?? ""), String(me.id ?? "")] });
        } catch (e) {
          console.error("[meta-webhook] an IG_TOKEN_ value failed /me:", (e as Error).message);
        }
      }),
      ...tokensWithPrefix("FB_PAGE_TOKEN_").map(async (token) => {
        try {
          const me = await graphGet(`${FB}/me?fields=id,name`, token);
          const name = String(me.name ?? "");
          add({ token, name, lang: ACCOUNT_LANG[name.toLowerCase()] ?? "en", ids: [String(me.id ?? "")] });
        } catch (e) {
          console.error("[meta-webhook] an FB_PAGE_TOKEN_ value failed /me:", (e as Error).message);
        }
      }),
    ]);
    if (map.size === 0) accountsPromise = null; // retry on the next event
    return map;
  })();
  return accountsPromise;
}

function guides(): KeywordGuide[] {
  guidesCache ??= getAllGuides().map(({ keyword, slug, title }) => ({ keyword, slug, title }));
  return guidesCache;
}

async function post(url: string, token: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error?.message ?? `HTTP ${res.status}`);
  }
}

async function handle(event: CommentEvent, accounts: Map<string, Account>): Promise<void> {
  const account = accounts.get(event.accountId);
  if (!account) {
    console.warn(`[meta-webhook] no token for account ${event.accountId}`);
    return;
  }
  // Never answer our own comments, including the public replies this bot posts.
  if (event.fromId === event.accountId || (event.fromUsername && event.fromUsername === account.name)) return;

  const guide = matchGuide(event.text, guides());
  if (!guide) return;

  const ig = event.platform === "instagram";
  const message = { text: dmText(guide, account.lang, event.platform) };
  try {
    await post(`${ig ? IG : FB}/${event.accountId}/messages`, account.token,
      { recipient: { comment_id: event.commentId }, message });
    console.log(`[meta-webhook] DM sent: ${event.platform} ${account.name} ${guide.keyword} comment=${event.commentId}`);
  } catch (e) {
    // Meta allows one private reply per comment, so a retried webhook lands here harmlessly.
    console.error(`[meta-webhook] DM failed: ${event.platform} ${account.name} comment=${event.commentId}:`, (e as Error).message);
    return;
  }

  if (process.env.META_PUBLIC_REPLY === "off") return;
  try {
    const text = publicReply(event.commentId, account.lang);
    await post(ig ? `${IG}/${event.commentId}/replies` : `${FB}/${event.commentId}/comments`,
      account.token, { message: text });
  } catch (e) {
    console.error(`[meta-webhook] public reply failed comment=${event.commentId}:`, (e as Error).message);
  }
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const expected = process.env.META_VERIFY_TOKEN;
  if (q.get("hub.mode") === "subscribe" && expected && q.get("hub.verify_token") === expected) {
    return new Response(q.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const raw = await request.text();
  const secrets = [process.env.META_APP_SECRET ?? "", process.env.INSTAGRAM_APP_SECRET ?? ""];
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"), secrets)) {
    return new Response("Bad signature", { status: 401 });
  }

  let payload: Record<string, any>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const events = extractComments(payload);
  if (events.length > 0) {
    const accounts = await loadAccounts();
    await Promise.all(events.map((e) => handle(e, accounts)));
  }
  // Always 200 once the signature is good, or Meta retries and eventually disables the hook.
  return new Response("EVENT_RECEIVED", { status: 200 });
}
