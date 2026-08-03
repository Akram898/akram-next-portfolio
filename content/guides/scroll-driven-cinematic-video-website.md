---
title: "Two prompts, one build: turning ChatGPT video prompts into a scroll-driven site with Claude Code"
keyword: SCROLL
summary: "A general method for building a cinematic, video-driven website: use ChatGPT to write a continuity-locked prompt sheet for the video model, use ChatGPT again to turn the concept into one structured application brief, then hand that brief to Claude Code to identify the generated footage, optimize it for the web, and wire it to scroll."
publishedAt: "2026-08-01"
updatedAt: "2026-08-01"
readingMinutes: 9
tags: ["chatgpt", "claude-code", "gsap", "ai-video-generation"]
tone: "red"
video:
  platform: instagram
  url: ""
status: live
---

A cinematic, video-driven website — a story that plays out as the visitor scrolls, carried by
AI-generated footage instead of stock clips or icon-and-card layouts — comes from two upstream
documents, not from chatting a coding agent into existence one screen at a time. Write a prompt
sheet for the video model. Write a brief for the application. Then let a coding agent execute
the second document using the output of the first.

```text
ChatGPT
   ↓ continuity contract + per-scene shot list
Video generation model
   ↓ raw clips, one per scene
ChatGPT
   ↓ one structured application brief
Claude Code
   ↓ identify clips → optimize for web → build the scroll experience
Shipped site
```

## 1. Writing the video prompts

A multi-scene video story has one problem a single clip never has: the same character, object,
or environment has to stay visually consistent across every generated clip, and a video model
left to its own defaults will quietly redesign it scene to scene. The fix is to write one shared
**continuity contract** first, then a short shot list underneath it — not seven unrelated
prompts.

The contract carries everything that must never change: the subject's identity, the palette,
the physics, and what the model is explicitly forbidden from adding.

```text
Maintain the exact visual identity of [the subject] from the supplied reference image.
Preserve its proportions, materials, illumination pattern and scale.

[Genre / mood / scale descriptors]. Restrained colour palette of [3–5 named colours].

Realistic cinematic physics. Slow, intentional movement. Stable geometry. No random
morphing. No duplicate subjects. No text. No logos. No subtitles. No interface elements.

Create a seamless visual ending suitable for transitioning into the next scene.
```

Two lines here matter more than the rest:

**"No text. No logos. No subtitles. No interface elements."** Any headline, label, or button
that needs to appear on top of the footage should be real HTML, added later — never burned into
the video itself. Text inside a video is invisible to screen readers, can't be selected or
translated, and can't be edited without a full regeneration. Decide this at the prompt stage,
not the layout stage.

**"Create a seamless visual ending suitable for transitioning into the next scene."** Put this
in every scene's prompt, and give each one a concrete visual target for how it should end — a
door opening, a light expanding, a camera arriving somewhere specific. When each scene's ending
is written to match the next scene's beginning, the cuts between them read as one continuous
sequence instead of separate clips stitched together.

Everything else is scene-specific: duration, aspect ratio, camera movement, and the one beat
that scene needs to hit. If a later part of the interface needs to line up with something in the
frame — labels appearing at specific positions, for instance — say so directly in the prompt
("leave clear visual space where a label can appear here") rather than trying to reverse-engineer
positions from footage that wasn't planned for it.

Generated footage is rarely perfect on the first pass — small unplanned details show up
sometimes. Judge each result on whether it still reads correctly in context rather than
regenerating indefinitely chasing an exact match to the prompt.

If the story needs a portrait (9:16) version for a mobile-only moment — an opening or closing
scene, for example — generate that as its own dedicated shot with its own composition, rather
than planning to crop a landscape clip down later. A vertical crop of a horizontal composition
rarely recomposes well.

## 2. Writing the application brief

Once the footage is planned, use ChatGPT a second time — not to write code, but to turn the
concept into one long, structured brief for whichever coding agent will actually build the site.
This is the highest-leverage step in the whole process, and the easiest one to skip in favor of
just describing the idea in chat and iterating from there.

A brief that actually holds up over a large build includes:

- **The narrative or structure**, section by section, with the exact copy for each screen —
  not a paraphrase the agent has to reinterpret.
- **The tech stack**, named specifically (framework, animation library, smooth-scroll library,
  testing tool) rather than left to the agent's defaults.
- **The motion rules** — which sections are meant to feel driven by scroll position specifically,
  and which are just normal looping background motion. These are different engineering problems
  and worth separating explicitly.
- **Accessibility and performance requirements** — reduced-motion behavior, mobile treatment,
  what "acceptable load time" means — stated as requirements, not assumed.
