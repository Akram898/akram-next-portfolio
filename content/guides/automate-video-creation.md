---
title: "How to make a short with AI end to end — avatar, b-roll, motion, cut"
keyword: AI
summary: "A practical workflow for AI-made vertical videos: script at spoken pace, talking-head generation, multi-model b-roll, code-rendered cards, captions, and dual exports. No magic app — a stack you can run yourself."
publishedAt: "2026-08-02"
updatedAt: "2026-08-02"
readingMinutes: 8
tags: ["ai-video", "short-form", "avatar", "remotion", "content-workflow"]
tone: "violet"
video:
  platform: instagram
  url: ""
status: draft
---

You commented **AI**, so here is the complete workflow behind that “this entire video was done by AI” claim — what each layer actually does, how the tools fit together, and what still has to be real if you care about trust.

This is a **generic production recipe**. It is not a plug for any one creator’s product stack, portfolio, or private tooling. Swap models and apps as pricing and quality move; keep the order of operations.

## What “done by AI” usually means (and what it doesn’t)

Most strong AI shorts are **not** one prompt → finished film. They’re a chain:

1. **Script** written (or heavily edited) with an LLM
2. **Talking head + voice** generated from that script
3. **B-roll** generated or remixed (image→video, abstract motion)
4. **On-screen type and motion** rendered in code or a motion tool so text stays sharp
5. **Captions + edit + music** assembled on a fixed timeline
6. **Two endings** if you post where comment-to-DM works _and_ where it doesn’t

AI does the heavy lifting. **You** still choose the claim, reject bad takes, and decide what must be proof vs texture.

## The mix (the same four names from the reel)

| Layer                                | Typical role                                   | Example tools (pick your own)                           |
| ------------------------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| **Wild / abstract b-roll**           | Texture, energy, “AI-made” look                | Image→video models (e.g. Grok’s video, other i2v tools) |
| **Script + structure**               | Hook, beats, CTA, word count for pace          | Claude or any strong chat model                         |
| **Second pass on prompts / visuals** | Alternate stills, prompt rewrites, A/B wording | Gemini or another multimodal model                      |
| **Kinetic cards / UI chrome**        | Numbers, ranks, CTA pills that never misspell  | Remotion (React → video) or equivalent                  |

You do **not** need this exact brand set. You need **four jobs**: generate face, generate texture, write sharp copy, render pixel-perfect text.

## Step 1 — Script for the mouth, not the page

Vertical AI avatars choke on long, nested sentences. Write like speech:

- **Target ~3.4–3.7 words per second** finished (e.g. ~85–100 words ≈ 25s, ~140 words ≈ 40s).
- **Spell out numbers** if the generator reads text literally (“sixty-five,” not “65”).
- **One idea per video.**
- **Hook in the first line** — claim first, context second.
- **CTA is one clear action** (comment a keyword _or_ open a link — not both muddled).

Useful structure:

> Hook → who is talking (if avatar) → 3–5 beats → payoff → CTA + follow

Ask the model for **two shorter rewrites** if a take comes back slow. Generators rarely “speak faster”; they stretch time.

## Step 2 — Avatar clips (same person, every segment)

Most avatar tools have **no durable identity lock**. Treat consistency as process:

1. Write a **character block once** (age range, hair, clothes, room, light, shot size, “no on-screen text”).
2. Write a **delivery block once** (pace, energy, eye contact).
3. Paste **both into every clip**, then only change gesture + dialogue.
4. Generate **4–5 clips per short**, ~8–12s each, same session if voice drifts between batches.
5. Prefer **verbatim dialogue** — captions will follow the audio.

**Hard rule:** never trust baked-in captions or logos from the generator. They misspell. You add text later, pixel-perfect.

If a take stutters or doubles a word, **regenerate or cut the bad syllable in the edit** — don’t leave it because “AI is raw.”

## Step 3 — AI b-roll (texture, not proof)

