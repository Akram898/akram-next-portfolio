---
title: "Context engineering: five rules that sharpen AI answers"
keyword: CONTEXT
summary: "A short playbook for packing the model window: write usable sources, select task facts, structure lanes, compress noise, and measure whether the new context actually helped."
publishedAt: "2026-08-07"
updatedAt: "2026-08-07"
readingMinutes: 5
tags: ["context-engineering", "rag", "llmops", "ai-engineering", "agents"]
tone: "cyan"
video:
  platform: instagram
  url: ""
status: live
---

You commented **CONTEXT**, so here is the short playbook behind the carousel.

The line to keep:

**Context is the product. The prompt is the lever.**

Most weak answers are not a model problem first. They are a packing problem: the window is noisy, incomplete, or mixed into one blob the model cannot navigate.

## Quick chooser

| Situation | Fix this first |
| --- | --- |
| The model invents process or policy | WRITE better source docs, then SELECT the right ones |
| RAG dumps half the wiki into every turn | SELECT for the task; stop full-store retrieval |
| Long chat drifts and contradicts itself | STRUCTURE lanes and COMPRESS history |
| Cost spikes with little quality gain | COMPRESS, then MEASURE cost vs accuracy |
| You “improved the prompt” but quality did not move | MEASURE context changes with a fixed eval set |

## 1. WRITE sources the model can use

Write for machines as well as people.

- Prefer short, named facts over long essays.
- State owners, dates, IDs, limits, and decisions explicitly.
- Keep one claim per section when you can.
- Avoid burying the rule inside a story.

Example shape:

```text
Policy: refunds
Owner: support-ops
Rule: full refund within 14 days if unused
Exception: digital downloads after delivery are non-refundable
Last updated: 2026-08-01
```

If a human needs three rereads to find the rule, the model will struggle too.

## 2. SELECT only what this turn needs

Retrieval is editing, not dumping.

- Retrieve for the current question, not “everything related.”
- Cap how many chunks enter the window.
- Prefer the freshest authoritative note when sources conflict.
- Drop adjacent trivia that does not change the answer.

A useful test: if removing a chunk does not change the answer, it should not have been there.

## 3. STRUCTURE the window into lanes

Keep these blocks separate so the model can stay oriented:

```text
[INSTRUCTIONS] system rules, style, safety
[MEMORY] durable user or account facts
[TOOLS] available actions and schemas
[EVIDENCE] retrieved docs, quotes, data for this turn
[USER] the actual request
```

Do not blend policy, history, tool output, and user text into one continuous paragraph. Separation reduces instruction-following mistakes and makes debugging easier.

## 4. COMPRESS without losing signal

Long threads fill the budget with decoration.

- Summarize old turns; keep decisions, constraints, and open tasks.
- Collapse repeated tool noise into one result line.
- Protect the few facts that change the next answer.
- Treat tokens like money: spend them on signal.

Compression is successful when later turns stay consistent and the bill drops.

## 5. MEASURE the packing change

Change one context variable at a time, then score it.

Minimum eval loop:

1. Freeze a set of 10–30 real questions.
2. Define pass/fail or a 1–5 score (correctness, citation use, refusal quality).
3. Run baseline packing.
4. Change one rule (selection, structure, or compression).
5. Compare accuracy, latency, and token cost.

Ship the packing change only if accuracy rises, cost falls with quality held, or both.

## Field checklist

- [ ] Sources are explicit enough to quote
- [ ] Retrieval is task-scoped, not full-dump
- [ ] Instructions / memory / tools / evidence are separated
- [ ] History is summarized, not endlessly appended
- [ ] A small eval set exists before production packing changes

## Starter packing template

```text
SYSTEM
You answer only from EVIDENCE and approved MEMORY.
If evidence is missing, say what is missing.

MEMORY
- account_plan: pro
- locale: en-AE

TOOLS
- search_docs(query)
- create_ticket(summary)

EVIDENCE
1) [refunds.md] full refund within 14 days if unused
2) [refunds.md] digital downloads non-refundable after delivery

USER
Can I refund a digital download from yesterday?
```

## Further reading

- Anthropic engineering notes on long context and effective use of the window: [anthropic.com/engineering](https://www.anthropic.com/engineering)
- OpenAI prompt engineering guidance: [platform.openai.com/docs/guides/prompt-engineering](https://platform.openai.com/docs/guides/prompt-engineering)

This guide is general engineering practice. Limits, model behavior, and product UIs change; recheck your stack when you ship.

*Published 7 August 2026.*
