---
title: "Build a Cinematic Website With Just Two Prompts"
keyword: PROMPTS
summary: "A copy-paste two-prompt method for building a premium, scroll-driven cinematic website for any brand, product, service, or idea — one prompt generates a consistent visual asset pack in Grok, Google Flow, or Veo, the second hands those assets to Codex or Claude Code to build, test, and deploy the site."
publishedAt: "2026-08-05"
updatedAt: "2026-08-05"
readingMinutes: 7
tags: ["grok", "veo", "codex", "claude-code", "gsap"]
tone: "violet"
video:
  platform:
  url: ""
status: live
---

# Build a Cinematic Website With Just Two Prompts

Create a premium, scroll-driven website for any **brand, product, service, portfolio, campaign, or idea** using only:

1. One prompt for **Grok, Google Flow, Veo, or another visual-generation tool**
2. One prompt for **Codex, Claude Code, or another coding agent**

---

## Before You Start

Create a new project folder:

```text
my-cinematic-website/
├── public/
│   └── assets/
└── references/
```

You will first generate the images and videos, then place them inside:

```text
public/assets/
```

Recommended assets:

- 1 visual reference image
- 4 to 6 cinematic videos
- 4 to 6 poster images or keyframes
- Optional transparent overlays such as smoke, particles, light, rain, or grain

For the best result, generate every video in the same visual style.

---

# Prompt 1 — Generate the Visual Assets

Use this prompt in Grok, Google Flow, Veo, or your preferred visual-generation tool.

Replace the values inside `[brackets]`.

```text
Create a complete cinematic visual asset pack for a premium website.

PROJECT

Brand, product, or idea:
[Describe your brand, product, service, campaign, portfolio, or idea]

Main message:
[Write the one message visitors should remember]

Visual mood:
[Examples: futuristic, elegant, mysterious, natural, energetic, luxurious, minimal, cinematic]

Preferred colors:
[List your preferred colors]

Audience:
[Describe the target audience]

CREATE ONE CONSISTENT VISUAL WORLD

All images and videos must feel like parts of the same campaign.

Keep the following consistent across every asset:

- art direction
- lighting
- color palette
- environment
- materials
- subject appearance
- visual quality
- camera style
- atmosphere

Do not generate important text inside images or videos.

Do not use existing logos, characters, celebrities, movie scenes, copyrighted designs, or recognizable branded assets.

Create original visuals only.

GENERATE THESE ASSETS

1. Master visual reference

Create one high-quality reference image that defines:

- the main subject or product
- environment
- materials
- lighting
- color palette
- visual style
- scale
- atmosphere

2. Hero image

Create a wide cinematic hero composition with clear negative space for website text.

3. Four to six cinematic scenes

Each scene should represent one part of the story:

Scene 1:
Introduce the world, product, or idea.

Scene 2:
Reveal the main problem, tension, or opportunity.

Scene 3:
Show transformation, movement, or discovery.

Scene 4:
Show how the product, system, or idea works.

Scene 5:
Show the result, impact, or emotional payoff.

Scene 6:
Create a strong final composition for the call to action.

4. Video versions

Animate each scene into a 6 to 8 second cinematic video.

Video requirements:

- 16:9
- 1080p or higher
- slow and controlled camera movement
- realistic physics
- stable geometry
- consistent subjects
- no text
- no logos
- no subtitles
- no watermark
- no sudden cuts
- no random morphing
- no excessive camera shake

Where supported, use the generated scene image as the first frame or reference image.

Generate two versions of each video and keep the strongest one.

5. Optional overlays

Create transparent or dark-background overlays where useful:

- atmospheric smoke
- particles
- light rays
- dust
- rain
- fog
- grain
- abstract lines

FINAL OUTPUT

Save the selected files using simple names:

hero.jpg
scene-01.mp4
scene-02.mp4
scene-03.mp4
scene-04.mp4
scene-05.mp4
scene-06.mp4
scene-01-poster.jpg
scene-02-poster.jpg
scene-03-poster.jpg
scene-04-poster.jpg
scene-05-poster.jpg
scene-06-poster.jpg

The final asset pack must feel premium, original, consistent, and suitable for an award-level cinematic website.
```

---

# Prompt 2 — Build the Website

Place all generated assets inside:

```text
public/assets/
```

Then open the full project folder in Codex, Claude Code, or another coding agent and use this prompt.

Replace the values inside `[brackets]`.

