---
title: "Trinity-Large-Thinking: the full numbers, the license mix-up, and where to run it"
keyword: TRINITY
summary: "The complete benchmark table behind Arcee AI's Trinity-Large-Thinking, why the press and the model's own Hugging Face card disagree on its license, and the three real ways to run it — API, download, or OpenRouter."
publishedAt: "2026-08-28"
updatedAt: "2026-08-28"
readingMinutes: 5
tags: ["open-source-ai", "llm", "arcee-ai", "ai-models", "mixture-of-experts"]
tone: "violet"
video:
  platform: instagram
  url: ""
status: live
---

You commented **TRINITY**, so here's the rest of it: the full benchmark table (not just
the one number), a real discrepancy I found between two of Arcee's own pages, and exactly
where to run this thing.

## What it actually is

**[Trinity-Large-Thinking](https://huggingface.co/arcee-ai/Trinity-Large-Thinking)**,
released by [Arcee AI](https://www.arcee.ai/blog/trinity-large-thinking) on 1–2 April
2026, is a sparse mixture-of-experts reasoning model:

- **~398 billion total parameters, ~13 billion active per token** — a 4-of-256 expert
  routing strategy (256 experts, 1 shared, ~1.56% sparsity)
- Trained on **17 trillion tokens** across **2,048 Nvidia B300 GPUs**
- **262,144-token context window** on the model card and OpenRouter's listing. Arcee's own
  marketing separately says "512k" — the two don't agree, and this page uses the
  card-verified number.

## The full benchmark table

The reel said "91.9% on PinchBench, second place, behind only Opus 4.6" — accurate, but
it's one row out of the actual comparison table on Trinity's own Hugging Face card. Here's
the whole thing, Trinity vs. the four models Arcee chose to compare it against:

| Benchmark | Trinity-Large-Thinking | Opus-4.6 | GLM-5 | MiniMax-M2.7 | Kimi-K2.5 |
|---|---|---|---|---|---|
| IFBench | 52.3 | 53.1 | 72.3 | **75.7** | 70.2 |
| GPQA-Diamond | 76.3 | **89.2** | 81.6 | 86.2 | 86.9 |
| Tau2-Airline | **88.0** | 82.0 | 80.5 | 80.0 | 80.0 |
| Tau2-Telecom | 94.7 | 92.1 | **98.2** | 84.8 | 95.9 |
| PinchBench | 91.9 | **93.3** | 86.4 | 89.8 | 84.8 |
| AIME25 | 96.3 | **99.8** | 93.3 | 80.0 | 96.3 |
| BCFLv4 | 70.1 | **77.0** | 70.8 | 70.6 | 68.3 |
| MMLU-Pro | 83.4 | **89.1** | 85.8 | 80.8 | 87.1 |
| SWE-bench Verified | 63.2 | **75.6** | 72.8 | 75.4 | 70.8 |

**Bold = highest in that row.** Read plainly: Opus-4.6 wins six of the nine benchmarks
shown, GLM-5 wins two, and Trinity wins exactly one outright (Tau2-Airline) — with a strong
second-place showing on PinchBench specifically, which is the number Arcee led with and the
reel repeated. "Second on PinchBench" is real and sourced. "Second-best model," full stop,
is not what this table shows, and I don't want to leave that impression standing.

## The license discrepancy

This is worth flagging on its own. **Arcee's own blog post says**, in plain prose: *"Today
we are releasing Trinity-Large-Thinking on our API and the weights on Hugging Face under
the Apache 2.0 license."* **The Hugging Face model card's actual license field**, the one
that governs the repo, reads `openmdw-1.1` — Arcee's own "Open Model & Data Weights"
license, not literally Apache 2.0.

I don't know which one is the controlling document. If you're evaluating this for anything
where the license terms actually matter, **read the license field on the model repo
yourself** rather than trusting either the press coverage or this page. That's not
hedging — it's the one fact here I can't independently resolve for you.

## Pricing

**$0.90 per million output tokens** on Arcee's own API. For comparison, Claude Opus 4.6 is
**$5 / $25** per million input/output tokens on Anthropic's first-party pricing — so the
"96% cheaper" figure reported by press is doing real, checkable math on real numbers, even
though it's not a phrase Arcee's own materials use.

## Where to actually run it

- **Arcee's own API** — [chat.arcee.ai](https://www.arcee.ai/)
- **Hugging Face** — [arcee-ai/Trinity-Large-Thinking](https://huggingface.co/arcee-ai/Trinity-Large-Thinking),
  open weights, downloadable
- **OpenRouter** — listed with reasoning and tool-calling support, no separate setup

## Should you actually use it

If your workload is agentic tool-use and cost matters more than shaving the last few
points off a benchmark, it's a real, cheap, capable option — genuinely competitive with the
open-weight competitors it's compared against here. If you need the best score on any
single benchmark in that table other than Tau2-Airline, the table already tells you which
model wins it, and it usually isn't this one.

One more thing worth saying plainly: **~398 billion total parameters is not a
self-host-on-your-laptop model**, even with only 13B active per token. Running it yourself
means real infrastructure, not a weekend project. The API and OpenRouter routes exist for
exactly that reason.

## Related on this site

If you're choosing between Claude models for your own routing setup, see
[Claude Opus 5 vs. GPT-5.6 model routing](/guides/claude-opus5-gpt56-model-routing).

## Sources

- [Arcee AI — Trinity-Large-Thinking announcement](https://www.arcee.ai/blog/trinity-large-thinking)
- [Hugging Face — arcee-ai/Trinity-Large-Thinking model card](https://huggingface.co/arcee-ai/Trinity-Large-Thinking)
  (primary source for parameters, MoE config, the full benchmark table, and the license
  field)
- Anthropic's own pricing page, current as of 28 August 2026, for the Opus 4.6 comparison

Verified live 28 August 2026. Product names are factual; no vendor partnership or
endorsement is implied.

*Published 28 August 2026.*
