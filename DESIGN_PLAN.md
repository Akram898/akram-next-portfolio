# V3 Design Plan - The Living Systems Atlas

## Concept

In five seconds, the site should say: Ahmed Akram architects serious AI systems
and knows how to operate them at enterprise scale. The experience is a living
systems atlas rather than a conventional portfolio: typography makes the claim,
an interactive orchestration field proves the mental model, and concise case
files reveal the engineering decisions beneath the surface.

## Reference Synthesis

- Tresmares Capital: measured editorial pacing, restrained navigation, large
  statements, and information that earns its space.
- Hashgraph Ventures: conviction-led copy, high-contrast typography, and
  sections that feel like declarations.
- ApeChain: kinetic energy, bold framing, and interfaces that feel active.
- SOHub: cinematic composition and strong transitions between quiet and dense
  moments.
- Mobbin: product-grade clarity, predictable interaction states, and compact
  information architecture.

The result borrows principles, not layouts or brand devices.

## Design Tokens

### Color

- `Void` `#090B0B`: primary canvas.
- `Carbon` `#111514`: raised system surfaces.
- `Chalk` `#F0EEE7`: primary text.
- `Fog` `#9B9F99`: supporting text.
- `Pulse` `#FF5A36`: decisive actions and active system paths.
- `Signal` `#8AA4FF`: data, states, and secondary emphasis.

No decorative gradients. Color indicates status, hierarchy, or interaction.

### Type

- `Archivo Black`: display face. Its compressed, engineered weight makes large
  claims feel structural rather than luxurious.
- `Manrope`: body and interface face. Open counters and excellent small-size
  legibility keep dense technical material humane.
- `IBM Plex Mono`: runtime labels, metadata, and architecture annotations.

This pairing avoids the familiar portfolio formula of soft serif plus neutral
sans. The contrast is poster-like, direct, and technical.

### Scale

- Spacing: `4, 8, 12, 16, 24, 32, 48, 72, 96, 144`.
- Radius: `2px` controls, `14px` panels, `999px` status indicators only.
- Motion: `160ms` utility, `420ms` component, `900ms` composed entrance.
- Container: `1440px` maximum with a 12-column desktop grid.

## Layout

1. Fixed utility header: identity, local time/status, compact section links.
2. Hero: a massive left-aligned thesis and an interactive architecture field.
3. Proof strip: four terse facts that establish scale and present focus.
4. Selected systems: large horizontal case studies with architecture diagrams
   and problem/decision/impact content.
5. AI lab: four runnable project records styled as active deployments.
6. Capabilities: three asymmetric columns, ordered AI, MLOps, architecture.
7. About: portrait beside a restrained career narrative and credentials.
8. Contact: oversized invitation and direct channels.

On mobile, content order remains identical. The architecture field becomes a
tap-driven horizontal state selector and all dense rows stack.

## Signature Element

The **Architecture Field** is an interactive orchestration map in the hero.
Three selectable operating modes - Agent Runtime, Model Lifecycle, and Identity
Plane - redraw the active path across a stable set of nodes. Pointer movement
adds restrained parallax on desktop. The interaction encodes Ahmed's core
strength: seeing individual services as one operating system.

It uses DOM and SVG rather than WebGL, keeping the first load light and the
diagram accessible. With reduced motion, it becomes an immediate static state.

## Motion

- Page load: header, thesis, field, then proof strip.
- Scroll: sections reveal by opacity and a small vertical translation.
- Hover: links expose directional marks; case rows shift their diagram border.
- Architecture Field: path and node state changes only.
- All motion respects `prefers-reduced-motion`.

## Anti-Template Test

The first draft risked becoming another dark portfolio with glowing cards. That
was removed. The revision uses hard edges, no blur, no glass panels, no badge
clouds, and no decorative gradient. The architecture field carries the visual
boldness; the rest behaves like a precise editorial system.

Before shipping each section, one accessory is removed. Borders, labels, and
motion survive only when they clarify structure or status.
