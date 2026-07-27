---
title: "Claude Opus 5 vs GPT-5.6: build a router, not a model religion"
keyword: GUIDE
summary: "A practical model-routing playbook for Claude Opus 5 and the GPT-5.6 family, including current prices, a decision table, a TypeScript router, evaluation criteria, and production guardrails."
publishedAt: "2026-07-28"
updatedAt: "2026-07-28"
readingMinutes: 9
tags: ["model-routing", "claude", "openai", "llmops"]
tone: "orange"
video:
  platform: instagram
  url: ""
status: live
---

You commented **GUIDE**, so here is the complete version: what each model family is built
for, what the API actually costs, how I would route production work, and the evaluation
contract I would use before shipping it.

The short answer is simple: do not choose a permanent winner. Give each model a lane, then
make it earn that lane on your own work.

![Claude Opus 5 and GPT-5.6 model-routing field guide](/guides/claude-opus5-gpt56-cover.png)

## What changed

The market is moving from one flagship per provider toward distinct operating points.

Anthropic describes **Claude Opus 5** as a thoughtful, proactive model for everyday complex
coding and knowledge work. It is stronger at verifying its work and iterating carefully.
The API model is `claude-opus-5`.

OpenAI launched **GPT-5.6** as a three-model family:

- `gpt-5.6-sol` for flagship capability
- `gpt-5.6-terra` for a balance of intelligence and cost
- `gpt-5.6-luna` for efficient, high-volume work

The `gpt-5.6` alias currently points to Sol. That makes the unqualified alias a capability
choice, not a cost-neutral default.

This is why "Which model is best?" is the wrong production question. The useful question is:
**Which model should handle this task under this quality threshold, latency target, and
budget?**

## Current API prices

Regular text-token pricing per one million tokens:

| Model | Input | Output | Useful starting lane |
|---|---:|---:|---|
| Claude Opus 5 | $5.00 | $25.00 | Complex coding and careful professional work |
| GPT-5.6 Sol | $5.00 | $30.00 | Frontier reasoning and difficult coding |
| GPT-5.6 Terra | $2.50 | $15.00 | Balanced production work |
| GPT-5.6 Luna | $1.00 | $6.00 | Fast, cost-sensitive volume |

List price is only the first filter. Total cost also includes reasoning tokens, retries,
tool calls, duplicated context, failed structured outputs, and human review.

A model that costs less per token can still cost more per successful task if it needs three
attempts and a manual repair. A more expensive model can be cheaper when it finishes cleanly
on the first pass.

## Where Claude Opus 5 belongs in the evaluation

Opus 5 is the candidate I would test when the work has a high cost of a shallow answer:

- complex debugging and root-cause analysis
- long-running feature work across an existing codebase
- dense research or professional deliverables
- tasks that need careful iteration before handoff
- work where judgment matters more than raw response speed

Anthropic says Opus 5 verifies its own work more strongly. That does not remove the need for
external tests or human approval. It does mean old prompts that repeatedly tell the model to
"double-check everything" may waste tokens. Anthropic's prompting guide recommends removing
redundant verification instructions and evaluating the result.

Opus 5 supports five effort levels: `low`, `medium`, `high`, `xhigh`, and `max`. The default
is `high`. Start there, test one level lower for routine lanes, and reserve `xhigh` or `max`
for tasks where your evaluation proves the extra reasoning is useful.

## Where the GPT-5.6 family belongs

The advantage of GPT-5.6 is that the routing tiers are explicit.

**Luna** is the first candidate for high-volume transformations, extraction, classification,
and other tasks where speed and cost dominate.

**Terra** is the first candidate for everyday production work that still needs solid
reasoning, tool use, and dependable structured output.

**Sol** is the candidate for difficult reasoning, advanced coding, complex tool workflows,
and jobs where capability matters more than latency or token spend.

OpenAI recommends the Responses API for reasoning, tool use, and multi-turn workflows.
GPT-5.6 supports reasoning effort from `none` through `max`, so model tier and reasoning
effort should be evaluated as two separate controls.

Do not assume that Sol at a low effort setting equals Terra at a higher one. Test both on the
same tasks. The model and the effort setting form one production profile.

## A practical routing table

Treat this as a shortlist for evaluation, not a universal truth:

