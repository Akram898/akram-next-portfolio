---
title: "Shopify's own Claude toolkit — the line to copy, the steps, and the thing it doesn't tell you"
keyword: STORE
summary: "Shopify ships a free, official toolkit that connects Claude straight to your store — ask it questions, edit a hundred listings at once, fix the storefront defects that quietly cost you sales. Here's the install line, the safe order to use it in, and one thing the README says that the reel didn't have room for."
publishedAt: "2026-08-23"
updatedAt: "2026-08-23"
readingMinutes: 5
tags: ["shopify", "claude", "ecommerce", "small-business", "ai-tools"]
tone: "blue"
video:
  platform: instagram
  url: ""
status: live
---

You commented **STORE**, so here's the rest of it: the actual line to copy, the three-step order that keeps it away from your live catalogue, and one thing in Shopify's own README that the reel didn't have room to say.

No jargon here either. If a word needs explaining, that's still the wrong word.

## What it actually is

Shopify ships a free plugin — the **Shopify AI Toolkit** — that connects Claude directly to your store. It's built by Shopify, it's open-source under the MIT licence, and it lives on [Shopify's own GitHub](https://github.com/Shopify/Shopify-AI-Toolkit). Nobody has to trust a stranger's side project for this one.

Once it's installed, Claude can do three things it couldn't do before:

1. **Ask your shop questions in plain English** and get answers off your real store — no export, no spreadsheet.
2. **Change a hundred listings in one sentence** — descriptions, prices, tags, a whole collection — instead of clicking through them one at a time.
3. **Fix the storefront itself** — the missing size chart, the shipping line nobody can parse, the buy button that hides on a phone. The small stuff that quietly loses orders.

## The line to copy

One command, run once, in a terminal:

```
claude plugin install shopify-ai-toolkit@claude-plugins-official
```

That's the plugin route, which Shopify's own docs call the recommended way in — it bundles everything and updates itself. (If you'd rather add capabilities one at a time instead of all at once, Shopify's docs also cover installing individual skills; the plugin is the simpler start.)

You'll need [Claude Code](https://claude.com/product/claude-code) and Node.js 18 or newer already on your machine. If "terminal" is a new word to you: it's the plain black-and-white text window your computer already has, and after this one line, you never open it again for this.

## The three-step order

This is the part that actually matters — not whether you can install it, but what order you use it in.

1. **Install it. Once.** The line above.
2. **Point it at a test store first, not your live one.** Every Shopify account can spin up a free development store in a couple of minutes from the Shopify admin — that's what you connect Claude to while you're still learning what it does.
3. **Ask it to look before you ask it to change anything.** "What products haven't sold since June?" is a look. "Rewrite my product descriptions" is a change. Do a few of the first kind before you ever ask for the second.

That order is the whole safety plan. Nothing about the toolkit enforces it — it's a habit, not a setting, which is exactly why it's worth stating plainly instead of assuming you'd land on it yourself.

## What each benefit looks like in practice

**Ask your shop.** Try something like *"Which products haven't sold since June?"* or *"What's my best-selling item this month?"* — plain questions, answered off your actual store data. No report to build first.

**Change a hundred things at once.** *"Rewrite every product description to lead with the material, not the price"* or *"Add a 'ships in 2 days' badge to every item in the Winter collection"* — one sentence, applied across however many listings match.

**Fix the page.** *"Check my top 10 products for missing size charts"* or *"Find any product page where the buy button isn't visible on mobile"* — the invisible defects that don't show up unless you're specifically looking for them, and that quietly cost a sale every time a visitor hits one.

## The honest part

**It validates your syntax. It does not validate your judgement.** If you ask it to delete a collection, it will delete the collection — correctly, exactly as asked, with no way for it to know that wasn't what you meant. That's not a flaw in the toolkit; it's true of any tool that does exactly what you tell it. It's also the entire reason step 2 above exists: a mistake on a development store costs you nothing. The same mistake on your live store costs you real orders.

## The thing the reel didn't have room for

Here's the part that only fits in the guide, not the 50 seconds: **Shopify's own README says the toolkit sends usage data by default, and there's no toggle in the app for it — only an environment variable.**

Specifically, per [the toolkit's README](https://github.com/Shopify/Shopify-AI-Toolkit): its skill scripts and a background hook send a usage event on each invocation to `shopify.dev/mcp/usage`, and the payload can include your tool name, the search or validation you ran, and — for skills that use validation, or when a skill activates inside Claude Code — **your most recent prompt, verbatim, truncated to 2000 characters.** This is **on by default**. Shopify's stated reason is product telemetry, not anything more sinister, and the README is upfront about exactly what's captured — but "upfront in a README" and "something a store owner would think to check" are two different things, and this reel is aimed at the second group.

If you'd rather it didn't send that, the toolkit's own opt-out is one line, set before you install or run anything:

```
OPT_OUT_INSTRUMENTATION=true
```

I didn't put this in the video because the video is about what the toolkit does for your store, and this is about what it does with your data — a different claim, and one that deserves its own sentence rather than a rushed half-sentence at the end of a fast reel. Read the [Telemetry section of the README](https://github.com/Shopify/Shopify-AI-Toolkit) yourself before you decide whether the default setting is fine for how you plan to use it.

## Sources

Verified against the primary sources directly, 21–22 August 2026:

- [Shopify AI Toolkit — official docs](https://shopify.dev/docs/apps/build/ai-toolkit) (primary source for capabilities and the install command)
- [Shopify/Shopify-AI-Toolkit on GitHub](https://github.com/Shopify/Shopify-AI-Toolkit) (primary source for the licence, and for the telemetry section above)

Not spoken anywhere, here or in the reel, because neither primary source states it: a public release date, star counts (they move daily), or any time-saved figure — those numbers circulate online but trace to third-party blogs, not Shopify.

## Related guides on this site

- [Claude Skills — install once, use first](/guides/claude-skills)
- [Claude's new watermark — what it marks, what it doesn't](/guides/claude-watermark)

---

Comment **STORE** anytime you want this page sent again.
