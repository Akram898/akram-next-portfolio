---
title: "Four Claude Skills to use first — plan, write, debug, ship"
keyword: SKILLS
summary: "Stop opening Claude from zero every morning. Install these four free skill types once — brainstorm, humanizer, debug, verify — then run them at the start of real work. Links, install commands, and when to use each."
publishedAt: "2026-08-03"
updatedAt: "2026-08-03"
readingMinutes: 6
tags: ["claude-code", "claude-skills", "ai-agents", "developer-tools", "workflows"]
tone: "blue"
video:
  platform: instagram
  url: ""
status: live
---

You commented **SKILLS**, so here is the full pack: what each skill is for, a real install path, and when to run it in a normal workday.

The reel’s point is simple. **Blank Claude every morning is the expensive habit.** Skills are install-once folders of instructions (`SKILL.md`) that make the agent show up already briefed — for planning, writing, debugging, and shipping.

## What a “skill” actually is

A skill is not a new model and not a chat plugin with a subscription wall. It is a reusable package — usually a `SKILL.md` plus optional scripts — that Claude Code (and other agents) can load when you invoke it.

Official overview from Anthropic:

- [Agent Skills on the Claude platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Claude Code overview](https://code.claude.com/docs/en/overview)

Two install locations you will see everywhere:

- **Personal (all projects):** `~/.claude/skills/<name>/`
- **Project (shared with the repo):** `.claude/skills/<name>/`

If your setup uses the plugin marketplace instead of raw folders, that is fine — same idea, different install path.

## The four — day-to-day map

| # | Skill type | When you run it | What it stops |
|---|---|---|---|
| 4 | **Brainstorm** (ask-first) | Start of day / new task | Building junk before you know the goal |
| 3 | **Humanizer** | Emails, posts, client notes | Robot voice and fake TED-talk tone |
| 2 | **Debug** (systematic) | When something breaks | The random-fix spiral |
| 1 | **Verify before ship** | Before send / merge / post | The “looks done” lie |

**Habit that actually pays:** close every task with the verify skill. That is the #1 from the reel for a reason.

---

## 4 — Brainstorm (interviews you first)

Use this when the task is fuzzy and you would otherwise paste a wall of hopes into a blank chat.

**Good real pack:** Superpowers includes a full methodology stack (brainstorm → spec → build → ship), not just one file.

- Repo: [github.com/obra/superpowers](https://github.com/obra/superpowers)
- Marketplace install (Claude Code):

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

After install, use the brainstorm / planning skills that come with the pack before you ask it to “just build the app.”

**What “good” looks like:** it asks you questions first. If it immediately dumps a 40-file architecture, that is not this skill working — that is cold Claude again.

---

## 3 — Humanizer (robot out of the text)

Use this on anything a human will read: email, LinkedIn, landing copy, README intros.

**Solid open skill:**

- [github.com/blader/humanizer](https://github.com/blader/humanizer) — portable `SKILL.md`, widely used with Claude Code

Claude Code plugin path:

```text
/plugin marketplace add blader/humanizer
/plugin install humanizer@humanizer
```

Manual (any agent that reads skill folders):

```text
git clone https://github.com/blader/humanizer.git ~/.claude/skills/humanizer
```

(Or copy only `SKILL.md` into `~/.claude/skills/humanizer/` if you prefer a thin install.)

**What “good” looks like:** fewer “delve / landscape / robust” piles, fewer fake-inspirational closers. If it still sounds like a keynote, run it again with a short sample of *your* writing.

---

## 2 — Debug (stops the random-fix spiral)

Use this when something is broken and you are one more “try this” away from making it worse.

**Good real pack:** Superpowers (and similar agent methodology packs) include systematic debug / investigation skills — the point is process, not vibes.

- [github.com/obra/superpowers](https://github.com/obra/superpowers)

Pattern you want, whatever the skill name in your install:

1. Reproduce  
2. Locate  
3. Hypothesize  
4. Fix one thing  
5. Prove it  

**What “good” looks like:** it refuses to shotgun five unrelated changes. If your agent rewrites half the repo on the first broken test, you do not have a debug skill loaded — you have panic mode.

---

## 1 — Verify before you ship (use this first on the finish line)

Use this **before** you hit send, merge, or post.

This is the reel’s #1 on purpose. The expensive mistake is not “I need better models.” It is “I thought it was done.”

Same Superpowers / methodology world:

- [github.com/obra/superpowers](https://github.com/obra/superpowers) — look for verification / completion / review skills after install  
- Anthropic’s open skills repo (API + patterns): [github.com/anthropics/skills](https://github.com/anthropics/skills)

**What “good” looks like:** a checklist against the claim (“does the guide link work,” “did tests run,” “did we invent a number”). If the agent says “looks good” with no checks, that is the lie the reel is roasting.

---

## Install once — then use first

Suggested daily loop:

1. **Morning / new work** → brainstorm skill (questions before code or copy)  
2. **Anything written for humans** → humanizer  
3. **When it breaks** → debug skill  
4. **Before you ship** → verify skill  

That is the whole product of the video: not “380 free tools,” four jobs with names.

### Bigger libraries (if you want more later)

These are optional. Do not install hundreds on day one.

- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — large open skill / plugin library  
- [Anthropic agent skills docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

Curate. A skill you never invoke is just disk noise.

---

## Related guides on this site

- [Token savers — four tools that cut AI cost (FORGE)](/guides/token-savers)  
- [Claude web design setup (SITE)](/guides/claude-web-design-setup)  
- [Opus 5 vs Fable 5 — model picker is not your cost dial](/guides/opus5-vs-fable5)

---

## Short version

| Need | Skill type | Start here |
|---|---|---|
| Clear plan | Brainstorm | [Superpowers](https://github.com/obra/superpowers) |
| Natural writing | Humanizer | [blader/humanizer](https://github.com/blader/humanizer) |
| Broken code / agent mess | Debug | [Superpowers](https://github.com/obra/superpowers) |
| Done-for-real | Verify | [Superpowers](https://github.com/obra/superpowers) + [anthropics/skills](https://github.com/anthropics/skills) |

Install once. Run them **before** the blank chat. Comment **SKILLS** anytime you want this page again.
