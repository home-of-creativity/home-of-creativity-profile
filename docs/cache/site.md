# Marketing site (Next.js static export)

Path: `design/`  
Installed: Next **15.5.25**, React **19.2.8**, Tailwind **4.3.3**, GSAP **3.15.0**, Framer Motion **12.x**  
`basePath` / `assetPrefix`: empty on VPS (`NEXT_PUBLIC_BASE_PATH=none`). GitHub Pages disabled.  
`output: "export"` — static export only.

SEO: `app/sitemap.ts`, `app/robots.ts`, bilingual titles/descriptions, JSON-LD (`Organization` + `LocalBusiness` + service catalog). Damascus map pin `33.5188338, 36.2916993`; Riyadh Al Murabba. Contact map uses Maps JavaScript API with mouse-wheel zoom on desktop. Google Search Console HTML + DNS verification. IndexNow key file on deploy; Laravel `seo:submit-sitemap` for Search Console API + IndexNow.

Dev: `npm run dev` → http://localhost:3000/ (with `NEXT_PUBLIC_BASE_PATH=none`)  
Live (VPS): https://hoc.agency/ — API https://api.hoc.agency/api

## Layout

```
app/                 # App Router: page, pricing, projects/detail, not-found
components/          # sections/, chrome, motion, CacheWorker
lib/                 # content.ts, i18n, *-api.ts, whatsapp, visit-cache
public/sw.js         # Cache API hoc-design-v6
e2e/                 # Playwright
next.config.ts
```

No `app/api/`, no `middleware.ts`, no `[locale]` segment.

## Routes

| URL | File | Behavior |
| --- | --- | --- |
| `/` | `app/page.tsx` | Landing: Hero → About → Services+Clients (one purple band) → Journey → Reels → Social → Projects → Finance → Contact |
| `/pricing/` | `app/pricing/page.tsx` | Packages + WhatsApp inquiry modal |
| `/projects/detail/?id=` | `app/projects/detail/page.tsx` | Project from API or demo |
| 404 | `app/not-found.tsx` | Branded, locale toggle |

Home hashes: `#top` `#about` `#vision` `#mission` `#services` `#clients` `#journey` `#reels` `#social` `#projects` `#finance` `#contact`. **No `#pricing` on home.** `#services` and `#clients` share one `--brand-purple` band (radial overlays on the wrapper in `app/page.tsx`). Images and videos below the hero attach `src` only when they approach the viewport (`ProgressiveImage` / `AutoplayVideo` + Cache API). Landing reels come only from `GET /reels` (dashboard CMS). The section stays with an empty message when none are published; published clips autoplay muted in view and load one-by-one. There are no bundled `/reels/*.mp4` files and no Drive fallback. Hero intro GSAP is skipped when `prefers-reduced-motion` or `hoc-skip-motion`; those paths `gsap.set` kicker/title/CTA to `autoAlpha: 1`. The visible `<h1>` is `.hero-title` in `Hero.tsx`. `HeroBrandWriter` pecks each letter of “Home of Creativity” with the hummingbird beak (skipped under `prefers-reduced-motion`).

## i18n

`lib/i18n.tsx` + copy in `lib/content.ts`. Default locale **Arabic** (`lang=ar` `dir=rtl`). Toggle `en`/`ar` (localStorage `hoc-locale` + cookie). A blocking boot script in `app/layout.tsx` `<head>` (`lib/locale-boot.ts`) sets `lang`/`dir` before first paint. First visit (no store) stays Arabic RTL with body visible. Stored English keeps the body hidden (`data-i18n-pending`) until React copy matches LTR. CSS defaults `html { direction: rtl }`. GSAP loads on idle; the hero brand lockup is pecked in by the hummingbird.

## Data / forms

Client `fetch` to `NEXT_PUBLIC_API_URL` (default `http://127.0.0.1:8000/api`), `cache: "no-store"`:

| Module | Endpoint | Fallback |
| --- | --- | --- |
| `lib/contact-api.ts` | `GET /contact` | Demo if demo-mode |
| `lib/portfolio-api.ts` | `GET /portfolio/clients\|projects\|{id}` | `lib/demo-data.ts` |
| `lib/pricing-api.ts` | `GET /pricing` | `lib/pricing-catalog.ts` |
| `lib/reels-api.ts` | `GET /reels` | Empty (dashboard only; no local files) |
| `lib/instagram-feed-api.ts` | `GET /social/instagram-feed` | Empty / embed |
| `lib/facebook-feed-api.ts` | `GET /social/facebook-feed` | Facebook page plugin iframe |

Demo **on** unless `NEXT_PUBLIC_USE_DEMO_DATA=false` (`lib/demo-mode.ts`).

Contact and pricing forms **do not POST**. They `window.open` WhatsApp (`lib/whatsapp.ts`, number in `lib/content.ts`). Telegram bot username via `NEXT_PUBLIC_TELEGRAM_BOT`. `NEXT_PUBLIC_DASHBOARD_URL` exists in `lib/base-path.ts` but is **not linked** in the navbar.

## Motion / SW

- GSAP via `lib/gsap-client.ts` (dynamic import). `@gsap/react` is a dependency but unused in TSX.
- Repeat visits: `lib/visit-cache.ts` key `hoc-skip-motion`.
- `components/CacheWorker.tsx` + `public/sw.js` cache `hoc-design-v6` (images, fonts, and video; cache-first). Hero + mark are precached; everything else waits until near the viewport then stays in Cache Storage.

## Env (`.env.example`)

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_USE_DEMO_DATA`, `NEXT_PUBLIC_TELEGRAM_BOT`, `NEXT_PUBLIC_DASHBOARD_URL`, `NEXT_PUBLIC_FACEBOOK_PAGE_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

`next.config.ts`: `trailingSlash`, `images.unoptimized`, remote Google Drive hosts, `allowedDevOrigins` for `*.trycloudflare.com`.

## Scripts / E2E

`dev`, `dev:clean`, `build` → `out/`, `lint`, `e2e`. Deploy: `.github/workflows/deploy-ssh.yml` (VPS rsync only).

Playwright (`playwright.config.ts`): needs the **dev server**. `e2e/landing.spec.ts` = UI. `e2e/request-submit.spec.ts` hits the Laravel API directly (not the contact form).

## Session ops (14 Sep 2026)

`package.json` `overrides.next.postcss = "8.5.23"` so Next’s nested PostCSS is patched. `npm audit` = 0. Do **not** `npm audit fix --force` (would install Next 16).

## Do not assume

- Locale URLs, SSR, staff login in navbar, contact POST to API, pricing section on home, `npm start` as production, Flutter in this repo.
