---
title: "Motion graphics in code: how to build reels that render themselves"
keyword: MOTION
summary: "A practical introduction to making social motion graphics with React and Remotion — why programmatic video beats a timeline for repeatable content, how the pieces fit together, and the design rules that decide whether the result reads on a phone."
publishedAt: "2026-07-29"
updatedAt: "2026-07-29"
readingMinutes: 6
tags: ["remotion", "react", "motion-graphics", "video-automation"]
tone: "red"
video:
  platform: instagram
  url: ""
status: live
---

You commented **MOTION**, so here is the longer version: what programmatic video actually
is, when it beats a normal editor, and the design decisions that matter more than the code.

The reel you saw has no timeline behind it. Every frame is a React component, and the
whole thing is produced by one command. That is not a trick — it is a genuinely different
way to make video, and it suits some work extremely well and other work terribly.

## The idea in one paragraph

In a normal editor you build an artifact: you drag clips onto a timeline, nudge keyframes,
and export a file. The file is the deliverable, and the project file is a pile of manual
decisions you cannot easily re-run. In programmatic video you write a **function of time**
instead. Given a frame number, your code returns what the screen looks like at that
frame. A renderer then walks every frame, screenshots it, and encodes the result.

The consequence is the whole point: because the video is source code, it is diffable,
reviewable, parameterisable and — above all — **re-runnable**. Change a value, run the
command again, get a new video.

## What you actually need

**[Remotion](https://remotion.dev)** is the mature option. It renders React components to
video by driving a headless Chromium, so anything the browser can draw, you can put in a
video: CSS, SVG, canvas, web fonts, images, even live data you fetched at build time.

The mental model is small:

- `useCurrentFrame()` tells your component which frame is being drawn
- `<Sequence from={x} durationInFrames={y}>` scopes a chunk of the timeline
- `interpolate()` and `spring()` turn a frame number into a number you can animate with
- one CLI command renders the composition to an MP4

That's the whole API surface you need for a first project. There is more, but you can ship
without it.

## When this is worth it

Be honest about the trade. Programmatic video is **worse** than an editor for one-off,
handcrafted pieces. If you are cutting a documentary or a wedding film, use an editor.

It wins decisively when any of these are true:

- **You make the same shape of video repeatedly.** Weekly recaps, release notes, stat
  cards, quote posts. Write the template once, feed it different content forever.
- **The content comes from data.** Leaderboards, dashboards, price changes, sports
  results. The video can read the numbers itself rather than you retyping them.
- **You need many variants.** Different languages, aspect ratios, or calls to action from
  one source. A parameter, not a re-edit.
- **Small changes are frequent.** Fixing a typo in an exported MP4 means re-opening the
  project, finding the layer, re-exporting. Here it is a one-line change and a re-run.

The cost is real: your first template takes meaningfully longer than just editing the
video would have. You are buying repeatability, and it only pays back if you actually
repeat.

## The design rules that decide whether it works

This is the part most technical write-ups skip, and it matters more than the code. A
programmatic reel that nobody watches is not an achievement.

**Design for muted viewing.** A large share of feed video is watched with the sound off.
If your script lives in a voice-over, most viewers get nothing. The strongest short-form
motion graphics carry the entire argument in the typography and treat audio as texture.
Write the words first and ask whether the video still works as a silent flipbook.

**One idea per beat.** Give each section a single claim and roughly three to four seconds.
Two lines of text maximum, and rarely more than about seven words on screen at once.
People are reading this at arm's length while scrolling.

**Reveal, don't dump.** Text that appears word by word holds attention far better than a
paragraph that fades in whole. It also paces the viewer's reading to your intended rhythm
rather than letting them skim ahead and leave.

**Every section needs one bright object.** This is the most common failure in dark,
"premium" looking motion design: everything sits within a few shades of the background, so
at thumbnail size on a phone at half brightness, the frame reads as a grey rectangle.
Give each beat a genuinely high-contrast element — a light card, a saturated graphic, a
filled pill. It is what the eye locks onto in a feed.

**Know where the platform's UI sits.** On a 9:16 reel, the bottom fifth of the frame is
covered by captions, buttons and the audio strip. Anything you put there is effectively
invisible. Keep real content in the upper ~80% and treat the rest as bleed.

**Never cut when you can transition.** In this format, hard cuts feel cheap. Elements that
spring in and slide out keep the piece feeling continuous, which is what makes
code-rendered video look expensive rather than like a slideshow.

## A first project that will actually teach you something

Do not start with a full reel. Build a **stat card**: a 5-second 1080×1080 composition
showing one number counting up, with a label underneath.

1. `npx create-video@latest` and pick the blank template
2. Make a component that takes `value` and `label` as props
3. Use `interpolate()` to animate the number from 0 to `value` over the first second
4. Add a `spring()` on the scale so it lands with a little weight
5. Render it. Then render it again with different props

The moment where you render the same component twice with different numbers and get two
finished videos is the moment the approach clicks. Everything else is more components.

## Practical things that will bite you

**Pin your tooling versions.** The React video ecosystem moves quickly, and a major
version bump in a build dependency can break rendering in ways whose error messages point
somewhere unhelpful. Lock versions and upgrade deliberately.

**Load fonts locally, not from a CDN.** If your render fetches a web font at render time
and the network hiccups, the renderer silently falls back to a default font and you ship a
video in the wrong typeface. Bundle font files with the project and fail loudly if they do
not load.

**Rendering is CPU-bound and parallel.** It is a browser screenshotting frames. More cores
genuinely help. A short 1080×1920 piece renders in well under a minute on a normal laptop;
budget more for long or effect-heavy compositions.

**Check the output file, not the exit code.** A render can complete successfully and still
be wrong — text off-canvas, a transition that leaves an empty frame, an asset that never
loaded. Watch the actual file before you publish, every time.

**Audio is a separate concern.** You can place audio in the composition, but for anything
involving a music bed it is usually cleaner to render silent, then mix and master
separately with a dedicated audio tool. Social platforms expect roughly −14 LUFS
integrated; deliver much quieter and your video feels weak next to everything around it.

## Where the AI part fits

Writing motion-graphics components is exactly the kind of work current coding models are
good at: it is self-contained, visual, and easy to iterate on. Describing a device — "a
terminal window with traffic lights, a typed command and a blinking caret" — and getting a
working component back is a realistic expectation today.

What models are *not* reliably good at is the art direction: pacing, contrast, what
deserves emphasis, when a beat is a second too long. Those judgements still come from
watching the output and having an opinion. The productive split is to let the model build
the vocabulary of components and spend your own attention on the script and the rhythm.

## The honest summary

Programmatic video is a repeatability tool, not a quality tool. It will not make a bad
script good. What it does is remove the manual cost of *making the same thing again*,
which is the actual bottleneck in publishing consistently.

If you publish one video a month, use an editor. If you publish weekly and keep rebuilding
the same shapes by hand, this will pay for itself quickly.

---

*Questions or want the specific setup for something you are building? I'm
[@theakram.ai](https://instagram.com/theakram.ai).*
