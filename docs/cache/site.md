# Marketing site (Next.js static export)

Last updated: 22 September 2026 (non-branded GEO — `/services/branding/`, `/services/brand-identity/`, retitled `/services/visual-identity/`, `/locations/damascus/`, six static articles, article index in the first HTML)

Path: `design/`  
Installed: Next **15.5.25**, React **19.2.8**, Tailwind **4.3.3**, GSAP **3.15.0**, Framer Motion **12.x**  
`basePath` / `assetPrefix`: empty on VPS (`NEXT_PUBLIC_BASE_PATH=none`). GitHub Pages disabled.  
`output: "export"` — static export only. `NEXT_PUBLIC_SENTRY_DSN` empty disables client Sentry (`instrumentation-client.ts`).

SEO/GEO: `app/sitemap.ts`, `app/robots.ts` (allow `*` plus GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, **Cursor**, Claude-Code, Operator, ChatGPT Agent, Google-Agent, Devin, Manus-User, Amazonbot, Mistral, DeepSeek, Kimi, Qwen, and other AI-agency crawlers), bilingual titles/descriptions (home title: بيت الإبداع | Home | HOC — وكالة هوية دمشق; JSON-LD `alternateName` is `["HOC", "بيت الإبداع", "بيت الابداع", "Creativation Source"]` only — **no** bare `"Home"` or lowercase `"hoc"`). **Riyadh / Saudi Arabia is `areaServed` only, never a mapped office**: `contact.offices` (`lib/content.ts`) has a single Damascus entry, `officesGeo` (`lib/seo.ts`) has no `ksa` key, and the contact "location" channel / footer tagline / noscript copy only ever print Damascus. JSON-LD is split: `lib/seo.ts` `siteJsonLd()` (`Organization` + `WebSite`, rendered by `<SeoJsonLd/>` in the **root layout on every page**, no `slogan`) vs `homeJsonLd()` (`LocalBusiness` + `FAQPage`, rendered by `<SeoHomeJsonLd/>` **only in `app/page.tsx`**, no `priceRange`) — FAQPage only ships where the visible `#faq` section exists, and is **Arabic-only** (`name`/`text` = `.ar`, matching the default `lang="ar"` document; same pattern on the 3 service-detail FAQPages). `LocalBusiness` has no `inLanguage`/`knowsAbout`; its `location[]` only includes the Damascus `Place`; its service list is `hasOfferCatalog` → `OfferCatalog` → `ListItem`→`Service` (no bare `Offer` nodes without a price). `/social/`, `/locations/`, `/about/`, `/services/` keep their own page-scoped `CollectionPage`/`AboutPage` JSON-LD (2 script tags total: site-wide + page); the 3 service-detail pages add `Service` + `BreadcrumbList` + `FAQPage` (still 2 script tags — one `<script>`, one `@graph`); `/articles/{slug}/` and `/projects/{id}/` add `Article`/`CreativeWork` + `BreadcrumbList`. Inner pages (pricing/privacy/terms) render 1 script tag (site-wide only). `<SeoCrawlerCopy/>` (noscript fallback copy) is home-only too (was global; used to duplicate home content + an extra `<h1>` onto every page); it lists only the Damascus office (offices array has one entry). No `AggregateRating`. Public `/llms.txt` and `/llms-full.txt` for generative crawlers — rewritten to state the one-office/served-market split explicitly and link `/about/`, `/services/`, and the 3 service pages. Named Maps search URL is Syria only: “Home of Creativity, Al Hamra, Damascus” (`33.5188338, 36.2916993`). The contact/locations map has no Saudi tab. Map “open in Google Maps” links use `target="_blank"` + `rel="noopener noreferrer"`. `/locations/` is the Damascus Al Hamra map page only (no Google Business Profile create CTA). Google Search Console HTML + DNS verification. IndexNow key file on deploy; Laravel `seo:submit-sitemap` for Search Console API + IndexNow (`/` `/pricing/` `/social/` `/locations/` `/privacy/` `/terms/` `/llms.txt` `/llms-full.txt` + sitemap).

**GEO entity pages (added in the audit):** `/about/` = canonical, non-narrative entity description (`aboutPage` in `lib/content.ts`, distinct from the homepage `about` section which keeps its marketing voice). `/services/` = index of all 14 practices (`servicesPage` + `services.items`), linking to a dedicated page only for practices that have one. `serviceDetails` in `lib/content.ts` (3 entries: `visual-identity`, `social-media`, `websites-ecommerce`) drives `/services/{slug}/` — definition, audience, process, 3 FAQs, sibling links, WhatsApp CTA, no invented deliverables/pricing/timelines. The other 11 practices stay index-only until their own definitions are confirmed.

