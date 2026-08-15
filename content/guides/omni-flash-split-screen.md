---
title: "Re-shoot your own video with AI: Omni Flash, one prompt, split-screen proof"
keyword: OMNI
summary: "Film a normal clip, hand it to Google's Omni Flash with a preservation-first prompt, and cut the result against your original as a split screen. The prompt structure, the framing maths for a 9:16 comparison, and the frame-rate trap that makes a perfectly aligned edit look out of sync."
publishedAt: "2026-08-13"
updatedAt: "2026-08-13"
readingMinutes: 8
tags: ["ai-video", "omni-flash", "google", "video-to-video", "ffmpeg", "split-screen"]
tone: "cyan"
video:
  platform: instagram
  url: ""
status: live
---

You commented **OMNI**, so here is the whole thing: how the clip was filmed, the prompt that
repainted it, and how the split screen was cut — including the two mistakes that cost me a
rebuild each.

## What this actually is

This is not text-to-video. You are not describing a scene and hoping.

You **film a real clip on your phone**, hand that clip to the model with a prompt, and it
repaints the subject while keeping your camera move, your room, your lighting and your
timing. Video in, video out. The thing that makes it land is that everything around the
change stays verifiably yours.

That is also why the split screen is the right format for it. The transformation on its own
is a costume. The transformation **next to the footage it came from** is proof.

## Where you can run it

Omni Flash is reachable through more than one Google surface:

