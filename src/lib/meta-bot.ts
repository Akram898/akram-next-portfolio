import crypto from "node:crypto";

/* Comment-to-DM bot logic for Instagram and Facebook, kept free of network and
   filesystem calls so it can be tested on its own. The route in
   src/app/api/meta-webhook does the I/O. */

export type Lang = "en" | "ar";

export type KeywordGuide = { keyword: string; slug: string; title: string };

export type CommentEvent = {
  platform: "instagram" | "facebook";
  /** Instagram professional account ID or Facebook Page ID that received the comment. */
  accountId: string;
  commentId: string;
  text: string;
  fromId: string;
  fromUsername?: string;
};

const SITE = "https://ahmedakram.com";

/** Language of the DMs each account sends. Accounts not listed use "en". */
export const ACCOUNT_LANG: Record<string, Lang> = {
  "thearabicakram.ai": "ar",
  "theakram.ai": "en",
  // Facebook Pages, by Page name in lower case.
  "the akram ai بالعربي": "ar",
  "the akram ai": "en",
};

/** Upper-cased words of a comment, with punctuation and emoji removed. */
export function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .toUpperCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

/** The guide whose keyword appears as a whole word in the comment, or null.
 *  When several match, the longest keyword wins (SEEDANCE20 over AI). */
export function matchGuide(text: string, guides: KeywordGuide[]): KeywordGuide | null {
  const said = new Set(words(text));
  let best: KeywordGuide | null = null;
  for (const g of guides) {
    const key = g.keyword.trim().toUpperCase();
    if (key && said.has(key) && (!best || key.length > best.keyword.length)) best = g;
  }
  return best;
}

export function guideUrl(slug: string, platform: CommentEvent["platform"]): string {
  const params = new URLSearchParams({ utm_source: platform, utm_medium: "dm", utm_campaign: "comment" });
  return `${SITE}/guides/${encodeURIComponent(slug)}?${params}`;
}

export function dmText(guide: KeywordGuide, lang: Lang, platform: CommentEvent["platform"]): string {
  const url = guideUrl(guide.slug, platform);
  return lang === "ar"
    ? `أهلاً 👋 ده الدليل الكامل اللي طلبته (${guide.keyword}):\n\n${guide.title}\n${url}\n\nلو عندك أي سؤال ابعتهولي هنا.`
    : `Hey 👋 here's the full guide you asked for (${guide.keyword}):\n\n${guide.title}\n${url}\n\nAny questions, just reply here.`;
}

const PUBLIC_REPLIES: Record<Lang, string[]> = {
  en: ["Sent it to your DMs 📩", "Check your DMs 🙌", "Just sent you the link 📩", "It's in your inbox 👀"],
  ar: ["بعتلك الرابط في الرسايل 📩", "شوف الرسايل 🙌", "الرابط عندك في الخاص 📩", "بعتهولك في الدايركت 👀"],
};

/** A short public reply under the comment. Picked by comment ID so retries say the same thing. */
export function publicReply(commentId: string, lang: Lang): string {
  const options = PUBLIC_REPLIES[lang];
  const n = [...commentId].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return options[n % options.length];
}

/** True when X-Hub-Signature-256 matches the raw body for any of the given app secrets.
 *  Instagram Login webhooks are signed with the Instagram app secret and Page webhooks
 *  with the Meta app secret, so both are accepted. */
export function validSignature(rawBody: string, header: string | null, secrets: string[]): boolean {
  if (!header?.startsWith("sha256=")) return false;
  const given = Buffer.from(header.slice(7), "hex");
  return secrets.filter(Boolean).some((secret) => {
    const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest();
    return expected.length === given.length && crypto.timingSafeEqual(expected, given);
  });
}

type Json = Record<string, any>;

/** New comments in a webhook payload, from Instagram (`object: instagram`) or a
 *  Facebook Page feed (`object: page`). Everything else is ignored. */
export function extractComments(payload: Json): CommentEvent[] {
  const out: CommentEvent[] = [];
  const entries: Json[] = Array.isArray(payload?.entry) ? payload.entry : [];

  for (const entry of entries) {
    const accountId = String(entry?.id ?? "");
    const changes: Json[] = Array.isArray(entry?.changes) ? entry.changes : [];
    for (const change of changes) {
      const v = change?.value ?? {};
      if (payload.object === "instagram" && change?.field === "comments" && v.id && v.text) {
        out.push({
          platform: "instagram",
          accountId,
          commentId: String(v.id),
          text: String(v.text),
          fromId: String(v.from?.id ?? ""),
          fromUsername: v.from?.username ? String(v.from.username) : undefined,
        });
      }
      if (
        payload.object === "page" && change?.field === "feed" &&
        v.item === "comment" && v.verb === "add" && v.comment_id && v.message
      ) {
        out.push({
          platform: "facebook",
          accountId,
          commentId: String(v.comment_id),
          text: String(v.message),
          fromId: String(v.from?.id ?? ""),
        });
      }
    }
  }
  return out;
}
