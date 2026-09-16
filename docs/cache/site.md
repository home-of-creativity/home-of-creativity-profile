# Marketing site (Next.js static export)

Path: `design/`  
Installed: Next **15.5.25**, React **19.2.8**, Tailwind **4.3.3**, GSAP **3.15.0**, Framer Motion **12.x**  
`basePath` / `assetPrefix`: `/home-of-creativity-profile`  
`output: "export"` — no SSR on GitHub Pages.

Dev: `npm run dev` → http://localhost:3000/home-of-creativity-profile/  
Live: https://home-of-creativity.github.io/home-of-creativity-profile/

## Layout

```
app/                 # App Router: page, pricing, projects/detail, not-found
components/          # sections/, chrome, motion, CacheWorker
lib/                 # content.ts, i18n, *-api.ts, whatsapp, visit-cache
public/sw.js         # Cache API hoc-design-v3
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

Home hashes: `#top` `#about` `#vision` `#mission` `#services` `#clients` `#journey` `#reels` `#social` `#projects` `#finance` `#contact`. **No `#pricing` on home.** `#services` and `#clients` share one `--brand-purple` band (radial overlays on the wrapper in `app/page.tsx`). Reels autoplay muted when the section is in view.

## i18n

`lib/i18n.tsx` + copy in `lib/content.ts`. Toggle `en`/`ar` (localStorage `hoc-locale` + cookie). Boot script in `app/layout.tsx` sets `lang`/`dir` before paint.

## Data / forms

Client `fetch` to `NEXT_PUBLIC_API_URL` (default `http://127.0.0.1:8000/api`), `cache: "no-store"`:

| Module | Endpoint | Fallback |
| --- | --- | --- |
| `lib/contact-api.ts` | `GET /contact` | Demo if demo-mode |
| `lib/portfolio-api.ts` | `GET /portfolio/clients\|projects\|{id}` | `lib/demo-data.ts` |
| `lib/pricing-api.ts` | `GET /pricing` | `lib/pricing-catalog.ts` |
| `lib/instagram-feed-api.ts` | `GET /social/instagram-feed` | Empty / embed |
| `lib/facebook-feed-api.ts` | `GET /social/facebook-feed` | Facebook page plugin iframe |

Demo **on** unless `NEXT_PUBLIC_USE_DEMO_DATA=false` (`lib/demo-mode.ts`).

Contact and pricing forms **do not POST**. They `window.open` WhatsApp (`lib/whatsapp.ts`, number in `lib/content.ts`). Telegram bot username via `NEXT_PUBLIC_TELEGRAM_BOT`. `NEXT_PUBLIC_DASHBOARD_URL` exists in `lib/base-path.ts` but is **not linked** in the navbar.

## Motion / SW

- GSAP via `lib/gsap-client.ts` (dynamic import). `@gsap/react` is a dependency but unused in TSX.
- Repeat visits: `lib/visit-cache.ts` key `hoc-skip-motion`.
- `components/CacheWorker.tsx` + `public/sw.js` cache `hoc-design-v3`.

## Env (`.env.example`)

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_USE_DEMO_DATA`, `NEXT_PUBLIC_TELEGRAM_BOT`, `NEXT_PUBLIC_DASHBOARD_URL`, `NEXT_PUBLIC_FACEBOOK_PAGE_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`.

`next.config.ts`: `trailingSlash`, `images.unoptimized`, remote Google Drive hosts, `allowedDevOrigins` for `*.trycloudflare.com`.

## Scripts / E2E

`dev`, `dev:clean`, `build` → `out/`, `lint`, `e2e`. Deploy: `.github/workflows/deploy-pages.yml` (Node 22, `out/` to Pages).

Playwright (`playwright.config.ts`): needs the **dev server**. `e2e/landing.spec.ts` = UI. `e2e/request-submit.spec.ts` hits the Laravel API directly (not the contact form).

## Session ops (14 Sep 2026)

`package.json` `overrides.next.postcss = "8.5.23"` so Next’s nested PostCSS is patched. `npm audit` = 0. Do **not** `npm audit fix --force` (would install Next 16).

## Do not assume

- Locale URLs, SSR, staff login in navbar, contact POST to API, pricing section on home, `npm start` as production, Flutter in this repo.
