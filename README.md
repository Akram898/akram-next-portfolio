# ahmedakram.com

Ahmed Akram's AI engineering portfolio, architecture case studies, project lab, and Markdown guides.

Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3, and Framer Motion. Requires Node.js 20.9 or newer. The existing React 18 integration still works, but Next.js now marks it deprecated; migrate React and Motion together before moving to Next.js 17.

```powershell
npm ci
npm run dev
npm run build
npm run start -- -p 3010
npm test -- --runInBand
node scripts/audit-site.mjs
```

The build uses webpack to retain the existing build pipeline. Static portfolio pages, guides, and the OpenGraph image remain eligible for CDN caching. The browser audit uses installed Chrome through Playwright and writes screenshots and its JSON results into the ignored `.artifacts/` directory.

Guides live in `content/guides/`. Draft guides remain previewable by URL with noindex metadata and are omitted from the guide index and sitemap.

The contact section includes a visible inquiry form and direct email/telephone links. To activate delivery, create a Web3Forms access key for the recipient inbox, then set `WEB3FORMS_ACCESS_KEY` in `.env.local` and the hosting environment. Restart development or rebuild/redeploy after changing it. This is a public form identifier, not an email password or SMTP credential. Until configured, the form displays an email fallback and disables Send.

The visible form submits directly from the browser to Web3Forms, as recommended by its current documentation. The retained `/api/contact` endpoint uses `FORM_ACCESS_KEY` and requires a paid Web3Forms plan plus server IP allowlisting; it is not used by the visible form. Automated tests mock the provider and do not send email. Vercel Analytics is included only when `VERCEL=1`, since its script is served by the Vercel hosting integration.

Read [the October 20 audit](AUDIT-2026-10-20.md) for verified findings, local results, remaining dependency advisories, and deployment checks. Historical design material remains in `DESIGN_PLAN.md`; `legacy-v1/` and `legacy-v2/` are archives.

To regression-test the form without sending email, start a separate dev server with a dummy key and run the mocked browser check from another terminal:

```powershell
$env:WEB3FORMS_ACCESS_KEY = "local-browser-test-only"
npm run dev -- -p 3011
# In another terminal:
node scripts/audit-contact.mjs
```

Stop that test server when finished. The dummy key is never a delivery configuration.