Use generative video for **mood and metaphor**, not for claims that need to be checkable.

Prompt habits that hold up:

- Camera language: macro / slow push / shallow depth / grade
- Subject: abstract nodes, light, glass, particles — or a clear metaphor for the line
- End with: **no text, no logos, no UI, no watermarks**
- Prefer **9:16** (or crop to 1080×1920 after)
- Keep clips short (**~4–6s**) and cut often

Upscale / normalize to your canvas once, then reuse:

```bash
ffmpeg -y -i in.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1" \
  -an -c:v libx264 -crf 17 -pix_fmt yuv420p out.mp4
```

**When a claim has to be true** (pricing page, install screen, real product UI): record the real screen. Generative “fake UI” with cursed text kills trust in one frame.

## Step 4 — Code-rendered motion (why Remotion-class tools win)

LLMs invent spelling. Motion systems you control do not.

Use code or a motion app for:

- Hook walls (“DONE BY AI”)
- Rank / list badges
- Tool names on a grid or stack
- Comment-keyword CTA mockups
- Link outros for platforms without auto-DM

Pattern that reads “expensive” on mute:

- Dark stage, one accent color, big type
- **Number or name on screen when it’s spoken**
- Multi-row stacks: hold long enough for the last row to animate in

If you name four tools in a row, a **2×2 labeled grid** of real generative plates + a hard cut to each name as it’s spoken beats a vague AI swirl.

## Step 5 — Assembly rules that separate “cool” from “tight”

1. **Sync-lock the voice.** Do not stretch speech to fit b-roll. Cut b-roll to the words.
2. **Kill dead air** after the hook words (a half-second pause after “done” is audible).
3. **Mean cut ~1.2–1.6s** for trend pace; hold longer only when something must be _read_.
4. **Disclosure:** if the face is synthetic, say so on camera once — full face, no cover.
5. **Captions:** burn in from the real audio (Whisper-class + ASS, CapCut, etc.). Fix homophones.
6. **Music:** bed under voice, not on top of it — start quiet and raise only if dialogue still wins.
7. **Dual export when needed:**
   - Comment / keyword CTA → Instagram, TikTok
   - Link in description / end card → YouTube Shorts, X, LinkedIn

Same body, different ending. Don’t ask people to “comment KEYWORD” on a platform that can’t DM them the guide.

## A minimal stack you can run this week

You can ship a first version with:

| Need     | Cheap path                                                           |
| -------- | -------------------------------------------------------------------- |
| Script   | Any frontier chat model + the pace rules above                       |
| Avatar   | Any talking-head generator you already pay for                       |
| B-roll   | One image→video model + the no-text clause                           |
| Cards    | Remotion, After Effects, or CapCut templates (text only you control) |
| Cut      | CapCut / DaVinci / ffmpeg pipeline                                   |
| Captions | Auto-captions → human pass on names and keywords                     |

Upgrade pieces one at a time. The bottleneck is almost never “more models” — it’s **hook clarity + sync + honest proof**.

## Checklist before you post

- [ ] Hook is a claim, not a throat-clear
- [ ] Avatar identity is consistent across clips
- [ ] No doubled words / long pauses after key phrases
- [ ] Tool names (if any) appear when spoken
- [ ] Generative frames have **no** fake UI text
- [ ] Real screen used for any verifiable claim
- [ ] Captions match audio; keyword is readable
- [ ] Music ducked under voice
- [ ] Right CTA for the platform
- [ ] Guide or resource **live** before the reel if you promised one

## The short version

**Write for speech → generate face in short clips with a repeated character block → generate texture b-roll without text → render type in a tool you control → cut to the words → dual CTA.**

That’s the whole workflow. AI does most of the frames. Taste and sync do the rest.

If you want the next level after this: a second guide on **shot lists that match the sentence** (what’s on screen when you say each claim) — say so in a comment and we’ll queue it.
