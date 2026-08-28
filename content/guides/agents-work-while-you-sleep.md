---
title: "OpenClaw and Hermes Agent: the real setup for agents that work while you sleep"
keyword: NIGHTSHIFT
summary: "The actual install commands for OpenClaw and Hermes Agent, which model does the thinking behind either one, and the three guardrails to set before you let anything run unattended — the setup the reel promised, not just the pitch."
publishedAt: "2026-08-28"
updatedAt: "2026-08-28"
readingMinutes: 6
tags: ["ai-agents", "openclaw", "hermes-agent", "automation", "agentic-ai"]
tone: "cyan"
video:
  platform: instagram
  url: ""
status: live
---

You commented **NIGHTSHIFT**, so here's the setup: which tool, which model, and the
guardrails I didn't have time to explain in 45 seconds.

Quick honesty check before anything else: **"it built something while you were away" is
the claim this is actually good for.** Neither tool prints you money. What they do is keep
running after you close the laptop — which is a real, useful, and slightly more boring
thing than the hook made it sound.

## The two tools

**[OpenClaw](https://openclaw.ai/)** and **[Hermes Agent](https://hermes-agent.nousresearch.com/)**
are both free, open-source personal AI agent platforms. Neither is a model — they're the
shell that keeps a model alive between messages, gives it memory, a schedule, and shell
access, and lets you talk to it over chat apps instead of a browser tab.

- **OpenClaw**, from Peter Steinberger, is the more widely adopted of the two — 29 channels
  (Telegram, WhatsApp, Discord, Slack, Signal, iMessage, and more), works on macOS, Windows,
  and Linux.
- **Hermes Agent**, from Nous Research, is MIT-licensed, with the same multi-channel
  persistent-memory design and explicit support for running unattended "through the
  gateway" — reports, backups, briefings, no human watching.

Pick one to start. They solve the same problem; the differences are in the ecosystem and
community around each, not the core mechanic.

## Install

Both install with a one-liner. Read it before you run it — that's not a formality, it's
the first guardrail.

**OpenClaw**, Windows:
```
powershell -c "irm https://openclaw.ai/install.ps1 | iex"
```
macOS/Linux installs are documented on [openclaw.ai](https://openclaw.ai/) under Quick
Start — the one-liner installs Node.js and everything else for you.

**Hermes Agent**, Windows:
```
irm https://hermes-agent.nousresearch.com/install.ps1 | iex
```
macOS/Linux instructions are on the same page, or grab the native desktop app for macOS,
Windows, or Linux directly.

## Which model actually does the thinking

This is the part the reel compressed into one line and it's worth a paragraph: **the agent
framework and the model are two different layers.** OpenClaw and Hermes Agent are the
persistence layer — memory, scheduling, the shell you're texting. They don't think; they
keep something else alive and connected. **Claude does the thinking** in the demo, because
that's the model both frameworks can orchestrate — OpenClaw's own site lists Claude and GPT
side by side in its integrations row, and Anthropic's own [Claude plans
page](https://claude.com/) documents connecting external tools and services through
**remote MCP** connectors, which is the mechanism that makes this kind of hookup possible
from Claude's side.

Practically: you're choosing a framework (OpenClaw or Hermes Agent) *and* a model behind it
(Claude, GPT, or a local model, depending on what the framework supports and what you
connect). Don't conflate the two when you're reading either project's docs.

## The guardrails — set these first

This is the line in the video I flagged as the one thing that couldn't get cut for time,
and it isn't padding here either.

**Spending limits.** Anything with API access and the ability to act can also spend. Set a
hard usage cap at the provider level before you hand an agent a schedule, not after.

**A sandboxed shell.** OpenClaw's own site is explicit about this trade-off — full system
access or sandboxed, your choice. Choose sandboxed until you've watched it work for a
while and understand its actual failure modes, not the ones you imagined.

**No blind access to production or payments.** Read access to see what's there is
different from write access to change it. Give an unattended agent the first, and gate the
second behind a step you're actually present for.

If you want the fuller version of this idea — not tool-specific, but the general shape of
briefing any agent you're going to leave running — I wrote that up separately:
[the night-shift brief](/guides/resident-agents). This page is the two specific tools;
that one is the reusable template. Read both.

For a deeper, defense-in-depth take on containing agents before they touch anything that
matters, see [Contain AI agents before they reach production](/guides/contain-ai-agents-before-production).

## What this setup is not

It's not a passive-income system, and neither tool's site claims to be one. It's not a
"drop it into your business" tool on day one — the honest version is: point it at one
small, boring, repeated job, watch what it actually does, and widen access slowly. Both
projects are under a year old. Expect rough edges.

## Sources

- [openclaw.ai](https://openclaw.ai/) — capabilities, install, channel list
- [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/) — capabilities,
  MIT license, install
- [claude.com](https://claude.com/) — plans, connectors, remote MCP

Verified live 28 August 2026. Product names are factual; no vendor partnership or
endorsement is implied by either project.

*Published 28 August 2026.*
