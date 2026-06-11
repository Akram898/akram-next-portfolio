# DESIGN_PLAN.md — ahmedakram.com v2

## 1. Concept statement

The site is built as an **engineering drawing set for AI systems** — every section is a
"sheet" in the set, drawn in one consistent schematic language. In five seconds a visitor
sees: a person who *architects* AI systems — agents, identity, pipelines — and documents
them with the discipline of someone who has shipped to millions of users. The hero is not
a greeting; it is a live schematic of a multi-agent control plane processing a request.
The message: **this is what I build, watch it run.**

The metaphor is earned, not decorative: Ahmed started in civil engineering, where drawing
sets are how serious systems are specified. The site tells that story structurally before
the About section ever says it in words.

---

## 2. Design tokens

### Primary mode — **DECIDED: Option A, "Drafting Room" (light primary)**
*(chosen by Ahmed, 2026-06-12; Option B "Night Ops" becomes the `prefers-color-scheme: dark` mode)*

**Option A — "Drafting Room" (light primary)**
Warm technical paper, blueprint-blue linework, ink text, one red annotation accent used
like a reviewer's pen. Rare among developer portfolios (almost all are dark), photographs
of the schematic language beautifully, and reads "architect" instantly.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F2EFE6` | Background — warm drafting paper |
| `ink` | `#1B1F1E` | Primary text |
| `trace` | `#2E4BC6` | Blueprint linework, links, schematic strokes |
| `signal` | `#C73E1D` | Annotation accent — active states, the moving request pulse. Sparing: <5% of any viewport |
| `graphite` | `#5B615E` | Secondary text, captions |
| `grid` | `#DAD5C6` | Hairlines, title-block rules, background grid |

**Option B — "Night Ops" (dark primary)**
Deep petrol console (not near-black), phosphor-amber traces — the palette of radar rooms
and DEC terminals, *not* the banned black + acid-green. Schematic pulses glow naturally.

| Token | Hex | Role |
|---|---|---|
| `console` | `#0F1B1E` | Background — deep petrol slate |
| `panel` | `#16262B` | Raised surfaces, title blocks |
| `phosphor` | `#E8A33D` | Amber traces, links, the request pulse |
| `bone` | `#E9E5DA` | Primary text |
| `dim` | `#7C8A8C` | Secondary text, hairlines |
| `alert` | `#D96C47` | Sparing emphasis (impact numbers, active node) |

Whichever loses becomes the secondary mode via `prefers-color-scheme` — the schematic
language is designed to survive inversion.

### Typography

