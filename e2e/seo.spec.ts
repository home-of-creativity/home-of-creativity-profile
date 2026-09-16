import { expect, test } from "@playwright/test";
import { LANDING } from "./helpers";

test.describe("SEO and geo", () => {
  test("home includes title, canonical, JSON-LD and geo tags", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Home of Creativity/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /hoc\.agency\/?$/);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="geo.placename"]')).toHaveAttribute("content", /Damascus/i);
    await expect(page.locator('meta[name="geo.position"]')).toHaveAttribute("content", /33\.5192;36\.2917/);
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const payload = JSON.parse((await jsonLd.textContent()) ?? "{}") as { "@graph"?: Array<{ "@type"?: unknown }> };
    const types = (payload["@graph"] ?? []).flatMap((node) => {
      const value = node["@type"];
      return Array.isArray(value) ? value : [value];
    });
    expect(types).toEqual(expect.arrayContaining(["Organization", "LocalBusiness", "WebSite"]));
  });

  test("robots and sitemap are public", async ({ request }) => {
    const origin = new URL(LANDING).origin;
    const robots = await request.get(`${origin}/robots.txt`);
    expect(robots.ok()).toBeTruthy();
    const robotsBody = await robots.text();
    expect(robotsBody).toContain("Sitemap:");
    expect(robotsBody).toMatch(/Disallow:\s*\/staff/);

    const sitemap = await request.get(`${origin}/sitemap.xml`);
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).toContain("https://hoc.agency/");
    expect(xml).toContain("https://hoc.agency/pricing/");
  });
});