- **[Gemini](https://gemini.google.com)** — the conversational route. Upload the clip, prompt
  it, get the result back.
- **[Google Flow](https://labs.google/fx/tools/flow)** — the filmmaking-oriented one. If you
  already generate avatar clips in Flow, it is the same tool you are logged into.

Both drive the same underlying model, so pick on workflow rather than quality. Flow suits
you better if you are generating several variants and want them organised as a project;
Gemini is faster for a single one-off.

**Check limits the day you use it.** Clip length caps, resolution, regional availability and
credit costs on this whole category move month to month. Do not build a shoot around a
number you read in a guide — including this one.

## Film the source clip so the model has something to hold

This is the part that decides your result, and it happens before any prompt is written.

- **Shoot vertical, 9:16, filling the frame.** You are going to stack two of these on top
  of each other. Anything you have to letterbox later is wasted.
- **Give it strong, directional light.** My clip was shot in hard afternoon sun against a
  plant wall. The model matched the suit's highlights to that sun direction — which is
  exactly the detail that makes people rewind.
- **Give it a background with structure.** A plain wall gives the model nothing to hold
  steady, so drift is invisible until it isn't. Leaves, a trellis, a shelf — texture is what
  proves the room never moved.
- **Move the camera, but move it simply.** One steady pan is ideal. It demonstrates the
  model tracking your motion, and a slow uniform move is the easiest thing in the world to
  keep aligned.
- **Keep it about 10 seconds.** Long enough for a transformation to have a beginning and an
  end, short enough to be one generation.

The counterintuitive one: **you do not need to act.** In my source clip I stand there, pull a
face, and walk out of frame. The model supplied the drama. Your job is to supply a clean,
well-lit, stable reference.

## The prompt

Structure it **preservation first, change second**. Lead with everything that must not move,
then name the single thing that should. Models in this class drift when you hand them a list
of simultaneous edits; they hold together when the change is one direction.

The template that transfers to any subject:

```
PRESERVE: camera movement, framing, lighting direction, background, his face and hair,
          and the original timing of his movements.
CHANGE:   [the one thing you want different]
TIMING:   [when the change should happen inside the clip]
```

Filled in, the two clips in that reel were roughly this:

**Clip 1 — the suit builds:**

```
Preserve the camera movement, the framing, the sunlight direction and the plant wall
behind him exactly as filmed. Keep his face, hair and expression unchanged.

Replace his clothing with the Iron Spider suit. Let the suit assemble over his body
across the first few seconds rather than appearing all at once, starting at the arm
and spreading across the chest, then forming the mask over his head.

Match the suit's metallic highlights to the existing sunlight direction.
```

**Clip 2 — the reveal:**

```
Preserve the camera pan, the plant wall and the lighting exactly as filmed.

When the camera comes back to him he is wearing the classic red and blue Spider-Man
suit with the mask on. As he begins to speak, dissolve the mask away to reveal his
real face, then let the rest of the suit fade back to his own clothes.
```

**One honest note on these:** they are reconstructed from what the output actually does, not
copy-pasted from the box I typed them into. If you want your exact wording published here,
send it over and I will swap it in. The structure above is the part that matters and it is
accurate.

Three things worth stealing from it:

1. **Name the light.** "Match the highlights to the existing sunlight direction" is the
   single highest-value line in the prompt. It is what stops the composite look.
2. **Direct the timing.** "Across the first few seconds… starting at the arm" gives you a
   build you can cut to. Without it you get a hard swap on frame one and nothing to edit.
3. **Say what the face does.** Identity is the first thing to wander. Pin it explicitly.

## Cutting the split screen

Two 9:16 clips stacked into one 9:16 frame. The whole problem is that you now have half the
height for something shot full height.

I tested three geometries on a single still before rendering anything:

| Option | What happens |
|---|---|
| Hard crop each source to 1080×960 | Subject is huge, but the top of his head is cut and he sits half out of frame |
| Fit the whole untouched frame into the panel | Nothing is lost, but the subject shrinks to a quarter of the screen width |
| **Crop a 1080×1300 window, fit it to the panel, blur-fill the sides** | Full head and chest, subject still large, no letterbox |

The third one shipped. The layout:

```
top panel     900 px    your original
divider band  120 px    caption line, accent rules top and bottom
bottom panel  900 px    the Omni Flash result
              -------
              1920 px
```

Within each panel, a 1080×1300 window of the source — head and chest, which is where the
transformation happens — scaled to 748×900 and centred, with the remaining ~166px each side
filled by a blurred, darkened copy of the same frame. It reads as a designed border rather
than as bars.

**The dedicated caption band is worth the 120 pixels.** Text floating over footage fights the
image and moves around; text in its own strip is always legible and gives the frame a
structure that says "comparison" before anyone reads a word.

### Write the captions against what is actually on screen

My first pass had a caption reading "IT KEEPS THE SUNLIGHT" over a moment where my original
had already panned off me onto a bare wall. Technically defensible, completely wrong for the
frame. I rebuilt it.

Once I re-watched properly, the best beat in the footage turned out to be a divergence: my
real camera pans away to an empty plant wall, and the AI version fills that same empty wall
with Spider-Man firing a web and crawling up it. The caption that landed was:

> **I PANNED TO AN EMPTY WALL**

The caption describes the top panel. The bottom panel contradicts it. That is the joke, and
it works because the text sets up a fact the image immediately breaks. Write captions for the
panel that is *less* interesting and let the other one pay it off.

Two smaller things:

- **Do not flash on frame zero.** I opened on a two-frame white flash and it looked great in
  motion — but several platforms grab frame one as the cover image, and mine was a white
  wash. Removed it; the reel now opens on the split with the hook caption already up, which
  makes a much better thumbnail.
- **Put the hook in the band from t=0**, not t=0.1, for the same reason.

## The frame-rate trap

This is the part I would not have predicted, and it is the reason a technically perfect
alignment can look wrong.

**Phone footage is 30fps. The Omni Flash output came back at 24fps.**

Stack them on a 30fps timeline and the bottom panel duplicates every fifth frame. During a
camera pan, the top panel glides and the bottom panel stutters. Your eye reads that as *out
of sync* even though the two clips are aligned to the frame.

Before assuming a timing problem, **measure it.** I compared each pair two ways — motion-energy
cross-correlation, and mean image distance across sliding two-second windows:

```
pair 1   -2f:34.5   -1f:32.8   0f:31.1   +1f:31.8   +2f:33.3
pair 2   -2f:33.5   -1f:30.8   0f:27.0   +1f:29.1   +2f:31.8
```

A clean V-shaped minimum at **zero offset** for both pairs, and every window across the first
seven seconds independently agreeing. The clips were already frame-aligned. **Shifting either
one would only have broken the parts that lined up.**

The actual fix was cadence, not timing: motion-interpolate the 24fps output up to 30fps so
both panels move with the same rhythm. Check the interpolation on your hardest shot before
trusting it — I checked the mask dissolve and the fast web shot, and both came through with
no warping or ghosting, but fast motion is where this technique fails if it is going to.

**And know what cannot be synced.** Past about seven seconds in each of my clips, the
alignment measurement returns junk with near-zero confidence — because the AI genuinely
invented different action there. That is content divergence, not drift. No offset fixes it,
and you would not want it to: it is the best material in the video.

## What it gets wrong

- **It re-frames.** Around the five-second mark my original drifts him toward the edge of
  frame while the AI version keeps him centred. Great content, but do not expect a
  pixel-locked composite all the way through.
- **It re-times.** In the second clip the camera returns to the subject slightly earlier in
  the AI version than in mine — a few hundred milliseconds. Invisible alone, visible in a
  split screen if you go looking.
- **The audio comes back regenerated.** I kept my original recording's audio under both
  panels. It is the real voice, it is guaranteed clean, and the video's claim is about the
  picture. Audition the generated audio before you decide to use it.

## Getting your own first one out

1. Film **10 seconds vertical**, hard directional light, textured background, one simple
   camera move.
2. Run it through **Gemini or Flow** with a preservation-first prompt. One change, timed.
3. Check the returned clip's **frame rate and duration** against your original before you
   cut anything.
4. Stack them 900 / 120 / 900 with a blur-filled panel, original on top.
5. **Measure alignment before correcting it.** Assume nothing.
6. Caption the boring panel; let the other one land the joke.

---

## Related guides on this site

- [5 AI video tools you can try for free (TOOL)](/guides/free-ai-video-tools)
- [Automate video creation end to end (AI)](/guides/automate-video-creation)
- [Seedance 2.0 — what's real and what's hype (SEEDANCE20)](/guides/seedance-2)
- [Motion graphics in code (MOTION)](/guides/motion-graphics-in-code)

---

## Short version

| Question | Answer |
|---|---|
| What is it? | Video-to-video. Your real clip in, repainted clip out, your camera preserved. |
| Where do I run it? | **Gemini** or **Google Flow** — same model, pick on workflow |
| How do I prompt it? | Preservation first, one change, and state when the change happens |
| What makes a good source clip? | Vertical, hard directional light, textured background, one simple camera move |
| Split-screen layout? | 900 / 120 band / 900, a 1080×1300 crop window per panel, blurred side fill |
| Why does my aligned edit look off? | 24fps output on a 30fps timeline — fix the cadence, not the timing |

Film something ordinary and let the model do the stunt. Comment **OMNI** anytime you want
this page again.