```text
Build a complete premium cinematic website using the visual assets inside:

public/assets/

PROJECT

Brand, product, or idea:
[Describe the brand, product, service, portfolio, campaign, or idea]

Main message:
[Write the main message]

Primary action:
[Examples: Start a project, Join the waitlist, Explore the product, Contact us]

DESIGN GOAL

Create an immersive, scroll-driven website that feels like:

- a premium brand film
- an interactive product launch
- a digital art experience
- a modern editorial website

Do not create a generic SaaS landing page.

Avoid:

- normal feature-card grids
- excessive glassmorphism
- generic purple gradients
- template-style sections
- random animations
- unnecessary dashboards
- excessive text
- stock imagery

TECHNOLOGY

Use:

- latest stable Next.js
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis where useful
- Motion only for small UI interactions
- Playwright for visual testing
- FFmpeg where video optimization is needed

Use Three.js only when a real 3D effect is necessary.

WEBSITE STRUCTURE

Build one complete scrolling homepage.

1. Opening

Create a short cinematic opening using the hero image or first video.

Show:

[Brand name]

[Short tagline]

Transition naturally into the hero.

2. Hero

Use large editorial typography.

Include:

- main message
- short supporting description
- primary action
- optional secondary action

Use layered visuals, scale, masks, atmosphere, and depth.

3. Story section

Explain the idea, problem, or opportunity using a pinned cinematic scene.

Reveal text line by line while the visual remains active.

4. Product or capability section

Present the main capabilities as large visual chapters, not small cards.

Use one visual scene for each chapter.

5. How it works

Use scroll-triggered labels, lines, nodes, or steps over one cinematic visual.

Keep the explanation simple and visually clear.

6. Proof, work, or examples

Show three strong examples, use cases, projects, or benefits.

Use large editorial layouts.

Do not use a standard three-column card grid.

7. Final statement

Use the strongest final video or image.

Create a calm, memorable ending.

Show:

[Final headline]

[Short supporting message]

[Primary action]

8. Footer

Include:

- brand name
- navigation
- contact or social links
- a short closing statement

SCROLL AND MOTION

Use:

- pinned cinematic sections
- layered parallax
- masked text reveals
- scroll-linked scale
- image clipping
- slow camera-like zoom
- video crossfades
- foreground and background movement
- subtle particles or atmosphere
- smooth transitions between scenes

Every section must remain scrollable.

Do not trap the user inside a section.

Every pinned scene must unpin automatically.

Do not permanently hide body overflow.

VIDEO HANDLING

Inspect and optimize every file inside public/assets/.

Create:

- optimized MP4
- WebM where useful
- poster images
- low-resolution placeholders

Load only the first critical asset initially.

Preload the next scene shortly before it becomes visible.

Pause videos outside the viewport.

Do not load every video at startup.

Use normal video playback for ambient scenes.

Use canvas image sequences or controlled scroll-linked playback only where it improves smoothness.

RESPONSIVE DESIGN

Create polished desktop, tablet, and mobile layouts.

Mobile must be deliberately designed, not only scaled down.

On smaller screens:

- shorten pinned scenes
- simplify heavy effects
- use poster images where needed
- maintain readable typography
- prevent horizontal overflow
- preserve normal scrolling

ACCESSIBILITY

Include:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- meaningful alt text
- accessible buttons and links
- reduced-motion support

When reduced motion is enabled:

- disable smooth scrolling
- remove parallax
- replace video scrubbing with posters or crossfades
- show all content in readable final states

QUALITY CONTROL

Run the website locally.

Use Playwright to capture screenshots at:

- 1920 × 1080
- 1440 × 900
- 1024 × 768
- 390 × 844

Review the full website visually.

Complete at least three improvement passes focused on:

- spacing
- typography
- composition
- visual consistency
- animation timing
- scene transitions
- mobile layout
- performance
- readability

Before finishing:

- run the linter
- run type checking
- run the production build
- fix all errors
- remove console warnings
- test every interaction
- confirm all pinned sections release correctly
- confirm no horizontal overflow
- confirm videos pause off screen
- confirm reduced-motion mode works

Create:

README.md
docs/visual-direction.md
docs/asset-map.md
docs/animation-system.md
docs/visual-qa.md

Do not stop after scaffolding.

Continue until the website is complete, polished, tested, and ready to deploy to Vercel.
```

---

# Simple Workflow

1. Choose your brand, product, or idea.
2. Run Prompt 1 in Grok, Google Flow, Veo, or another visual generator.
3. Select the best images and videos.
4. Copy them into `public/assets/`.
5. Run Prompt 2 in Codex or Claude Code.
6. Let the coding agent build, test, and refine the website.
7. Deploy it to Vercel.

---

## Best Results

Keep the website focused on one message and one visual world.

Four excellent videos are better than twelve unrelated videos.

The visuals create the first impression. Typography, scrolling, transitions, and performance make the experience feel professional.
