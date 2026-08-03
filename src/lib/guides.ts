import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/* Guides are plain markdown parsed at build time in a Server Component, so the rendered
   HTML ships as static output and no markdown parser reaches the client bundle.

   Markdown, not MDX, on purpose: guide bodies are full of code and type signatures, and
   MDX parses `<` as JSX and `{` as an expression. A guide containing `Array<Tool>` or a
   JSON snippet outside a fence would hard-fail the Vercel build — a content system that
   breaks on its own subject matter is not usable here. */

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export type GuideVideo = {
  platform?: string;
  url?: string;
};

export type GuideMeta = {
  /** From the FILENAME. Never duplicated in frontmatter — one fact, one source. */
  slug: string;
  title: string;
  /** ManyChat trigger and the join key back to the video manifest. Unique across all guides. */
  keyword: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  tone: string;
  video: GuideVideo | null;
  status: "live" | "draft";
};

export type Guide = GuideMeta & { html: string };

function readDir(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parse(slug: string): Guide | null {
  const file = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  // A guide missing its keyword cannot be joined to a video or a ManyChat trigger, and a
  // guide with no title renders a blank card. Fail the build rather than ship either.
  for (const field of ["title", "keyword", "summary"] as const) {
    if (!data[field]) {
      throw new Error(
        `content/guides/${slug}.md is missing required frontmatter: ${field}`
      );
    }
  }

  const html = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: String(data.title),
    keyword: String(data.keyword),
    summary: String(data.summary),
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: String(data.updatedAt ?? data.publishedAt ?? ""),
    readingMinutes: Number(data.readingMinutes ?? 5),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    tone: String(data.tone ?? "blue"),
    video: data.video?.url ? { platform: data.video.platform, url: data.video.url } : null,
    status: data.status === "live" ? "live" : "draft",
    html,
  };
}

/** Published guides only, newest first. Drafts never reach the index or the sitemap. */
export function getAllGuides(): Guide[] {
  const guides = readDir()
    .map(parse)
    .filter((g): g is Guide => g !== null && g.status === "live");

  // The keyword is wired to ManyChat; a collision silently DMs the wrong link to real
  // people. Warn at build time so it shows in logs, but don't fail the build over it.
  const seen = new Map<string, string>();
  for (const g of guides) {
    const key = g.keyword.toUpperCase();
    const prior = seen.get(key);
    if (prior) {
      console.warn(
        `[guides] Duplicate guide keyword ${key}: used by both "${prior}" and "${g.slug}". ` +
          `The keyword is a ManyChat trigger and must be unique.`
      );
    }
    seen.set(key, g.slug);
  }

  return guides.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Includes drafts, so a draft is previewable at its URL but is not indexed or linked. */
export function getGuide(slug: string): Guide | null {
  return parse(slug);
}

export function getGuideSlugs(): string[] {
  return readDir();
}
