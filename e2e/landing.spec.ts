import { expect, test } from "@playwright/test";
import { LANDING } from "./helpers";

test.describe("Landing navbar and locale", () => {
  test("sends clients to Telegram instead of staff login", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    const telegram = page.getByRole("link", { name: /Start on Telegram|ابدأ عبر تيليجرام/i }).first();
    await expect(telegram).toBeVisible();
    await expect(telegram).toHaveAttribute("href", "https://t.me/pro_design_perfect_bot");
    await expect(page.getByRole("link", { name: /Login|تسجيل الدخول/i })).toHaveCount(0);
  });

  test("toggles English and Arabic direction", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "English" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("link", { name: "Start on Telegram" }).first()).toBeVisible();

    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("link", { name: "ابدأ عبر تيليجرام" }).first()).toBeVisible();
  });

  test("section anchors exist for the main journey", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    for (const id of ["top", "about", "services", "clients", "projects", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });
});
