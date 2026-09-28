import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ShowcaseClient } from "./portfolio-api";

type LogoManifest = Record<string, { path: string; width: number; height: number; bytes: number }>;

/**
 * `scripts/prebuild.mjs` downloads each CMS client logo (SVGs wrapping ~0.5 MB PNGs) and
 * writes a 240px WebP under `public/generated/clients/<hash>.webp`. The pages point at those
 * files; a logo without an optimized copy keeps its CMS URL.
 */
function readManifest(): LogoManifest {
  const file = join(process.cwd(), "public", "generated", "clients", "manifest.json");
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, "utf8")) as LogoManifest;
  } catch {
    return {};
  }
}

export function withOptimizedLogos(clients: ShowcaseClient[]): ShowcaseClient[] {
  const manifest = readManifest();
  return clients.map((client) => {
    const optimized = client.logo_url ? manifest[client.logo_url] : undefined;
    return optimized ? { ...client, logo_url: optimized.path } : client;
  });
}