Every indexable page has exactly one `<h1>`: home = `Hero`, `/pricing/` = `SectionHeading level={1}` on the intro, `/social/` = `<SocialPhones headingLevel={1}/>` (same component defaults to `level={2}` when embedded on home), `/locations/`/`/articles/`/`/privacy/`/`/terms/` = their own `SectionHeading level={1}`.

Dev: `npm run dev` → http://localhost:3000/ (with `NEXT_PUBLIC_BASE_PATH=none`)  
Live (VPS): https://hoc.agency/ — API https://api.hoc.agency/api

## Layout

```
app/                 # App Router: page, about, services (+3 detail pages), pricing, articles/[slug], projects/[id], not-found
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
| `/` | `app/page.tsx` | Landing: Hero → About → Services+Clients (one purple band) → Client notes → Journey → Reels → Social → Projects → Finance → FAQ → Contact |
| `/about/` | `app/about/page.tsx` | Canonical entity description (no CMS fetch) |
| `/services/` | `app/services/page.tsx` | Index of all 14 practices; links to the 3 published detail pages |
| `/services/branding/`, `/services/brand-identity/` | `app/services/branding/page.tsx`, `app/services/brand-identity/page.tsx` | Category pages inside the published catalog. Branding is not a new practice and not brand strategy. Both languages are in the HTML via `data-lang`. |
| `/services/visual-identity/`, `/services/social-media/`, `/services/websites-ecommerce/` | `app/services/{slug}/page.tsx` | Static detail page: definition, audience, process, 3 FAQs, `Service`+`BreadcrumbList`+`FAQPage` JSON-LD. Visual identity H1/title target “Visual Identity Design in Damascus”. |
| `/locations/damascus/` | `app/locations/damascus/page.tsx` | Canonical office URL. `/locations/` is the index and links here. Map stays Damascus-only. |
| `/pricing/` | `app/pricing/page.tsx` | Packages + WhatsApp inquiry modal |
| `/articles/` | `app/articles/page.tsx` | Client list from `GET /articles` only (dashboard). No bundled articles. |
| `/articles/detail/?slug=` | `app/articles/detail/page.tsx` | Client fetch of `GET /articles/{slug}` so a post added in the dashboard opens before the next static build. A path with no exported file is the 404 page (`out/404.html`), not the homepage. |
| `/articles/{slug}/` | `app/articles/[slug]/page.tsx` | **Server Component**, `generateStaticParams`/`generateMetadata` fetch `GET /articles` + `GET /articles/{slug}` at **build time**; bilingual body baked into static HTML via `ArticleDetailStatic` (`data-lang="ar"`/`"en"` blocks, CSS-toggled in `globals.css`, no client fetch) + `Article`+`BreadcrumbList` JSON-LD. Zero pages when the API is unreachable at build time (no article URLs, not a broken fetch) |
| `/social/` | `app/social/page.tsx` | Indexable Instagram/Facebook/Telegram profiles (`sameAs` + CollectionPage JSON-LD); footer links here |
| `/privacy/` | `app/privacy/page.tsx` | Privacy policy from `GET /legal/privacy` (demo fallback in `lib/legal-defaults.json`); footer link |
| `/terms/` | `app/terms/page.tsx` | Terms of use from `GET /legal/terms`; footer link |
| `/projects/{id}/` | `app/projects/[id]/page.tsx` | **Server Component**, `generateStaticParams`/`generateMetadata` fetch at build time; `ProjectDetailView` now takes `project` as a prop (no client fetch) + `CreativeWork`+`BreadcrumbList` JSON-LD. `generateStaticParams` returns `[]` when `NEXT_PUBLIC_API_URL` is unset (demo/GitHub Pages builds) so demo fallback projects never get a real URL |
| 404 | `app/not-found.tsx` | Branded, locale toggle |

Home hashes: `#top` `#about` `#vision` `#mission` `#services` `#clients` `#voices` `#journey` `#reels` `#social` `#projects` `#finance` `#faq` `#contact`. `#voices` is three static client notes (أبو شاكر، جدو شاكر، رحيل ورؤى) with a five-star visual row and no Review / AggregateRating JSON-LD. `#journey` is a nivx pin on viewports from 900px: the section title sits in normal flow, then a full-viewport frame slides the three stages horizontally with `scrub: true` (no catch-up delay). Below 900px, and when reduced motion is on, the stages stack vertically (image, then copy) and the page scroll is not pinned. **No `#pricing` on home.** About kicker is **بيت الإبداع** / **Home of Creativity** (not الاستوديو). FAQ is a native `<details>` accordion (click the question row to reveal the answer; `name="faq"` keeps one open). First FAQ names the agency: ماذا يفعل بيت الإبداع؟ Answers stay in the HTML + `FAQPage` JSON-LD. `/llms-full.txt` and the brief in `/llms.txt` live in `public/`. `app/llms.txt/route.ts` reads `public/llms.txt` at build and appends every dashboard article from `GET /articles` as `https://hoc.agency/articles/{slug}/`. Next does not copy `public/llms.txt` over that route. `#services` and `#clients` share one `--brand-purple` band (radial overlays on the wrapper in `app/page.tsx`). Images and videos below the hero attach `src` only when they approach the viewport (`ProgressiveImage` / `AutoplayVideo` + Cache API). Landing reels come only from `GET /reels` (dashboard CMS). The list is cached in `localStorage` and applied after hydration so returning visits do not mismatch the static HTML (React #418). Videos are never prefetched with `fetch` and never pass through the service worker (`sw.js` bypasses video extensions and any `Range` request, and skips `video/*` responses), so the browser owns byte-range streaming and paints the first frame without downloading the whole file; `rememberLoadedMedia` refuses video URLs and cross-origin API storage on purpose (`isVideoUrl`) and only caches same-origin images/fonts in `hoc-design-v10`. `onReady` hands the `<video>` element back, so `ReelCard` sets `--reel-ratio` from the real `videoWidth/videoHeight`: `.reel-card-frame` uses `aspect-ratio: var(--reel-ratio, 0.5625)` with `max-width: calc(min(72vh, 34rem) * var(--reel-ratio))` and `.reel-card-video` is `object-fit: contain`, so landscape clips are never cropped on mobile (no fixed 9/16 frame, no `max-height`). Each `ReelCard` tracks `loading` → `ready`/`error` from that same `onReady` (fired on `loadeddata`/`playing`/`canplay`, i.e. the first decoded frame) and `onError`, and shows a `LoadingLottie` overlay (`.reel-card-loading`) until then, or a small Arabic/English error line (`reels.cardError`) if the file never loads — never a static poster and never a permanent black box. Playback still pauses off-screen. When `play()` is refused (iOS Low Power Mode, data saver) or `prefers-reduced-motion` is set, `useAutoplayOnView` calls `showFirstFrame`: `controls` on plus a one-time `preload="auto"` + `load()`, so a `preload=metadata` clip cannot stall before its first frame and the visitor can start it by hand. The section stays empty when none are published. There are no bundled `/reels/*.mp4` files and no Drive fallback. Hero intro GSAP is skipped when `prefers-reduced-motion` or `hoc-skip-motion`; those paths `gsap.set` kicker/title/CTA to `autoAlpha: 1`. The visible `<h1>` is `.hero-title` in `Hero.tsx`. `HeroBrandWriter` pecks each letter of “Home of Creativity” with the hummingbird beak (skipped under `prefers-reduced-motion`).

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
- Scroll-linked GSAP uses `scrub: true` (nav progress and `#journey`) so the playhead does not lag behind the scrollbar. `#journey` pins only at `min-width: 900px`. `ScrollTrigger` sets `ignoreMobileResize` and `limitCallbacks`.
- Repeat visits: `lib/visit-cache.ts` key `hoc-skip-motion`.
- Looping motion (hero Ken Burns, hummingbird) pauses off-screen. Client logos stay painted while scrolling: no `contain: paint`, no `will-change` toggle, images are not lazy. The marquee only pauses its transform when the row is a full viewport away, and resumes before it re-enters so scroll-back does not wait on a repaint. Arabic reverses the loop. It also pauses on hover. Nav scroll listeners are rAF-throttled and do not use `backdrop-filter`.
- Contact channel cards (`#contact`) swing right → left → center once when they enter the viewport on scroll-down (GSAP transform only; skipped under `prefers-reduced-motion`).
- `#social` phone screens are dark (`#0c0c10` / ivory type): bezel, feed, Instagram and Facebook profile chrome, and iframe background. Unselected posts/reels tabs use the secondary orange (`--brand-orange`); the selected tab stays ivory with an orange underline. The section behind them stays deep purple.
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
