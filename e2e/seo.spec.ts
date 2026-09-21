import { expect, test } from "@playwright/test";
import { LANDING, LOCATIONS, SOCIAL } from "./helpers";

test.describe("SEO and geo", () => {
  test("home includes title, canonical, JSON-LD and geo tags", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/بيت الإبداع \| Home \| HOC — وكالة هوية دمشق/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /hoc\.agency\/?$/);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="geo.placename"]')).toHaveAttribute("content", /Damascus/i);
    await expect(page.locator('meta[name="geo.position"]')).toHaveAttribute("content", /33\.5188338;36\.2916993/);
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const payload = JSON.parse((await jsonLd.textContent()) ?? "{}") as { "@graph"?: Array<{ "@type"?: unknown }> };
    const types = (payload["@graph"] ?? []).flatMap((node) => {
      const value = node["@type"];
      return Array.isArray(value) ? value : [value];
    });
    expect(types).toEqual(expect.arrayContaining(["Organization", "LocalBusiness", "WebSite"]));
    const graph = payload["@graph"] ?? [];
    const sameAs = graph.flatMap((node) => {
      const value = (node as { sameAs?: string[] }).sameAs;
      return Array.isArray(value) ? value : [];
    });
    expect(sameAs).toEqual(
      expect.arrayContaining([
        "https://www.instagram.com/homeofcreativity.sy/",
        "https://www.facebook.com/profile.php?id=61584616932975",
      ]),
    );
  });

  test("robots and sitemap are public", async ({ request }) => {
    const origin = new URL(LANDING).origin;
    const robots = await request.get(`${origin}/robots.txt`);
    expect(robots.ok()).toBeTruthy();
    const robotsBody = await robots.text();
    expect(robotsBody).toContain("Sitemap:");
    expect(robotsBody).toMatch(/Disallow:\s*\/dashboard/);

    const sitemap = await request.get(`${origin}/sitemap.xml`);
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).toContain("https://hoc.agency/");
    expect(xml).toContain("https://hoc.agency/pricing/");
    expect(xml).toContain("https://hoc.agency/social/");
    expect(xml).toContain("https://hoc.agency/privacy/");
    expect(xml).toContain("https://hoc.agency/terms/");
  });

  test("social page is indexable with official profile links", async ({ page }) => {
    await page.goto(SOCIAL, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/السوشال ميديا|Social media/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/social\/?$/);
    await expect(page.locator('a[rel~="me"][href*="instagram.com"]')).toHaveCount(1);
    await expect(page.locator('a[rel~="me"][href*="facebook.com"]')).toHaveCount(1);
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(2);
    const payloads = await jsonLd.allTextContents();
    const types = payloads.flatMap((text) => {
      const parsed = JSON.parse(text || "{}") as { "@graph"?: Array<{ "@type"?: unknown }>; "@type"?: unknown };
      const nodes = parsed["@graph"] ?? [parsed];
      return nodes.flatMap((node) => {
        const value = node["@type"];
        return Array.isArray(value) ? value : [value];
      });
    });
    expect(types).toEqual(expect.arrayContaining(["CollectionPage", "Organization"]));
  });
});

  test("locations page is indexable with named map links", async ({ page }) => {
    await page.goto(LOCATIONS, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/المواقع|Locations/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/locations\/?$/);
    await expect(page.getByRole("heading", { level: 1, name: /بيت الإبداع على الخريطة|Home of Creativity on the map/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /أضف بيت الإبداع إلى خرائط جوجل|Add Home of Creativity to Google Maps/ })).toHaveCount(0);
    await expect(page.getByRole("tab", { name: /السعودية|Saudi/i })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /الرياض|Riyadh/ })).toHaveCount(0);
    const mapsLinks = page.getByRole("link", { name: /فتح في Google Maps|Open in Google Maps/ });
    await expect(mapsLinks.first()).toHaveAttribute(
      "href",
      /maps\/search\/\?api=1&query=Home%20of%20Creativity%2C%20Al%20Hamra/,
    );
    const mapsCount = await mapsLinks.count();
    expect(mapsCount).toBeGreaterThan(0);
    for (let index = 0; index < mapsCount; index += 1) {
      await expect(mapsLinks.nth(index)).toHaveAttribute("target", "_blank");
      await expect(mapsLinks.nth(index)).toHaveAttribute("rel", /noopener/);
    }
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(2);
    const payloads = await jsonLd.allTextContents();
    const types = payloads.flatMap((text) => {
      const parsed = JSON.parse(text || "{}") as { "@graph"?: Array<{ "@type"?: unknown }>; "@type"?: unknown };
      const nodes = parsed["@graph"] ?? [parsed];
      return nodes.flatMap((node) => {
        const value = node["@type"];
        return Array.isArray(value) ? value : [value];
      });
    });
    expect(types).toEqual(expect.arrayContaining(["CollectionPage", "LocalBusiness"]));
  });
