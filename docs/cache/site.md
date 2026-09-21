# Marketing site (Next.js static export)

Last updated: 21 September 2026 (visible kicker/FAQ use بيت الإبداع / Home of Creativity, not الاستوديو)

Path: `design/`  
Installed: Next **15.5.25**, React **19.2.8**, Tailwind **4.3.3**, GSAP **3.15.0**, Framer Motion **12.x**  
`basePath` / `assetPrefix`: empty on VPS (`NEXT_PUBLIC_BASE_PATH=none`). GitHub Pages disabled.  
`output: "export"` — static export only.

SEO/GEO: `app/sitemap.ts`, `app/robots.ts` (allow `*` plus GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, **Cursor**, Claude-Code, Operator, ChatGPT Agent, Google-Agent, Devin, Manus-User, Amazonbot, Mistral, DeepSeek, Kimi, Qwen, and other AI-agency crawlers), bilingual titles/descriptions (home title: بيت الإبداع | Home | HOC — وكالة هوية دمشق; aliases hoc / بيت / الإبداع in description, JSON-LD `alternateName`, and about copy). JSON-LD is split: `lib/seo.ts` `siteJsonLd()` (`Organization` + `WebSite`, rendered by `<SeoJsonLd/>` in the **root layout on every page**) vs `homeJsonLd()` (`LocalBusiness` + `FAQPage`, rendered by `<SeoHomeJsonLd/>` **only in `app/page.tsx`**) — FAQPage only ships where the visible `#faq` section exists. `LocalBusiness` has no `inLanguage`/`knowsAbout`; its `location[]` only includes the Damascus `Place` (Riyadh stays `areaServed`, not a second mapped office); its service list is `hasOfferCatalog` → `OfferCatalog` → `ListItem`→`Service` (no bare `Offer` nodes without a price). `/social/` and `/locations/` keep their own page-scoped `CollectionPage` JSON-LD (2 script tags total: site-wide + page). Inner pages (pricing/articles/privacy/terms) render 1 script tag (site-wide only). `<SeoCrawlerCopy/>` (noscript fallback copy) is home-only too (was global; used to duplicate home content + an extra `<h1>` onto every page). No `AggregateRating`. Public `/llms.txt` and `/llms-full.txt` for generative crawlers. Named Maps search URL is Syria only: “Home of Creativity, Al Hamra, Damascus” (`33.5188338, 36.2916993`). The contact/locations map has no Saudi tab. Map “open in Google Maps” links use `target="_blank"` + `rel="noopener noreferrer"`. `/locations/` is the Damascus Al Hamra map page only (no Google Business Profile create CTA). Google Search Console HTML + DNS verification. IndexNow key file on deploy; Laravel `seo:submit-sitemap` for Search Console API + IndexNow (`/` `/pricing/` `/social/` `/locations/` `/privacy/` `/terms/` `/llms.txt` `/llms-full.txt` + sitemap).

Every indexable page has exactly one `<h1>`: home = `Hero`, `/pricing/` = `SectionHeading level={1}` on the intro, `/social/` = `<SocialPhones headingLevel={1}/>` (same component defaults to `level={2}` when embedded on home), `/locations/`/`/articles/`/`/privacy/`/`/terms/` = their own `SectionHeading level={1}`.

Dev: `npm run dev` → http://localhost:3000/ (with `NEXT_PUBLIC_BASE_PATH=none`)  
Live (VPS): https://hoc.agency/ — API https://api.hoc.agency/api

## Layout

```
app/                 # App Router: page, pricing, articles, projects/detail, not-found
components/          # sections/, chrome, motion, CacheWorker
lib/                 # content.ts, i18n, *-api.ts, whatsapp, visit-cache
public/sw.js         # Cache API hoc-design-v10 (same-origin images/fonts; cross-origin API storage, video, Facebook/Instagram/Google CDNs bypassed)
e2e/                 # Playwright
next.config.ts
```

No `app/api/`, no `middleware.ts`, no `[locale]` segment.

## Routes

