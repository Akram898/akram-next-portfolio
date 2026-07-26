---
title: "Kimi K3: unmetered is not free — the actual cost breakdown"
keyword: KIMI
summary: "Kimi K3 is 2.8 trillion parameters and the weights are public. That does not make it free, it makes it unmetered — and the two words have very different invoices. Here is what self-hosting it actually needs, and the split that beats picking a side."
publishedAt: "2026-07-26"
updatedAt: "2026-07-26"
readingMinutes: 8
tags: ["open-weights", "self-hosting", "llm-cost", "inference"]
tone: "orange"
video:
  platform: instagram
  url: ""
status: live
---

You commented KIMI, so here is the cost breakdown — what the hardware actually is, where
self-hosting genuinely wins, and the split most teams should be running instead of picking a
side.

## What actually shipped

| | |
|---|---|
| Total parameters | **2.8 trillion** |
| Architecture | Mixture of Experts — **896 experts, 16 active per token** |
| Active compute | ~50B-equivalent per token |
| Context window | 1,000,000 tokens |
| Weights on disk | **~1.4 TB** (MXFP4 weights, MXFP8 activations) |
| Licence | **not published at time of writing** |

Announced 16 July 2026 at WAIC in Shanghai; weights scheduled for Hugging Face on **27 July
2026**. It is the first open-weight model in the 3-trillion-parameter class.

**Two honest caveats before you plan anything around this.**

The **licence was still listed as "TBD with weight release"** when this was written. Open
weights and a permissive licence are not the same thing, and the difference decides whether
you can use it commercially at all. Read the licence on the model card before you spend a
day on a deployment plan — not after.

And on benchmarks: K3 is reported as *competitive with* frontier models on coding evals like
LiveCodeBench and SWE-bench, matching or beating them on some. That is a real result. It is
not the same as "top of every leaderboard", and you should size your expectations to the
first sentence rather than the second.

## Why "free" is the wrong word

The weights cost nothing. Running them costs a great deal.

A published practical minimum for serving K3 is an **8-node cluster, 8× 80GB GPUs per node**
— 64 GPUs, about 5.12 TB of aggregate GPU memory. The floor for loading the weights alone is
~1.4 TB; the rest is headroom for KV-cache and activations, and with a 1M context window the
KV-cache is not a rounding error.

So the honest sentence is: *you did not delete the invoice, you moved it.* It moved from a
per-token line on a vendor bill to:

- GPU capex, or a reserved-instance commitment
- Power and cooling, billed whether or not anyone is using the model
- An engineer who owns uptime, quantisation, batching, upgrades and the pager

That third one is the one nobody budgets. Per-token pricing includes somebody else's on-call
rotation.

**The economics invert on utilisation, not on price per token.** Self-hosting has a
near-fixed cost: a cluster idling at 5% costs the same as one at 95%. Per-token has a
near-zero fixed cost and a linear variable one. So the question is never "which is cheaper" —
it is "how close to saturated will this hardware actually be?"

Below roughly 30–40% sustained utilisation, dedicated hardware usually loses to per-token,
because you are paying for a cluster to sit warm. Measure yours before you commit. The
number you need is not your peak, it is your *average across a week including nights and
weekends*.

## The split nobody runs

Most teams argue about which side to pick. The answer is usually both, routed by whether
being right matters on that call.

**Send to the self-hosted model** — high volume, low stakes, output nobody reads closely:

- Autocomplete and inline completions
- Bulk refactors and codemods
- Classification, tagging, routing, extraction
- First-pass summarisation
- Test scaffolding
- Anything you regenerate freely because it's cheap

These share a shape: **enormous volume, and a cheap failure**. A slightly worse completion
costs a keystroke. That is exactly the workload that makes a fixed-cost cluster pay, because
it's what keeps utilisation high.

**Keep on a per-token frontier model** — low volume, high stakes:

- Architecture and design decisions
- Debugging something genuinely ambiguous
- Anything touching security, auth, payments or migrations
- The final review before a PR merges
- Anything a customer sees unedited

These are low volume and expensive to get wrong. Paying per token here is not the expensive
option — a bad architectural call costs more than a year of API spend.

The routing rule that survives contact with reality: **if a wrong answer costs more than the
call, do not route it to save money.**

### Making the routing real

Route on the *call site*, not on a model judging difficulty at runtime — a classifier in
front of every request adds latency and a new failure mode to save a fraction of a cent.

Your autocomplete endpoint always goes local. Your architecture-review endpoint always goes
frontier. Both are one config value, both are testable, and neither can surprise you at 3am.

Two things worth building on day one:

- **Log which route every call took, with its outcome.** Within a week you will have evidence
  instead of opinions, and you will find at least one route you guessed wrong.
- **Make the fallback explicit.** When the cluster is down, does the request fail or spill to
  the API? Decide it deliberately, because you will find out either way.

## So should you self-host K3?

**Probably yes if** you have sustained high-volume inference, existing GPU capacity or a real
capex budget, someone whose job includes this cluster, and a data-residency or privacy
requirement that makes an external API awkward. That last one is often the real driver — and
it is a better reason than cost, because it doesn't depend on your utilisation being high.

**Probably no if** your volume is bursty, your team is small, or you are still finding
product-market fit. Renting compute you use 20% of is a worse deal than per-token pricing,
and you will discover that after the commitment, not before.

**Almost certainly the split** if you have one very high-volume workload and a long tail of
harder ones. That is most engineering teams.

## The short version

Open weights removed the vendor, not the cost. What you gain is control — over data
residency, over versioning, over whether someone deprecates your model. What you take on is
capex, utilisation risk, and an on-call rotation.

Pick the boring high-volume work to self-host, pay per token for the calls where being right
matters, and route on the call site so it's testable.

That's where the money is. Not in picking a side.

---

*Figures checked on 26 July 2026 against Moonshot's announcement and the published model
overview. The weights land 27 July and **the licence had not been published yet** — read the
model card before committing to anything.*
