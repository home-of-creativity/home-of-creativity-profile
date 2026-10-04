# SEO changelog

## 2026-10-04 — retest fixes (items 1–13)

Local commits on `main` in `design` and `backend`, not pushed. One commit per item, prefixed `seo(N)`.

| # | Item | Status | Where |
|---|------|--------|-------|
| 1 | `disambiguatingDescription` without "not another business or school", names Damascus, Riyadh and the UAE | done | `lib/seo.ts`. The llms files never had that sentence. |
| 2 | One level-1 heading: the English title is a plain `<p>` (no role, no aria-level) | done | `components/LangHeading.tsx`, used on services, articles, privacy, terms, branding pages and offices |
| 3 | No English copies of the H2s on `/services/branding/` and `/services/brand-identity/` | done | `components/sections/TopicPage.tsx` |
| 4 | No hreflang, `<html lang="ar" dir="rtl">` | done | already the case in `app/layout.tsx`; no page passes `languages` |
| 5 | Home links to every published project without JS; project 13 in related projects | done | `Projects.tsx` renders every card (past the preview with `hidden`); fallback related projects 4 → 6 |
| 6 | Logo alt «شعار أبو شاكر» | done, TODO name | backend migration `2026_10_04_120000` (deployed earlier today); TODO in `ShowcaseClients.tsx` |
| 7 | Remove `pro_design_perfect_bot` from site, schema and llms | done, TODO handle | `CLIENT_TELEGRAM_URL` is null unless `NEXT_PUBLIC_TELEGRAM_BOT` is set; legal pages drop that contact line (frontend filter + backend migration `2026_10_04_130000`) |
| 8 | Article `<title>` ≤ 60 characters, `[topic] \| بيت الإبداع` | done | `lib/article-seo.ts`; the H1 keeps the full title |
| 9 | Service H1 names Damascus and Riyadh | done | `heading` in `lib/service-details.ts` (same phrase as the meta title) |
| 10 | PDF link versioned by the file, not the settings date | done (needs backend deploy) | backend `ProfilePdf::version()` = file mtime; frontend `profilePdfHref()` uses `?v=` and falls back to `updated_at` digits until then |
| 11 | No visible «جارٍ التحميل» in static HTML | done | `LoadingLottie` keeps it as `aria-label` only; visible only under reduced motion, after mount |
| 12 | Own og:image / twitter:image, 1200x630 | partly | services: crops of the category covers (`public/og/`, one per category, shared within a category); articles: their own lead image as a 1200x630 crop; **locations: blocked, no office photos** |
| 13 | Visible author + Article `author` | done, TODO person | byline «بقلم: بيت الإبداع» / "By Home of Creativity"; schema `author` Organization «بيت الإبداع» |

### TODOs needing content from HOC

- The client's one official name for the «أبو شاكر» logo (the site also says "Abo Shaker", "Abu Shaker", aboshaker.sa). `components/sections/ShowcaseClients.tsx`
- The correct Telegram handle. Set `NEXT_PUBLIC_TELEGRAM_BOT` in the deploy workflow to bring the links back. `lib/base-path.ts`. Page descriptions and the privacy text still mention Telegram as a channel in words, without a link.
- Photos of the Damascus and Riyadh offices for the location pages' og:image. `lib/og-images.ts`
- A named author per article, if HOC wants a person instead of the organization. `lib/seo.ts`
- Optional: one cover per service. Services in the same category share an og:image today.

### Acceptance checks

Run against a production build (`npm run build` with `NEXT_PUBLIC_BASE_PATH=none`, live CMS data, no `NEXT_PUBLIC_TELEGRAM_BOT`) served by the production Caddyfile on localhost, 4 Oct 2026.

## 1. Level-1 headings (46 sitemap URLs)
PASS: all 46 pages have exactly one (h1 or aria-level="1")

## 2. Forbidden strings in every page + llms*.txt
- "مدرسة": 0 match(es)
- "جهة أخرى": 0 match(es)
- "pro_design_perfect_bot": 0 match(es)

## 3. JSON-LD description fields mention the UAE
- description: UAE ✔ — Branding, marketing and creative agency with offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.
- disambiguatingDescription: UAE ✔ — The Home of Creativity (HOC, بيت الإبداع) at hoc.agency: the branding and marketing agency with offices in Damascus (Al Hamra), Riyadh (Al M
- description: UAE ✔ — Branding, marketing and creative agency with offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.

## 4. Home page (no JS) links to /projects/7/ … /projects/15/
PASS: all of 7–15 linked

## 5. <title> length (max 65)
PASS: longest is 62 characters

## 6. "Abo shakir" in alt attributes
PASS: 0 (home logo alt: alt="شعار أبو شاكر")
