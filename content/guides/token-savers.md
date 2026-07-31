---
title: "The 4 tools that actually cut your AI tokens, with the numbers behind them"
keyword: FORGE
summary: "Every 'these 5 plugins cut your tokens 70%' video skips the part where the number comes from. Here are four real Claude Code tools — ForgeKit, Caveman, Ponytail, Superpowers — with the actual sourced figures, the commands to check them yourself, and the one honest gap in the list."
publishedAt: "2026-07-30"
updatedAt: "2026-07-30"
readingMinutes: 7
tags: ["claude-code", "ai-agents", "llm-cost", "developer-tools"]
tone: "violet"
video:
  platform: instagram
  url: ""
status: live
---

You commented FORGE, so here are all four tools, in more depth than thirty seconds allows —
what each one actually claims, the command that shows you the real number, and the one tool
on this list that doesn't have a percentage at all.

## The "up to 65%" in the hook is one tool's ceiling, not an average

That number is Caveman's measured output-token cut — real, but it's the top of this list,
not what all four deliver. Below is what each tool actually gets you, so you can judge which
of these you'd install rather than take the hook's word for it.

| Tool | The sourced number | What it's actually for | Maturity signal |
|---|---|---|---|
| **ForgeKit** | 62.1% cost cut vs. always-premium routing; 118ms median gate check | Cognitive substrate: shared memory + blast-radius prediction across 9 coding tools | 2 GitHub stars, 513 commits — new, MIT-licensed, docs self-describe as beta |
| **Caveman** | 65% fewer output tokens, measured | Ultra-compressed communication mode | Installed skill, ships its own `/caveman-stats` verifier |
| **Ponytail** | No single percentage | Forces the laziest solution that still works (a YAGNI enforcer) | Installed skill, ships a benchmark scoreboard instead of a marketing number |
| **Superpowers** | No token number | Full dev methodology: brainstorm → spec → worktree → TDD, 20+ skills | Most-starred plugin in the entire Claude Code marketplace |

Three of four have a number. One doesn't. That split is the actual point of this guide —
a genre built on one recycled percentage hides how differently-shaped these tools really are.

## Start here: ForgeKit

[ForgeKit](https://github.com/CodeWithJuber/forgekit) unifies Claude Code, Codex, Cursor and
six other coding tools under one cognitive substrate — shared memory, model routing, and a
pre-action gate that predicts blast radius before a change lands. Its own benchmark reports
**62.1% cost savings versus always routing to the premium model**, with a **118ms median**
gate check.

Install it the same way as any other marketplace plugin:

```
/plugin marketplace add CodeWithJuber/forgekit
/plugin install forgekit@forge
```

**Two things worth knowing before you lean on it.** It's genuinely new — 2 GitHub stars, 513
commits at the time this was checked — and its own docs call the impact analysis
"heuristic — regex-approximate, not a sound call graph." That's not a knock; a tool that
states its own limits in its docs is doing something most tooling in this space doesn't.
The 62.1%/118ms figures are ForgeKit's own benchmark claims (`reports/benchmarks.md` in the
repo), not independently reproduced here — check them against your own workload before
treating them as a guarantee.

## The real 65%: Caveman

Caveman is an ultra-compressed communication mode — it rewrites the model's output into a
terse, information-dense register that cuts the token count of what actually gets generated.
The **65% fewer output tokens** figure is measured, not modeled: run

```
/caveman-stats
```

and it reads the number straight from your actual Claude Code session log, not an LLM
estimate of what it probably saved. That's the number the hook's "up to 65%" points back to —
stated honestly as this list's ceiling, not as what the other three tools also deliver.

## The scoreboard with no percentage: Ponytail

Ponytail is a YAGNI enforcer — it pushes toward the simplest solution that actually works:
standard library over a dependency, one line over fifty, deleting scope instead of building
around it. It does not have a single headline percentage, and this guide isn't going to
invent one for it. What it has instead is its own measured scoreboard:

```
/ponytail-gain
```

which reports **94% less code, 77% cheaper, and 3–6x faster**, as benchmark medians across 5
tasks and 3 models. That's a real, checkable result — it's just shaped differently from a
single "cut your tokens by X%" line, which is exactly why the video doesn't force it into
that shape.

## The one with no token claim at all: Superpowers

[Superpowers](https://github.com/obra/superpowers) is a full development methodology, not a
token-reduction tool — brainstorm, spec, worktree, TDD, wired through 20+ skills. It is
independently corroborated (DeepWiki, claudemarketplaces.com, designrevision.com all describe
it the same way) as **the most-starred plugin in the entire Claude Code marketplace**, built
by `obra` (Jesse Vincent).

Its pitch is fewer failed attempts, not fewer tokens per attempt — rework is what actually
burns your token budget, and this is the tool aimed at that instead of at the per-response
count. Install:

```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

## So which do you actually install

**ForgeKit first**, specifically because it's the newest and least proven of the four while
making the most technically ambitious claim — and because its own docs are upfront about
being beta. Pair it with **Caveman** if verbose output is genuinely your bottleneck. Add
**Ponytail** as a standing discipline rather than a one-time install — its value compounds
the longer it's enforcing the smaller diff. **Superpowers** is the heaviest lift of the four
(20+ skills, a full methodology) — worth it if rework, not raw token count, is your actual
cost center.

None of these are mutually exclusive, and none of them require believing a round number on a
thumbnail. Run the commands above yourself; every figure in this guide is reproducible from
your own session, not just quoted from someone's marketing page.

## The short version

Three of four tools on this list have a real, sourced number behind them. The fourth has a
scoreboard instead of a percentage, and says so. That variety is the tell that these numbers
are real — a genre built on one recycled "70%" never looks like this.

---

*Figures checked 30 July 2026 against ForgeKit's and Superpowers' own repos
(`github.com/CodeWithJuber/forgekit`, `github.com/obra/superpowers`) and this workspace's own
`/ponytail-gain` and `/caveman-stats` output. ForgeKit's cost and latency figures are its own
benchmark claims, not independently reproduced — re-check them against your workload before
relying on them.*
