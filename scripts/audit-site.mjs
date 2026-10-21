import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://localhost:3010";
mkdirSync(".artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
const errors = [];
try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (/violates.*Content Security Policy|Refused to (execute|load|apply)/i.test(message.text())) errors.push(message.text());
    });
    for (const route of ["/", "/architecture", "/lab", "/guides", "/guides/opus-5-5"]) {
      const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      assert.match(response.headers()["content-security-policy"], /frame-ancestors 'none'/);
      assert.equal(response.headers()["x-frame-options"], "DENY");
      const data = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent)),
        headings: document.querySelectorAll("h1").length,
        main: Boolean(document.querySelector("#main-content")),
      }));
      assert.ok(data.scrollWidth <= width + 1, `${route} overflows at ${width}px: ${data.scrollWidth}`);
      assert.equal(data.canonical, `https://ahmedakram.com${route === "/" ? "" : route}`, route);
      assert.equal(data.headings, 1, route);
      assert.ok(data.main);
      assert.ok(data.schemas.length > 0);
      results.push({ route, ...data });
      if ([390, 1440].includes(width) && ["/", "/guides"].includes(route)) {
        await page.screenshot({ path: `.artifacts/after-${width}-${route === "/" ? "home" : "guides"}.png` });
      }
    }
    if (width === 390) {
      await page.goto(base, { waitUntil: "networkidle" });
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      const dialog = page.getByRole("dialog");
      assert.ok(await dialog.isVisible());
      await page.screenshot({ path: ".artifacts/after-mobile-menu.png" });
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        // Native modal navigation may visit browser chrome (activeElement=body),
        // but must never focus an interactive element in the background page.
        assert.ok(await page.evaluate(() => document.activeElement === document.body || document.querySelector("dialog").contains(document.activeElement)), "Focus escaped to background content");
      }
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => document.querySelector('.nav-toggle').getAttribute('aria-expanded') === 'false');
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      assert.ok(await toggle.evaluate((node) => node === document.activeElement));
      await toggle.click();
      await dialog.getByRole("link", { name: "Contact", exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('dialog').open);
      assert.equal(await dialog.isVisible(), false, "Same-page anchor did not close menu");
      await toggle.click();
      await page.setViewportSize({ width: 1000, height: 900 });
      await page.waitForFunction(() => !document.querySelector('dialog').open);
      assert.equal(await dialog.isVisible(), false, "Menu stayed open at desktop breakpoint");
      await page.goto(`${base}/missing-page`);
      assert.ok(await page.getByRole("heading", { name: "This route ends here." }).isVisible());
    }
    await page.close();
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJS.goto(base);
  assert.ok(await noJS.getByRole("heading", { name: "Ahmed Akram", exact: true }).isVisible());
  assert.ok(await noJS.getByRole("navigation", { name: "Main navigation" }).isVisible());
  assert.equal(await noJS.locator("[data-reveal]").first().evaluate((node) => getComputedStyle(node).opacity), "1");
  await noJS.screenshot({ path: ".artifacts/after-no-js.png" });
  await noJS.close();
  assert.deepEqual(errors, [], "Browser errors");
  writeFileSync(".artifacts/browser-audit.json", JSON.stringify({ base, results, errors, checks: ["modal focus, Escape and restore", "same-page menu dismissal", "desktop resize dismissal", "404", "no-JS content and navigation"] }, null, 2));
  console.log(`Passed: ${results.length} route/viewport checks, navigation, no-JS, metadata, headers, and no browser errors.`);
} finally {
  await browser.close();
}
