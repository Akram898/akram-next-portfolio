import crypto from "node:crypto";
import { getAllGuides } from "@/lib/guides";
import {
  ACCOUNT_LANG, dmText, extractComments, matchGuide, publicReply, validSignature,
  type CommentEvent, type KeywordGuide, type Lang,
} from "@/lib/meta-bot";

/* Meta webhook for comment-to-DM replies (replaces ManyChat).
   GET  = Meta's one-time verification handshake.
   POST = comment events from Instagram (comments field) and Facebook Pages (feed field).

   Security: GET answers only with the exact verify token; POST is accepted only when
   X-Hub-Signature-256 is a valid HMAC of the body with our app secret, which only Meta
   has. Without those env vars the route rejects everything and the rest of the site is
   unaffected. A missing or expired token disables only that account; the others keep working.

   Env vars, set in Vercel and in .env.local in this folder:
     META_VERIFY_TOKEN       any string you choose; pasted into the Meta Webhooks form
     META_APP_SECRET         App settings > Basic > App secret (signs Page and Instagram webhooks)
     INSTAGRAM_APP_SECRET    optional; Instagram app secret, only for Instagram Login webhooks
     IG_TOKEN_<NAME>         optional; an Instagram Login token per Instagram account
     FB_PAGE_TOKEN_<NAME>    a Page access token per Facebook Page (also serves its linked Instagram)
     META_GRAPH_VERSION      optional, default v23.0
     META_PUBLIC_REPLY       optional, "off" disables the public "check your DMs" reply */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = process.env.META_GRAPH_VERSION || "v23.0";
const IG = `https://graph.instagram.com/${VERSION}`;
const FB = `https://graph.facebook.com/${VERSION}`;
const MAX_BODY = 1_000_000; // Meta's comment payloads are a few KB.
const ACCOUNTS_TTL_MS = 15 * 60_000; // re-check tokens every 15 minutes per server instance

/** via "instagram": an Instagram Login token (graph.instagram.com).
 *  via "page": a Facebook Page token, which also serves the Instagram account linked to
 *  that Page through graph.facebook.com; pageId is that Page. */
type Account = { token: string; lang: Lang; ids: string[]; name: string; via: "instagram" | "page"; pageId?: string };

let accountsPromise: Promise<Map<string, Account>> | null = null;
let accountsLoadedAt = 0;
let guidesCache: KeywordGuide[] | null = null;

class GraphError extends Error {
  constructor(message: string, readonly code?: number) { super(message); }
  /** Expired, revoked or invalid token. */
  get isAuth(): boolean { return this.code === 190 || this.code === 102; }
}

function tokensWithPrefix(prefix: string): string[] {
  return Object.entries(process.env)
    .filter(([k, v]) => k.startsWith(prefix) && v && v.trim())
    .map(([, v]) => String(v).trim());
}

