---
title: "Claude's new watermark — what it marks, what it doesn't, and how to check it"
keyword: WATERMARK
summary: "Claude now embeds an invisible watermark in everything it writes, and signs the files it generates. There's no opt-out. Here's exactly what's marked, what survives editing, why it happened, and the one nuance that matters: it proves Claude was used — not who used it."
publishedAt: "2026-08-15"
updatedAt: "2026-08-15"
readingMinutes: 6
tags: ["anthropic", "claude", "ai-watermarking", "eu-ai-act", "c2pa", "ai-news"]
tone: "blue"
video:
  platform: instagram
  url: ""
status: live
---

You commented **WATERMARK**, so here's the full version: what's actually marked, which products it covers, why now, and the one distinction that changes how worried you should be about it.

The reel had 35 seconds. This has room for the parts that got cut.

## What changed

On 11 August 2026, Anthropic confirmed that supported Claude models now embed an **invisible watermark directly into every piece of text they generate**, and attach **signed provenance metadata** to files Claude creates. There's no setting to turn it off.

Two separate mechanisms, not one:

| | Text | Files |
|---|---|---|
| What | An imperceptible watermark woven into the text itself | Signed metadata following the **C2PA** standard |
| Covers | All generated text | `.svg`, `.png`, `.jpg` |
| Survives | Copy-paste (confirmed by Anthropic) | Tampering is detectable if the metadata is present |
| Opt-out | None | None |

**Anthropic's own words, from their support article:** "Because the watermark is part of the text, it will travel with the text when it's copied and pasted elsewhere, and may persist through some editing." That second clause matters — "may persist," not "always persists." Nobody, Anthropic included, is claiming it survives a heavy rewrite.

## Where it applies

Marking covers output from supported models across **Claude Platform (API), Claude (the app), Claude Code, Claude Cowork, and Claude Tag** — and cloud partners AWS, Google Cloud, and Microsoft Foundry, where each platform's own features allow it.

It's **worldwide**, not EU-only. New models get marking automatically from launch; models released before 2 August 2026 are being retrofitted, with no date given yet.

## Why now

This isn't a voluntary Anthropic feature — it's compliance. The **EU AI Act's Transparency Code** took effect 2 August 2026 and requires AI-generated content to be identifiable. Anthropic applied the mark globally rather than scoping it to EU traffic, which is the detail that made this a story instead of a changelog entry.

The real primary source, worth reading directly: [Anthropic's own explanation of how Claude marks content](https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content).

## The nuance that matters most

**A detected watermark proves Claude generated the text. It does not identify who prompted it.**

There's no username, account, or person attached to the mark — it's a content-origin signal, not an identity signal. Forbes put it precisely in their coverage: it "proves it was used, not who wrote it." If you use Claude for work or school, the watermark tells a checker *that* AI was involved, not *that it was you* who typed the prompt — that link, if it exists at all, lives in whatever platform you used, not in the text itself.

That's also the reaction the reel's hook was pointing at. Backlash to the announcement was real and fast — Forbes reported it hit X and Reddit within a day, with people calling it "hugely problematic" — but most of the anger reads as directed at *detectability* rather than *traceability to a person*, which are two different fears with two different answers.

## What the watermark does **not** do

Straight from Anthropic's own limitations section, because a guide that only repeats the upside isn't worth commenting a keyword for:

- **A detected mark isn't fully conclusive.** Claude might not be the original author — people use it to proofread, translate, or convert existing text, and the output can still carry a mark.
- **No detected mark doesn't mean no AI involvement.** Content generated before marking was supported, heavily edited, paraphrased, or very short may carry no detectable signal at all.
- **Detection tooling isn't public yet.** Anthropic says they'll support users and third parties in detecting marks "as the Code requires" and will publish documentation — but as of this writing, there's no shipped detector to point you to.

## How to actually check a file

For the **file** side (C2PA metadata on `.svg`/`.png`/`.jpg`), C2PA is an open, pre-existing industry standard — the same one Google and Adobe already use — so general-purpose C2PA verification tools (like the Coalition's own [Content Credentials Verify](https://contentcredentials.org/verify)) can check for a Content Credentials signature on a file today, before Anthropic ships anything Claude-specific.

For the **text** watermark, there's genuinely nothing to check yet. That's not a gap in this guide — it's a gap in what's been released. I'll update this page the moment Anthropic's own detection documentation goes live.

## Sources

Verified against the primary source plus independent outlet coverage, 11–15 August 2026:

- [Claude Help Center — How Claude marks AI-generated content](https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content) (primary source)
- [TechCrunch — Anthropic says it will watermark text generated by its AI models](https://techcrunch.com/2026/08/11/anthropic-says-it-will-watermark-text-generated-by-its-ai-models/)
- [Forbes — Claude Will Put Invisible Watermarks On AI Text And Images — And The Internet Isn't Happy](https://www.forbes.com/sites/maryroeloffs/2026/08/11/claude-will-put-invisible-watermarks-on-ai-text-and-images-and-the-internet-isnt-happy/)
- [Forbes — Claude's Watermark Proves It Was Used, Not Who Wrote It](https://www.forbes.com/sites/danfitzpatrick/2026/08/13/claudes-watermark-proves-it-was-used-not-who-wrote-it/)
- [Fortune — Anthropic plans to add an invisible mark to AI text](https://fortune.com/2026/08/11/anthropic-claude-watermark-ai-text-police-ai-slop/)
- [Axios — Anthropic's text watermarks signal new front in AI detection](https://www.axios.com/2026/08/12/anthropic-claude-watermarks-ai-detection)
- [Inc. — Claude's New Watermarks Will Follow Text Even After It's Copied](https://www.inc.com/kit-eaton/claudes-new-watermarks-will-follow-text-even-after-its-copied-the-era-of-secret-ai-use-may-be-ending/91389264)

## Related guides on this site

- [Claude Skills — install once, use first](/guides/claude-skills)
- [Opus 5 vs Fable 5 — model picker is not your cost dial](/guides/opus5-vs-fable5)

---

Comment **WATERMARK** anytime you want this page sent again.