| Face | Use | Why this and not a default pick |
|---|---|---|
| **Bricolage Grotesque** (display) | H1 thesis, sheet titles only | An opinionated grotesque with ink traps and slightly unstable proportions — it has *handwriting* in it, which keeps the drafting metaphor human instead of sterile. Nobody reaches for it on autopilot; Inter/Space Grotesk (v1's face) would be the autopilot pick. Used with restraint: two weights, never below 28px. |
| **Public Sans** (body) | All prose | The U.S. Web Design System workhorse — a *standards-document* face. Deliberately plain; the body copy should read like a well-written spec, not a brand campaign. Its civic-engineering pedigree is the justification: it is chosen for what it refuses to do. |
| **IBM Plex Mono** (utility) | Schematic labels, annotations, title-block metadata, numbers, code | Carries most of the site's personality at small sizes. IBM's drafting heritage makes it the native tongue of the schematic language. |

### Scale, radius, motion

- **Spacing:** 4px base — steps `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`. Sections breathe at 96–128; schematic internals are tight at 4–12.
- **Radius:** `2px` controls, `6px` max on cards. Drafting corners — no pills, no glass.
- **Borders:** 1px hairlines everywhere; the schematic uses 1.5px strokes. Weight hierarchy comes from type and color, not shadows. Shadows: none.
- **Motion timing:**
  - Micro (hover, focus): `160ms ease-out`
  - Reveals (scroll): `450ms cubic-bezier(0.22, 1, 0.36, 1)`, translate ≤ 16px + opacity
  - The Dispatch (signature sequence): `~2.4s` orchestrated, transform/opacity only
  - `prefers-reduced-motion`: every animation replaced by its final frame; the schematic renders fully annotated and static.

---

## 3. The signature element — **The Dispatch**

One interactive moment, placed in the hero, where all the boldness lives.

The hero's dominant area is an SVG schematic of a **multi-agent control plane** — drawn
in the site's linework: gateway → identity (OAuth/OIDC) → planner → three specialist
agents (research / synthesis / critique) → eval gate → response. This is literally the
intersection of Ahmed's two careers on one sheet: enterprise identity + API architecture
feeding an agent orchestration layer.

**The moment:** a `RUN` control in the title block (and one auto-run as the page-load
sequence). Press it and a request pulse travels the schematic: each node activates in
sequence, a mono-type annotation appears beside it explaining the routing decision
("token verified · scope: agent.dispatch", "planner: task split 3 ways", "critique
agent: revision requested — loop x1", "eval gate: pass · 0.92"), and a latency counter
ticks in the corner like an instrument. The trace is **scripted and deterministic** — no
API calls, no randomness — because the point is the *architecture*, not a parlor trick.
The critique-loop beat (one subtask gets bounced back and revised) is the detail people
will remember: the diagram admits that real systems iterate.

- **Implementation:** inline SVG + Framer Motion orchestration. Stroke-dashoffset for the
  pulse path, transform/opacity for nodes and annotations. No canvas, no WebGL, no R3F —
  an ambient 3D scene would be a second gimmick competing with the signature (Chanel rule
  applied at the plan level). Budget: < 30KB of SVG + animation code, zero images.
- **Degradation:** reduced-motion gets the fully-annotated static schematic (it reads as
  a beautiful drawing on its own). Mobile gets a simplified vertical schematic with the
  same trace. No JS → static SVG, content intact.
- **Reuse with meaning:** the same linework draws the Case File mini-diagrams, so the
  signature element teaches the visitor how to read the rest of the site.

---

## 4. Layout concept (sheet by sheet)

The recurring structural device is the **title block** — the metadata table in the corner
of every engineering drawing. Each section is footed by one: sheet name, `SHT n OF 6`,
revision tag, and one line of metadata that is *true* (e.g., the Contact sheet's block
holds location and timezone). Sheet numbers are genuinely sequential content here — the
site is a drawing set — which is what makes this device legal under the no-numbered-markers
rule: the numbers encode the metaphor, they don't decorate a generic section list.

```
SHEET 1 — CONTROL PLANE (hero)
┌──────────────────────────────────────────────────────────┐
│ AHMED AKRAM · AI SOLUTIONS ENGINEER & ARCHITECT   [mono]  │
│                                                           │
│ Designs and ships applied AI systems,        [Bricolage]  │
│ multi-agent platforms, and MLOps pipelines —              │
│ on enterprise foundations serving millions.               │
│                                                           │
│   ┌────────────[ THE DISPATCH — live schematic ]───────┐  │
│   │  gateway ─ auth ─ planner ─┬─ agent A ─┐           │  │
│   │            │               ├─ agent B ─┼─ eval ─ ▶ │  │
│   │  annotations appear here   └─ agent C ─┘  gate     │  │
│   └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐               │
│ │ SHT 1/6 · REV 2.0 · DXB · [ RUN ▷ ]     │  title block  │
│ └─────────────────────────────────────────┘               │
└──────────────────────────────────────────────────────────┘

SHEET 2 — CASE FILES (selected work)
Four entries, each one drawing sheet: problem → architecture decision → impact,
with an SVG mini-schematic in the hero's linework. Stacked full-width, not cards.
  2.1  Identity modernization — OAuth/OIDC + Okta replatform on an identity
       platform serving millions of users. Mini-schematic: token flow.
  2.2  High-traffic API platform — NestJS microservices, GraphQL/REST, Couchbase.
       Mini-schematic: request fan-out and cache tiers.
  2.3  Multi-agent automation systems (AI) — MCP topology, planner/specialist
       routing, n8n orchestration for trading & content pipelines.
  2.4  Model lifecycle pipeline (MLOps) — drift detection → automated retrain →
       versioned registry. Mini-schematic: the retraining loop.

SHEET 3 — THE LAB (AI lab / projects)
2×2 grid linking the four side projects (agent-orchestra, drift-watch,
prompt-sentinel, api-blueprint). Each: name (mono), one-line claim, stack line,
[ LIVE ] and [ SOURCE ] links. Demo links are Vercel placeholders until deploy.

SHEET 4 — CAPABILITIES
Three pillars, fixed order, prose with embedded proof — no badges, no bars:
  Applied AI & Agents  /  MLOps & DevOps  /  Engineering & Architecture
Each pillar: 3–4 sentences naming real systems and tools in context
(MCP, Claude/GPT/Gemini/OpenRouter, RAG, evals · drift monitoring, GitHub Actions,
Docker, Vercel/AWS · Okta, OAuth/OIDC, NestJS, GraphQL, Couchbase).

SHEET 5 — REVISION HISTORY (about)
The story told as a drawing's revision table — civil engineering → military
service → self-taught transition → senior engineer on large-scale enterprise
platforms → AI & MLOps systems. One portrait (to be provided/generated).
Credentials line: AWS SAA · B.Sc. CS (in progress) · npm: json-friendly-cleaner.
The revision-table format keeps the story restrained — facts with dates,
no drama.

SHEET 6 — ISSUE FOR CONSTRUCTION (contact)
One CTA ("Start a conversation"), email, GitHub, LinkedIn, Dubai.
Title block carries location + timezone. Nothing else.
```

**Navigation:** a thin fixed "sheet index" — mono type, top edge. No hamburger on desktop.

**Employer anonymity:** all enterprise work described by scale ("identity platform
serving millions of users", "global enterprise"), never by name, in copy *and* in
schematic labels, alt text, metadata, and commit messages.

---

## 5. Anti-slop self-test (run before building, as required)

> "If I gave a generic 'make me a developer portfolio' prompt, would I get something similar?"

| Generic output would have… | This plan instead | 
|---|---|
| Dark hero, gradient blob/particles, typing animation ("I'm a Web Developer\|") | A drawing set with a deterministic schematic trace. v1's `ityped` hero is exactly the generic case — deleted, not restyled. |
| Skill-badge wall with tech logos | Capabilities as prose-with-proof; tools named in sentences. v1's logo PNGs stay in the archive. |
| Project cards with screenshots | Case files with problem → decision → impact and SVG schematics (work is proprietary; screenshots impossible anyway). |
| Inter / Space Grotesk + JetBrains Mono | Bricolage Grotesque + Public Sans + IBM Plex Mono, each with a stated reason. |
| "01 / 02 / 03" section numbers as decoration | Sheet numbers that *are* the content's structure (a drawing set is sequential by nature). |
| Glassmorphism cards, glow shadows | 1px hairlines, zero shadows, 2px radii. |
| Three.js blob because portfolios have one | No WebGL at all — the SVG schematic *is* the moment. |

**Chanel rule ledger** (one accessory already removed per section, at plan stage):
hero — dropped a planned ambient grid-drift background; case files — dropped per-entry
tag chips; lab — dropped per-project thumbnails (mono wordmarks instead); capabilities —
dropped icons entirely; about — dropped the timeline graphic (revision table is the
timeline); contact — dropped the contact form (one mailto CTA; no backend to maintain).

---

## 6. Build notes (for Phase 2)

- Next.js 14+ App Router · TypeScript · Tailwind (tokens above as CSS variables) ·
  Framer Motion. No R3F. Static export-compatible; zero-config Vercel.
- Fonts via `next/font` (self-hosted, no layout shift). Bricolage and Public Sans are
  variable — two font files total plus Plex Mono.
- The Dispatch ships as a typed, data-driven script (`dispatch-script.ts`: array of
  `{node, annotation, delay}`) — testable with Jest, and the same data renders the
  static reduced-motion frame. 
- Lighthouse targets per the mission: ≥95 / 100 / 100 — the all-SVG, no-image-hero
  approach is chosen partly to make this achievable, not hopeful.