- **An explicit definition of "done."** A production build that passes, a clean console, specific
  breakpoints to check, specific behaviors to verify. Without this, a long build tends to stall
  out at a demo-able-but-incomplete state, because nobody wrote down what "finished" actually
  means.

The brief is worth writing as one document up front precisely because a build like this runs for
a long time before there's anything to react to. Discovering requirements through a dozen rounds
of "also, can you—" costs far more than spending the time up front to get the brief right, and it
gives the coding agent something concrete to check its own work against at the end, instead of
just stopping when it runs out of obvious next steps.

## 3. What the coding agent does with it

Handed a brief like that plus a folder of generated clips, a capable coding agent works through
the same handful of stages regardless of the specific project:

**Identify the footage.** Generated video files often come back with meaningless filenames and
no scene labels. Metadata alone — duration, resolution, aspect ratio — usually resolves several
clips instantly, since scenes with different specified lengths or orientations become
unambiguous the moment you check. For anything metadata can't distinguish, pull a start frame
and an end frame from each clip and match them against the written scene descriptions. For clips
that still look identical at a glance, a contact sheet — several evenly-spaced frames from across
the same clip, tiled into one image — usually reveals which direction the scene actually moves.

**Optimize for the web.** Raw generated footage is rarely web-ready. Every clip typically needs
re-encoding into at least two formats for browser compatibility, muted if the site's audio is
handled separately, alongside a poster frame for instant paint, a tiny low-quality placeholder for
the moment before the real poster loads, and a still image to show when a visitor has motion
reduction enabled. None of this should load until it's actually needed — the first visible
scene loads immediately, everything after loads shortly before it's reachable, and nothing plays
while it's off-screen.

**Decide how each scene is driven by scroll.** This is the part that actually makes a scroll
story feel controlled rather than like a page with a background video. There are two real
options, and they solve different problems:

- Set the video's own playback position directly from scroll progress. This is the simpler
  approach, and it works — right up until a visitor scrolls quickly or scrolls back upward,
  at which point compressed video's usual encoding means the player has to decode forward from
  an earlier point in the file, which shows up as visible stutter exactly when it's most
  noticeable.
- Preload the scene as a sequence of individual image frames, and draw whichever frame matches
  the current scroll position onto a canvas. Because every frame is already a fully-decoded
  image, "seeking" is just picking which one to draw — equally smooth at any scroll speed, in
  either direction, with no decode cost at all.

The second approach is worth the extra setup specifically for the sections meant to feel
precisely, continuously scroll-controlled. For sections that are just present in the background
while content scrolls past — nothing in them needs to be paused at an exact point — ordinary
looping video is simpler and works fine, because nothing about it ever needs to be seeked.

**Wire up smooth scrolling correctly.** A separate smooth-scroll library and a scroll-triggered
animation library need to agree on where the page actually is. The standard pattern is to let the
smooth-scroll library drive the animation library's own timing loop, and have it explicitly
notify the animation library on every scroll update — rather than letting each one listen to the
raw browser scroll event independently, which drifts out of sync. And when a visitor has
requested reduced motion, skip the smooth-scroll library entirely rather than trying to disable
it after the fact — native scrolling should just take over.

## When this approach is worth it

Not every video needs a continuity contract and a frame-by-frame scroll engine. It's worth the
setup when:

- **A subject has to stay visually consistent across multiple generated clips.** The shared
  contract is what prevents drift between them.
- **Part of the video needs to sync to something other than its own playback clock** — scroll
  position, a click, a moment a piece of text is meant to land on.
- **The experience genuinely needs to keep working paused, cropped, or replaced by a still** —
  because reduced motion, slow connections, and a dedicated mobile treatment are requirements
  from the start, not something added at the end.

For a single short clip with no continuity to protect across multiple scenes, a normal editor
and a plain video embed will get there faster. This approach earns its complexity specifically on
multi-scene, identity-locked, scroll-synced work.

## Checklist

- [ ] Write one shared continuity contract before any per-scene prompt — subject identity,
      palette, physics rules, an explicit "no text/logos/interface elements," and a
      seamless-ending instruction repeated in every scene
- [ ] Write the application brief as one structured document, with an explicit definition of
      "done," before implementation starts
- [ ] Check duration, resolution and aspect ratio on every raw clip before opening an editor —
      it resolves more of an unlabeled batch than expected
- [ ] Extract start/end frames (or a contact sheet, for clips that look identical) to resolve the
      rest by content rather than filename
- [ ] Re-encode everything for the web with a poster, a low-quality placeholder, and a
      reduced-motion still, before writing any frontend code
- [ ] Prototype simple scroll-linked playback first; only build a frame-sequence canvas if that
      actually stutters
- [ ] Confirm the smooth-scroll and scroll-animation libraries are explicitly synced, and that
      reduced motion skips smooth scrolling entirely rather than disabling it after the fact