| URL | File | Behavior |
| --- | --- | --- |
| `/` | `app/page.tsx` | Landing: Hero → About → Services+Clients (one purple band) → Journey → Reels → Social → Projects → Finance → FAQ → Contact |
| `/pricing/` | `app/pricing/page.tsx` | Packages + WhatsApp inquiry modal |
| `/articles/` | `app/articles/page.tsx` | Published articles list from `GET /articles` |
| `/articles/detail/?slug=` | `app/articles/detail/page.tsx` | Single article from `GET /articles/{slug}` |
| `/social/` | `app/social/page.tsx` | Indexable Instagram/Facebook/Telegram profiles (`sameAs` + CollectionPage JSON-LD); footer links here |
| `/privacy/` | `app/privacy/page.tsx` | Privacy policy from `GET /legal/privacy` (demo fallback in `lib/legal-defaults.json`); footer link |
| `/terms/` | `app/terms/page.tsx` | Terms of use from `GET /legal/terms`; footer link |
| `/projects/detail/?id=` | `app/projects/detail/page.tsx` | Project from API or demo |
| 404 | `app/not-found.tsx` | Branded, locale toggle |

Home hashes: `#top` `#about` `#vision` `#mission` `#services` `#clients` `#journey` `#reels` `#social` `#projects` `#finance` `#faq` `#contact`. **No `#pricing` on home.** About kicker is **بيت الإبداع** / **Home of Creativity** (not الاستوديو). FAQ is a native `<details>` accordion (click the question row to reveal the answer; `name="faq"` keeps one open). First FAQ names the agency: ماذا يفعل بيت الإبداع؟ Answers stay in the HTML + `FAQPage` JSON-LD. `/llms.txt` and `/llms-full.txt` are static files in `public/`. `#services` and `#clients` share one `--brand-purple` band (radial overlays on the wrapper in `app/page.tsx`). Images and videos below the hero attach `src` only when they approach the viewport (`ProgressiveImage` / `AutoplayVideo` + Cache API). Landing reels come only from `GET /reels` (dashboard CMS). The list is cached in `localStorage` and applied after hydration so returning visits do not mismatch the static HTML (React #418). Videos are never prefetched with `fetch` and never pass through the service worker (`sw.js` bypasses video extensions and any `Range` request, and skips `video/*` responses), so the browser owns byte-range streaming and paints the first frame without downloading the whole file; `rememberLoadedMedia` refuses video URLs and cross-origin API storage on purpose (`isVideoUrl`) and only caches same-origin images/fonts in `hoc-design-v10`. `onReady` hands the `<video>` element back, so `ReelCard` sets `--reel-ratio` from the real `videoWidth/videoHeight`: `.reel-card-frame` uses `aspect-ratio: var(--reel-ratio, 0.5625)` with `max-width: calc(min(72vh, 34rem) * var(--reel-ratio))` and `.reel-card-video` is `object-fit: contain`, so landscape clips are never cropped on mobile (no fixed 9/16 frame, no `max-height`). Each `ReelCard` tracks `loading` → `ready`/`error` from that same `onReady` (fired on `loadeddata`/`playing`/`canplay`, i.e. the first decoded frame) and `onError`, and shows a `LoadingLottie` overlay (`.reel-card-loading`) until then, or a small Arabic/English error line (`reels.cardError`) if the file never loads — never a static poster and never a permanent black box. Playback still pauses off-screen. When `play()` is refused (iOS Low Power Mode, data saver) or `prefers-reduced-motion` is set, `useAutoplayOnView` calls `showFirstFrame`: `controls` on plus a one-time `preload="auto"` + `load()`, so a `preload=metadata` clip cannot stall before its first frame and the visitor can start it by hand. The section stays empty when none are published. There are no bundled `/reels/*.mp4` files and no Drive fallback. Hero intro GSAP is skipped when `prefers-reduced-motion` or `hoc-skip-motion`; those paths `gsap.set` kicker/title/CTA to `autoAlpha: 1`. The visible `<h1>` is `.hero-title` in `Hero.tsx`. `HeroBrandWriter` pecks each letter of “Home of Creativity” with the hummingbird beak (skipped under `prefers-reduced-motion`).

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
| `lib/profile-pdf-api.ts` | `GET /profile-pdf` | Hidden (no navbar link until staff upload a PDF) |
| `lib/articles-api.ts` | `GET /articles`, `GET /articles/{slug}` | Empty when API unavailable |

Demo **on** unless `NEXT_PUBLIC_USE_DEMO_DATA=false` (`lib/demo-mode.ts`).

Contact and pricing forms **do not POST**. They `window.open` WhatsApp (`lib/whatsapp.ts`, number in `lib/content.ts`). Telegram bot username via `NEXT_PUBLIC_TELEGRAM_BOT`. `NEXT_PUBLIC_DASHBOARD_URL` exists in `lib/base-path.ts` but is **not linked** in the navbar. A brand-orange **Profile / الملف التعريفي** pill appears in the **footer** (under the tagline) when `GET /profile-pdf` returns a `url` (staff upload from dashboard `/profile-pdf`); the same pill remains in the navbar between WhatsApp and the language toggle. It opens the PDF in a new tab.

## Motion / SW

- GSAP via `lib/gsap-client.ts` (dynamic import). `@gsap/react` is a dependency but unused in TSX.
- Wheel/trackpad scrolling uses native `scroll-behavior: auto` (CSS smooth scroll on `html` made up/down scrolling feel lagged on Windows). In-page hash jumps still use JS `scrollIntoView({ behavior: "smooth" })`.
- Repeat visits: `lib/visit-cache.ts` key `hoc-skip-motion`.
- Looping motion (hero Ken Burns, hummingbird, client marquee ticker) pauses off-screen. Nav scroll listeners are rAF-throttled and do not use `backdrop-filter`.
- Contact channel cards (`#contact`) swing right → left → center once when they enter the viewport on scroll-down (GSAP transform only; skipped under `prefers-reduced-motion`).
- `components/CacheWorker.tsx` + `public/sw.js` cache `hoc-design-v10` (same-origin images/fonts only; cache-first). Cross-origin `api.hoc.agency/storage` logos, Facebook/Instagram/Google CDNs, and video never go through the worker (CORS/opaque mismatch). Hero + mark are precached; everything else waits until near the viewport then stays in Cache Storage. Maps loads with `loading=async` + Advanced Marker.

## Env (`.env.example`)

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_USE_DEMO_DATA`, `NEXT_PUBLIC_TELEGRAM_BOT`, `NEXT_PUBLIC_DASHBOARD_URL`, `NEXT_PUBLIC_FACEBOOK_PAGE_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

`next.config.ts`: `trailingSlash`, `images.unoptimized`, remote Google Drive hosts, `allowedDevOrigins` for `*.trycloudflare.com`.

## Scripts / E2E

`dev`, `dev:clean`, `build` → `out/`, `lint`, `e2e`. Deploy: `.github/workflows/deploy-ssh.yml` (VPS rsync only).

Playwright (`playwright.config.ts`): needs the **dev server**. `e2e/landing.spec.ts` = UI. `e2e/request-submit.spec.ts` hits the Laravel API directly (not the contact form).

## Session ops (21 Sep 2026 — Semrush technical SEO)

Caddy edge (`backend/deploy/Caddyfile`) now `encode zstd gzip` on `@siteAsset`, dashboard static, and API `/api*` `/auth*` `/storage*` (previously only HTML got `encode gzip`, assets shipped uncompressed). `www.hoc.agency` sends HSTS before its redirect (apex/API already did). `api.hoc.agency/robots.txt` responds `Disallow: /` (previously 404, since that host only handles `/api*` `/auth*` `/up` `/storage*`). `/sitemap.xml` gets an explicit `handle` with `Content-Type: application/xml`. External links used in static markup (Instagram/Facebook/Telegram/WhatsApp/Google Maps/Facebook plugin) were curl-checked with a browser UA and all return `200`; Semrush's "broken" flags there are bot-blocked crawls, not dead links — left unchanged per plan.

## Session ops (14 Sep 2026)

`package.json` `overrides.next.postcss = "8.5.23"` so Next’s nested PostCSS is patched. `npm audit` = 0. Do **not** `npm audit fix --force` (would install Next 16).

## Do not assume

- Locale URLs, SSR, staff login in navbar, contact POST to API, pricing section on home, `npm start` as production, Flutter in this repo.
