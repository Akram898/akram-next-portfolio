---
title: "The Claude web-design setup: skills, taste, and a browser it can actually see"
keyword: SITE
summary: "The four-part setup that gets Claude building sites that don't look generated: design skills for the rules, a taste skill for the references, Figma MCP for the source of truth, and Playwright so it can look at what it built. With the exact commands and file paths."
publishedAt: "2026-07-26"
updatedAt: "2026-07-26"
readingMinutes: 8
tags: ["claude-code", "skills", "mcp", "web-design"]
tone: "violet"
video:
  platform: instagram
  url: ""
status: live
---

You commented SITE, so here is the whole setup — the four pieces, the exact commands, and
the part that actually matters, which is how you prompt it once it's wired.

The reel had thirty seconds and had to be loud about it. Here is the honest version.

## Why generated sites look generated

A model with no design context defaults to the average of everything it has seen. The
average website is a centred hero, Inter, a purple-to-blue gradient, three feature cards, and
a footer. Nothing is *wrong* with it, which is exactly the problem — it reads as nobody's.

Four pieces fix four different causes:

| Piece | Fixes |
|---|---|
| Design skills | It doesn't know your rules — spacing scale, type ramp, motion |
| A taste skill | It has no references, so it reverts to the average |
| Figma MCP | It's guessing at the design instead of reading it |
| Playwright MCP | It can't see what it built, so it can't tell it's broken |

The last one is the one people skip, and it's the one that changes the output most.

## 1. Skills — teach it your rules once

A skill is a folder with a `SKILL.md` in it. Claude loads the body only when it's relevant,
so a long design reference costs nothing until it's needed.

Two locations, and the difference matters:

```
~/.claude/skills/<skill-name>/SKILL.md     # personal — every project
.claude/skills/<skill-name>/SKILL.md       # project — this repo only, commit it
```

Put house rules that follow *you* in personal. Put rules that belong to *a client's brand* in
the project, and commit them — then anyone running Claude in that repo gets the same rules,
which is the whole point.

The frontmatter is two fields:

```markdown
---
name: house-design-rules
description: Layout, type scale, spacing and motion rules for every site I build. Load before writing any component, page, or CSS.
---

## Type
- Display: one weight, one family. Never more than two families on a page.
- Body copy: 16–18px, line-height 1.6–1.75, measure capped at ~70 characters.

## Spacing
- One scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Nothing between.
- Section padding scales with viewport, never a fixed 80px.

## Motion
- Transform and opacity only. Never animate layout properties.
- 200–450ms, one easing curve for the whole site.
- Respect prefers-reduced-motion. Every time.

## Never
- Inter, Roboto or system-ui as the display face.
- Purple-to-blue gradient on a dark hero.
- A centred hero with three feature cards under it.
```

**Write the "Never" section first.** It is faster to describe the five things you're sick of
seeing than to describe good design in the abstract, and it moves the output more.

The description field is what Claude reads to decide whether to load the skill, so write it
as a trigger — *"load before writing any component, page, or CSS"* — not as a title.

Anthropic publishes a set at [github.com/anthropics/skills](https://github.com/anthropics/skills)
worth reading before you write your own, mostly to see how specific a good skill is.

## 2. A taste skill — give it references, not adjectives

"Make it modern" means nothing. A taste skill is where you put the *specific* things you want
it reaching for: real sites, a named palette, a named typeface, an era.

```markdown
---
name: taste
description: Visual references and direction for new pages. Load before designing any new page or landing section.
---

## Reference points
- Editorial layouts with asymmetric grids, not centred columns
- Type doing the work: one very large display face, sparse everything else
- Motion that is felt, not watched — micro, fast, on interaction only

## Palette
Warm off-white #F4F1EA. Ink #111514. One accent, used once per screen.

## Before building
Propose 3–4 distinct directions as: background hex / accent hex / typeface /
one-line rationale. Wait for a pick. Then build only that direction.
```

That last block is the highest-leverage thing on this page. Asking for **directions before
implementation** breaks the model out of its default look, and it takes ten seconds to
answer. Without it you get one confident guess and a long argument afterwards.

## 3. Figma MCP — stop describing the design

If a design already exists, the model should read it rather than infer it from your
paraphrase. Figma ships an MCP server for this. In Claude Code the supported path is the
plugin:

```bash
claude plugin install figma@claude-plugins-official
```

Then authenticate:

```
/mcp
```

Pick **figma**, choose **Authenticate**, allow access.

The remote server (`https://mcp.figma.com/mcp`) is the one most people want. There is also a
desktop server on `127.0.0.1:3845` that needs the Figma desktop app running — only reach for
it if you specifically need local-only access. Figma's own setup notes are
[here](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server).

**No Figma file? Skip this piece entirely.** Three of the four still work, and a taste skill
plus real screenshots gets you a long way. Do not install an integration you have no source
of truth for.

## 4. Playwright MCP — let it look at its own work

This is the step people leave out, and it is the difference between a model that writes
plausible CSS and one that ships a working page.

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Confirm it registered:

```bash
claude mcp list
```

Now Claude can open the page, take a snapshot, click things, resize the viewport, and read
what's actually on screen. It catches the things that only exist at runtime: a nav that wraps
at 900px, a section that scrolls horizontally on mobile, contrast that fails once the real
font loads, a hover state that does nothing on touch.

It uses accessibility snapshots rather than screenshots, so it's reading structure — which is
also why it's good at catching a heading order you broke.

## 5. The part that actually matters — how you ask

With all four wired, this prompt does more than any of them:

> Build the landing page. Before you write any code, propose four visual directions —
> background hex, accent hex, typeface, one line of rationale each — and wait for me to pick.
>
> After you build, open it in Playwright at 1440 and at 390. Check: no horizontal scroll at
> either width, nav doesn't wrap, contrast passes on body text, and every interactive element
> has a visible focus state. Fix what you find, then show me the two screenshots.

Three things are doing the work there:

1. **Directions before code.** Breaks the default look and costs one exchange.
2. **Named widths.** "Make it responsive" is unfalsifiable. 1440 and 390 are checkable.
3. **A checklist it can verify itself.** Each item is something Playwright can confirm, so
   the model can close the loop without you.

## What this doesn't do

It does not replace a designer, and the reel's hook was louder than the truth. What it
replaces is the *first pass* — the layout, the spacing system, the responsive plumbing, the
accessibility basics. That is real work and it is most of the hours.

What it still can't do is decide what the page is for, whether the offer is any good, or
which of your four directions is right for the brand. Those are the parts that were always
the actual job.

Where it's genuinely better than a rushed human pass: it will check 390px every single time
without being asked twice.

## Setup checklist

- [ ] `~/.claude/skills/house-design-rules/SKILL.md` — your rules, "Never" section first
- [ ] `~/.claude/skills/taste/SKILL.md` — references, palette, propose-directions block
- [ ] `claude plugin install figma@claude-plugins-official` *(only if you have Figma files)*
- [ ] `claude mcp add playwright npx @playwright/mcp@latest`
- [ ] `claude mcp list` to confirm
- [ ] Prompt with: directions first → build → verify at named widths

Start with the skills and Playwright. Those two are most of the gain, and neither needs an
account.
