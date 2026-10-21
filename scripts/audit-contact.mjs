// Run against dev started with a dummy WEB3FORMS_ACCESS_KEY.
// Every provider request is intercepted; this check never sends email.
import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  let calls = 0;
  let success = true;
  await page.route("https://api.web3forms.com/**", async (route) => {
    calls++;
    await route.fulfill({
      status: success ? 200 : 500,
      contentType: "application/json",
      body: JSON.stringify({ success }),
    });
  });
  await page.goto(
    `${process.env.BASE_URL ?? "http://localhost:3011"}/#contact`,
    { waitUntil: "networkidle" },
  );
  const send = page.getByRole("button", { name: "Send message", exact: true });
  assert.equal(
    await send.isDisabled(),
    false,
    "Start the test dev server with a dummy public form key first.",
  );
  async function fill(message) {
    await page.locator("#contact-name").fill("Local Test");
    await page.locator("#contact-email").fill("local@example.com");
    await page.locator("#contact-message").fill(message);
  }
  await fill("This is a mocked delivery test.");
  await send.click();
  await page
    .getByRole("status")
    .filter({ hasText: "Your message has been sent." })
    .waitFor();
  assert.equal(await page.locator("#contact-message").inputValue(), "");
  success = false;
  await fill("Keep this message after a failed send.");
  await send.click();
  await page
    .getByRole("alert")
    .filter({ hasText: "Unable to send your message." })
    .waitFor();
  assert.equal(
    await page.locator("#contact-message").inputValue(),
    "Keep this message after a failed send.",
  );
  assert.equal(calls, 2);
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  console.log(
    "PASS: mocked success/reset, failure/retained input, two intercepted sends, and mobile layout. No email sent.",
  );
} finally {
  await browser.close();
}