| Workload | First candidate | Escalation candidate | What to measure |
|---|---|---|---|
| Extraction and formatting | GPT-5.6 Luna | GPT-5.6 Terra | Schema pass rate, latency, cost |
| High-volume support drafting | GPT-5.6 Luna | GPT-5.6 Terra | Policy accuracy, edits, p95 latency |
| General agent workflow | GPT-5.6 Terra | Opus 5 or GPT-5.6 Sol | Completion rate, tool errors, retries |
| Complex codebase change | Opus 5 | GPT-5.6 Sol | Tests passed, review time, regression rate |
| Ambiguous architecture work | Opus 5 or GPT-5.6 Sol | Human review | Decision quality, unsupported assumptions |
| High-impact external output | Best evaluated model | Human approval | Factual accuracy, risk, auditability |

The escalation column matters. Routing should not mean silently accepting a weak answer from
the cheap lane. A route needs a measurable exit condition.

## The smallest useful router

Keep the first version boring. A typed policy is easier to test than an agent that invents
its routing logic on every request.

```ts
type ModelProfile =
  | "gpt-5.6-luna"
  | "gpt-5.6-terra"
  | "gpt-5.6-sol"
  | "claude-opus-5";

type Task = {
  kind: "extract" | "draft" | "code" | "architecture";
  risk: "low" | "medium" | "high";
  volume: "single" | "batch";
  ambiguity: "low" | "high";
};

export function route(task: Task): ModelProfile {
  if (task.kind === "extract" && task.risk === "low") {
    return "gpt-5.6-luna";
  }

  if (task.volume === "batch" && task.ambiguity === "low") {
    return "gpt-5.6-terra";
  }

  if (task.kind === "code" || task.kind === "architecture") {
    return "claude-opus-5";
  }

  return "gpt-5.6-terra";
}
```

This policy is intentionally incomplete. Your evaluation can replace any default. If Sol
wins your code lane, route code to Sol. If Terra clears the quality bar, do not pay for a
deeper model because the diagram looks impressive.

![Model-routing architecture with fast, deep, and review lanes](/guides/claude-opus5-gpt56-router.png)

## Define the evaluation contract first

Run every candidate against the same representative task set. Twenty to fifty real tasks is
a useful first pass. Keep the prompt, tools, input data, output schema, and reviewer rubric
fixed.

Measure at least four things:

1. **Correctness:** Did it satisfy the rubric and pass deterministic checks?
2. **Latency:** What are median and p95 completion times, including tool calls?
3. **Total cost:** What did the successful workflow cost after retries and context?
4. **Review time:** How many human minutes were needed before approval?

Also record refusal rate, timeout rate, invalid structured outputs, tool failures, and the
number of attempts. Average token cost without completion rate is not a useful production
metric.

The result should be a small registry of approved profiles, not a ranking of every model on
the internet.

```ts
type ApprovedLane = {
  task: string;
  primary: ModelProfile;
  fallback: ModelProfile;
  qualityFloor: number;
  maxCostUsd: number;
  maxLatencyMs: number;
  requiresHumanApproval: boolean;
};
```

## Production guardrails

Before sending real work through the router:

- validate structured output before downstream use
- set timeouts and retry limits per model profile
- distinguish a refusal from an API failure
- log the selected route and the reason for it
- preserve prompt and model versions for evaluation replay
- redact sensitive data before provider calls where required
- keep human approval for legal, financial, medical, security, and other high-impact outputs
- re-run the evaluation when a model alias, prompt, tool, or effort setting changes

Standardize the interface around the models: input contract, output schema, telemetry,
approval rules, and failure handling. The provider-specific implementation stays behind that
contract.

## The decision rule

Start with the smallest roster that covers your real workloads:

- one efficient default lane
- one deeper reasoning lane
- one explicit fallback
- one human approval path

Add another model only when your evaluation identifies a lane it can win. More providers are
not automatically more resilient. They also create more privacy review, regression testing,
billing logic, and failure modes.

The goal is not to predict the permanent winner. It is to build a system where changing the
winner is cheap.

## Primary sources

- [Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)
- [Claude model overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Claude effort controls](https://platform.claude.com/docs/en/build-with-claude/effort)
- [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
- [GPT-5.6 launch](https://openai.com/index/gpt-5-6/)
- [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI model catalog](https://developers.openai.com/api/docs/models)

*Prices and model details were checked against first-party sources on 28 July 2026. Recheck
the linked pricing and model pages before committing a production budget.*
