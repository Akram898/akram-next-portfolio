---
title: "Opus 5 vs Fable 5: the model picker is not your cost dial"
keyword: OPUS5
summary: "Claude Fable 5 costs exactly twice what Claude Opus 5 costs, and that is the least useful number on the page. Here are both price tables, the one setting that actually moves your bill, and the prompt instruction you should delete today."
publishedAt: "2026-07-26"
updatedAt: "2026-07-26"
readingMinutes: 7
tags: ["claude", "llm-cost", "prompting", "agents"]
tone: "signal"
video:
  platform: instagram
  url: ""
status: live
---

You commented OPUS5, so here is the whole thing: both price tables, what the 2× actually
buys you, and the three changes worth making today.

The reel had thirty seconds. This has room for the numbers.

## The prices, straight

From Anthropic's own [pricing table](https://platform.claude.com/docs/en/about-claude/pricing),
per million tokens:

| Model | Input | Output | 5m cache write | Cache read |
|---|---|---|---|---|
| Claude Fable 5 | $10.00 | $50.00 | $12.50 | $1.00 |
| Claude Opus 5 | $5.00 | $25.00 | $6.25 | $0.50 |

Exactly 2×, on every line. Both have a 1M-token context window and a 128K max output. Both
run the same five effort levels.

Fable 5 is Anthropic's most capable widely released model, and Opus 5 is described as
delivering its step-change *"at half the cost of Claude Fable 5"* — with Fable remaining the
highest-capability tier. So the sticker comparison is honest. It is also not the number that
decides your bill.

## Why the 2× understates it

**Fable cannot turn thinking off.** Not "shouldn't" — cannot. From the
[thinking docs](https://platform.claude.com/docs/en/build-with-claude/thinking):

> Claude Fable 5, Claude Mythos 5, and Claude Mythos Preview reject `thinking: {type: "disabled"}`: thinking cannot be turned off on these models.

Opus 5 accepts `disabled` at effort `high` or below. Pair it with `xhigh` or `max` and you
get a 400 — and that is checked per request, so a later call that raises effort while
thinking is still disabled fails even though earlier ones succeeded.

Thinking tokens bill as output tokens. So on Fable you are paying the doubled output rate on
a token count you cannot floor. That is the real gap: not 2×, but 2× applied to more tokens.

**You can measure this on your own traffic.** The response carries the breakdown:

```json
{
  "usage": {
    "input_tokens": 25,
    "output_tokens": 348,
    "output_tokens_details": { "thinking_tokens": 312 }
  }
}
```

`output_tokens` is the billed total; `thinking_tokens` is how much of it was reasoning.
Subtract for the answer portion. Log that field for a day before you argue with anyone about
model choice — including yourself.

## The dial nobody touches

`effort` is the primary control over how much Claude thinks and spends. It goes inside
`output_config`, not at the top level, and it is GA — no beta header:

```python
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=16000,
    output_config={"effort": "medium"},
    messages=[{"role": "user", "content": "..."}],
)
```

Five levels, and the default is `high`:

| Level | What it does |
|---|---|
| `max` | Always thinks, no constraint on depth |
| `xhigh` | Always thinks deeply, extended exploration |
| `high` | **The default.** Almost always thinks |
| `medium` | Moderate; may skip thinking on simple queries |
| `low` | Minimises thinking; skips it where speed matters |

The documented starting points are `xhigh` for coding and agentic work and `high` for other
intelligence-sensitive workloads. But the useful advice is the other direction: **sweep
downward from there.** On Opus 5, `low` and `medium` are unusually strong — real quality at a
fraction of the tokens and latency on many workloads.

Two things worth knowing before you sweep:

- **Setting `effort` to `high` is identical to omitting it.** If you have never set it, you
  are on `high`.
- **Changing effort between turns invalidates your prompt cache.** The resolved value is
  rendered into the prompt. Pick a level per conversation and hold it; steer individual
  turns with prompting instead.

## Three changes worth making today

### 1. Delete your verification instructions

This is the one that surprises people, because it inverts standard prompting advice. From
Anthropic's [Opus 5 prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5):

> Claude Opus 5 verifies its own work without being told to. If your prompt contains explicit verification instructions ("include a final verification step for any non-trivial task," "use a subagent to verify"), remove them: instructions like these cause over-verification on Claude Opus 5, and removing them reduces wasted tokens with no loss in quality.

Read that last clause again — **no loss in quality**. This is a delete, not a rewrite. Same
goes for per-prompt phrasing like *"double-check your answer"* and *"re-verify before
responding"*, and for harness-level verification steps you added for an older model.

If you maintain a shared prompt library that says "ask the model to self-check", it needs a
carve-out. That advice is still fine in general; it is wrong here.

### 2. If you upgraded from Opus 4.8, check `max_tokens`

Thinking is **on by default** on Opus 5. On Opus 4.8, omitting `thinking` meant no thinking.
So a route that never set the field now thinks — and `max_tokens` is a hard cap on thinking
*plus* response text combined.

The failure looks like a truncated answer with `stop_reason: "max_tokens"`. Either raise
`max_tokens`, or lower effort so less of the budget goes to reasoning. Which one depends on
whether those requests actually needed the reasoning.

### 3. Cap your subagents

Opus 5 delegates more readily than Opus 4.8 did — and 4.8 *under*-delegated, so guidance you
wrote to encourage delegation is now pushing in the wrong direction. Every subagent
re-establishes context, re-explores, reports back, and then the coordinator reads the report.
Anthropic's own guidance is explicit that verification is not a reason to spawn one:

> do not use subagents to verify or double-check your own work

Remove the "delegate more" nudges, and set a ceiling.

## So which one should you call?

**Opus 5 for almost everything.** Complex agentic coding, enterprise work, long-horizon
tasks. Start at `xhigh` for coding, `high` elsewhere, then sweep down and keep the lowest
level your evals accept.

**Fable 5 when the task is genuinely at the frontier** — the hardest reasoning and
longest-horizon agentic work, where capability matters more than spend. Two operational
things to know before you commit: single requests on hard tasks can run **many minutes**, so
plan timeouts, streaming and progress UX; and Fable requires **30-day data retention** — an
org configured for zero data retention gets a 400 on every request, with a perfectly valid
payload.

**And check `stop_reason` before reading `content` on both.** Safety classifiers can decline
a request and return HTTP 200 with `stop_reason: "refusal"`. Code that indexes `content[0]`
unconditionally breaks on it. The `fallbacks` parameter re-runs a declined request on another
model inside the same call; prefer `fallbacks: "default"` over pinning a model, so routing
follows the refusal category rather than a list you have to maintain.

## The short version

The model picker is a one-time decision worth maybe 2×. Effort, thinking defaults and a
handful of stale prompt instructions are a permanent decision worth considerably more — and
they are the ones nobody revisits.

Go read your system prompt. If it tells the model to double-check its work, you just found
your first saving.

---

*Numbers here were checked against Anthropic's docs on 26 July 2026. Pricing moves — the
[pricing page](https://platform.claude.com/docs/en/about-claude/pricing) is the source of
truth, not this page.*