async function graph(url: string, token: string, body?: unknown): Promise<Record<string, any>> {
  const res = await fetch(url, {
    method: body === undefined ? "GET" : "POST",
    headers: { Authorization: `Bearer ${token}`, ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new GraphError(data?.error?.message ?? `HTTP ${res.status}`, data?.error?.code);
  return data;
}

/** Which account each token belongs to. Cached per server instance, refreshed every
 *  15 minutes, and dropped at once when a token turns out to be expired. */
function loadAccounts(): Promise<Map<string, Account>> {
  if (accountsPromise && Date.now() - accountsLoadedAt > ACCOUNTS_TTL_MS) accountsPromise = null;
  accountsPromise ??= (async () => {
    accountsLoadedAt = Date.now();
    const map = new Map<string, Account>();
    const add = (a: Account) => a.ids.filter(Boolean).forEach((id) => map.set(id, a));

    // Instagram Login tokens first, so they take priority over a Page's linked Instagram account.
    await Promise.allSettled(
      tokensWithPrefix("IG_TOKEN_").map(async (token) => {
        try {
          const me = await graph(`${IG}/me?fields=user_id,username`, token);
          const name = String(me.username ?? "");
          add({ token, name, via: "instagram", lang: ACCOUNT_LANG[name.toLowerCase()] ?? "en", ids: [String(me.user_id ?? ""), String(me.id ?? "")] });
        } catch (e) {
          console.error("[meta-webhook] an IG_TOKEN_ value failed /me:", (e as Error).message);
        }
      }),
    );
    await Promise.allSettled(
      tokensWithPrefix("FB_PAGE_TOKEN_").map(async (token) => {
        try {
          const me = await graph(`${FB}/me?fields=id,name,instagram_business_account{id,username}`, token);
          const name = String(me.name ?? "");
          const pageId = String(me.id ?? "");
          add({ token, name, via: "page", pageId, lang: ACCOUNT_LANG[name.toLowerCase()] ?? "en", ids: [pageId] });
          // The Instagram account linked to this Page, unless an IG_TOKEN_ already covers it.
          const ig = me.instagram_business_account;
          if (ig?.id && !map.has(String(ig.id))) {
            const igName = String(ig.username ?? "");
            add({ token, name: igName, via: "page", pageId, lang: ACCOUNT_LANG[igName.toLowerCase()] ?? "en", ids: [String(ig.id)] });
          }
        } catch (e) {
          console.error("[meta-webhook] an FB_PAGE_TOKEN_ value failed /me:", (e as Error).message);
        }
      }),
    );
    if (map.size === 0) {
      console.warn("[meta-webhook] no working IG_TOKEN_ or FB_PAGE_TOKEN_; comments are ignored until one is set");
      accountsPromise = null; // try again on the next event
    }
    return map;
  })();
  return accountsPromise;
}

function guides(): KeywordGuide[] {
  guidesCache ??= getAllGuides().map(({ keyword, slug, title }) => ({ keyword, slug, title }));
  return guidesCache;
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
  const viaIgLogin = ig && account.via === "instagram";
  // Instagram Login tokens use graph.instagram.com; Page tokens send from the Page,
  // including for the Instagram account linked to it.
  const dmUrl = viaIgLogin ? `${IG}/${event.accountId}/messages` : `${FB}/${account.pageId ?? event.accountId}/messages`;
  const replyUrl = viaIgLogin ? `${IG}/${event.commentId}/replies`
    : ig ? `${FB}/${event.commentId}/replies` : `${FB}/${event.commentId}/comments`;
  const message = { text: dmText(guide, account.lang, event.platform) };
  try {
    await graph(dmUrl, account.token, { recipient: { comment_id: event.commentId }, message });
    console.log(`[meta-webhook] DM sent: ${event.platform} ${account.name} ${guide.keyword} comment=${event.commentId}`);
  } catch (e) {
    if (e instanceof GraphError && e.isAuth) accountsPromise = null; // re-check tokens next time
    // Meta allows one private reply per comment, so a retried webhook lands here harmlessly.
    console.error(`[meta-webhook] DM failed: ${event.platform} ${account.name} comment=${event.commentId}:`, (e as Error).message);
    return;
  }

  if (process.env.META_PUBLIC_REPLY === "off") return;
  try {
    await graph(replyUrl, account.token, { message: publicReply(event.commentId, account.lang) });
  } catch (e) {
    // Needs pages_manage_engagement on Facebook; the DM above has already gone out.
    console.error(`[meta-webhook] public reply failed comment=${event.commentId}:`, (e as Error).message);
  }
}

function sameText(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const expected = process.env.META_VERIFY_TOKEN?.trim();
  const challenge = q.get("hub.challenge") ?? "";
  if (
    expected && q.get("hub.mode") === "subscribe" && sameText(q.get("hub.verify_token") ?? "", expected) &&
    /^[A-Za-z0-9_-]{1,128}$/.test(challenge) // Meta sends a number; never echo anything else
  ) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) {
    return new Response("Too large", { status: 413 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) return new Response("Too large", { status: 413 });

  const secrets = [process.env.META_APP_SECRET ?? "", process.env.INSTAGRAM_APP_SECRET ?? ""].map((s) => s.trim());
  if (!secrets.some(Boolean)) {
    console.error("[meta-webhook] META_APP_SECRET is not set; rejecting webhook");
    return new Response("Not configured", { status: 401 });
  }
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"), secrets)) {
    return new Response("Bad signature", { status: 401 });
  }

  let payload: Record<string, any>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  // Once the signature is good, always answer 200: otherwise Meta retries and eventually
  // disables the webhook. Failures are logged instead.
  try {
    const events = extractComments(payload);
    if (events.length > 0) {
      const accounts = await loadAccounts();
      await Promise.allSettled(events.map((e) => handle(e, accounts)));
    }
  } catch (e) {
    console.error("[meta-webhook] handling failed:", (e as Error).message);
  }
  return new Response("EVENT_RECEIVED", { status: 200 });
}
