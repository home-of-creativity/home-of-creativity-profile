# Home of Creativity — Company Profile

Premium bilingual (Arabic / English) company profile for **Home of Creativity (Creativation Source)**.

## Live site

**https://hoc.agency/** (VPS deploy only — GitHub Pages disabled)

Local `npm run dev` is at **http://localhost:3000/** when `NEXT_PUBLIC_BASE_PATH=none`

```bash
npm install
npm run dev
```

Production is a static export on the VPS (`NEXT_PUBLIC_USE_DEMO_DATA=false`, API at `https://api.hoc.agency/api`).

Deploy: GitHub Actions **Deploy (SSH)** or `deploy/` scripts from the parent workspace.

## E2E (landing)

With the dev server running:

```bash
npm run e2e
```

