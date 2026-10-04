// Runs before `next build` (see package.json):
// 1. Clears Next's fetch cache so every build reads fresh CMS data (build fetches use force-cache).
// 2. Downloads each CMS client logo (SVGs wrapping ~0.5 MB PNGs) and writes a 240px WebP under
//    public/generated/clients/<content hash>.webp plus manifest.json, read by lib/client-logos.ts.
//    A logo that cannot be fetched or converted keeps its CMS URL.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import nextEnv from "@next/env";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
nextEnv.loadEnvConfig(root, false);

rmSync(join(root, ".next", "cache", "fetch-cache"), { recursive: true, force: true });

const demo = !["0", "false", "off", "no"].includes(String(process.env.NEXT_PUBLIC_USE_DEMO_DATA ?? "").toLowerCase());
const api = (process.env.NEXT_PUBLIC_API_URL ?? "").trim().replace(/\/$/, "");
const outDir = join(root, "public", "generated", "clients");

async function fetchWithRetry(url, init = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(30000) });
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
  }
  throw lastError;
}

async function optimizeLogos() {
  if (demo || !api) {
    console.log("prebuild: demo build or no API; client logos keep their source URLs");
    return;
  }
  const payload = await (await fetchWithRetry(`${api}/portfolio/clients`, { headers: { Accept: "application/json" } })).json();
  const clients = Array.isArray(payload.data) ? payload.data : [];
  mkdirSync(outDir, { recursive: true });

  const manifest = {};
  const keep = new Set(["manifest.json"]);
  for (const client of clients) {
    if (!client.logo_url) continue;
    try {
      const source = Buffer.from(await (await fetchWithRetry(client.logo_url)).arrayBuffer());
      const name = `${createHash("sha256").update(source).digest("hex").slice(0, 16)}.webp`;
      const file = join(outDir, name);
      if (!existsSync(file)) {
        await sharp(source, { density: 300 })
          .resize(240, 240, { fit: "inside", withoutEnlargement: false })
          .webp({ quality: 86, alphaQuality: 90, effort: 6 })
          .toFile(file);
      }
      const meta = await sharp(file).metadata();
      manifest[client.logo_url] = {
        path: `/generated/clients/${name}`,
        width: meta.width,
        height: meta.height,
        bytes: meta.size ?? 0,
      };
      keep.add(name);
      console.log(`prebuild: logo ${client.name} ${Math.round(source.length / 1024)} KiB -> ${name}`);
    } catch (error) {
      console.warn(`prebuild: logo ${client.name} kept its CMS URL (${error instanceof Error ? error.message : error})`);
    }
  }

  for (const entry of readdirSync(outDir)) {
    if (!keep.has(entry)) rmSync(join(outDir, entry));
  }
  writeFileSync(join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

await optimizeLogos();
