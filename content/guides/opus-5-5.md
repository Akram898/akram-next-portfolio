---
title: "Claude Opus 5.5: what's new, the real-world numbers, and what breaks"
keyword: OPUS
summary: "Claude Opus 5.5 costs 40% less to run than Opus 5 and writes 30% faster. Here is every number from the reel with its source, the two viral claims I checked and cut, and the four changes that will break code you already have running on Opus 5."
publishedAt: "2026-09-23"
updatedAt: "2026-09-23"
readingMinutes: 7
tags: ["claude", "opus-5-5", "llm-cost", "agents", "migration"]
tone: "orange"
video:
  platform: instagram
  url: ""
status: live
---

You commented OPUS, so here's the full breakdown: every number from the reel with the
sentence it came from, the claims I cut, and what you need to change before you switch.

The reel was written and edited with Opus 5.5 the day after it launched. Part of that job was
checking every claim against Anthropic's own page before it went into the script. This page
is the result of that check.

## The headline numbers

All of these come from Anthropic's [launch post](https://www.anthropic.com/claude-opus-5-5),
published 22 September 2026:

| Claim | Anthropic's wording |
|---|---|
| Cheaper to run | "costs 40% less to run than Opus 5" (on typical workloads, at default settings) |
| Faster | "generates output more than 30% faster than Opus 5" |
| As capable as the top tier on most work | "performs at the level of Claude Fable 5.1 on most work" |
| Clearer writing | "communicates more naturally than prior models… puts the most important information up front" |

And the prices, per million tokens, from the [docs](https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5):

| | Opus 5 | Opus 5.5 |
|---|---|---|
| Input | $5.00 | **$4.00** |
| Output | $25.00 | **$20.00** |
| Cache read | $0.50 | **$0.20** |
| Batch (input / output) | — | $2 / $10 |

The per-token price only dropped 20%. The **40%** comes from the model doing the same work
with fewer tokens. Cache reads fell 60%, and they're most of the cost in agent loops, which
is where you'll feel the difference most.

## The three examples from the reel

These are early-tester reports quoted by Anthropic, not controlled studies. Treat them as
what one team saw, not a promise.

**Quantium:** a coding job went from four days to three hours.
> "A complex coding task that previously took 38 prompts over four days came in at 11
> prompts over three hours."

**A 680,000-line migration in under a day.**
> "One tester completed a 680,000-line code migration in less than a day."

**Deloitte:** better bug-catching at a *lower* setting.
> "Even at its lowest effort setting, Claude Opus 5.5 caught 72% of known bugs in our code
> reviews to Opus 5's 56% at high effort."

That last one is the most useful: the new model's *cheapest* setting beat the old model's
*expensive* one.

A few more worth knowing from the same page: a 200,000-line codebase audited and fixed in
under three hours, and one Stripe session that "directed a dozen more sessions" through a
rebase of 40 stacked pull requests.

## What I cut, and why

Two claims were going around on launch day that sounded great for a reel:

- a **"13,081-tile mosaic"** drawn and animated in code
- a customer run of **"over 18 hours"** on one task

Neither appears on Anthropic's launch page. They came from third-party summaries, and I
couldn't trace them to a primary source, so they're not in the video. They may be real. But
"may be real" isn't good enough for something with my face on it.

## If you use the API: four things that break

This is the part the reel had no room for. Changing the model ID from `claude-opus-5` to
`claude-opus-5-5` is not a drop-in swap. From Anthropic's
[what's new page](https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5):

**1. Thinking can't be turned off.** `thinking: {"type": "disabled"}`, or a manual
`budget_tokens`, now returns a 400. Remove the field, or send `{"type": "adaptive"}`, and
control depth with `effort` instead.

**2. Forced tool use is gone.** `tool_choice` of `"any"` or `{"type": "tool", ...}` returns a
400. Use `"auto"` with `strict: true` tool definitions, or structured outputs if you need
schema-valid JSON.

**3. Thinking blocks are tied to the model and the conversation.** If you edit the system
prompt, tools, or an earlier message after a thinking block was produced, replaying that
block can fail, and this is enforced by default for accounts created on or after 31 August
2026. Keep conversations append-only.

**4. The old computer-use tool is rejected** on the Claude API and Google Cloud. Move from
`computer_20251124` to the `computer_toolset_20260801` toolset.

And one change that doesn't error but will surprise you:

- **The default effort is now `medium`**, not `high`. If you never set it, you just changed
  it. It also thinks more per turn at the same level, so leave room in `max_tokens`.
- **The text between tool calls moves into `thinking` blocks**, which come back empty by
  default. If your app streams progress notes to users, it goes quiet until you set
  `thinking.display`.

The minimal migration:

```python
response = client.messages.create(
    model="claude-opus-5-5",          # was "claude-opus-5"
    max_tokens=16000,
    output_config={"effort": "high"},  # set it explicitly; the default is now medium
    messages=[{"role": "user", "content": "..."}],
)
# and pick content blocks by type, never by position:
text = "".join(b.text for b in response.content if b.type == "text")
```

Anthropic's [migration guide](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide)
has the full checklist.

## If you just use Claude

Anthropic says it's available now "on all platforms", and that includes Claude Code. The practical advice: give it the task you
gave up on with the last model, the long one. Long, sprawling jobs are where the gap shows,
and they're also where the 40% saving adds up.

## The short version

Cheaper, faster, and clearer. The part I'd actually remember is the Deloitte number: the
lowest setting beat the old model's high one. Start low, and only turn it up if you need to.

---

*Numbers checked against Anthropic's launch post and docs on 23 September 2026. Prices move,
so the [pricing page](https://platform.claude.com/docs/en/about-claude/pricing) is the source
of truth, not this page. Not affiliated with Anthropic.*
