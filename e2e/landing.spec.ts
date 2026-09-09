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
    for (const id of ["top", "about", "services", "clients", "projects", "pricing", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("package inquiry form opens WhatsApp with the Arabic template", async ({ page }) => {
    await page.addInitScript(() => {
      window.open = ((url?: string | URL) => {
        document.documentElement.setAttribute("data-wa", String(url ?? ""));
        return null;
      }) as typeof window.open;
    });

    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");

    await page.locator("#pricing").scrollIntoViewIfNeeded();
    await page.locator("#pricing").getByRole("button", { name: "اختر الباقة" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("الاسم").fill("أحمد");
    await dialog.getByLabel("رقم الهاتف").fill("0991234567");
    await dialog.getByLabel("اسم الشركة أو صفحة السوشال ميديا").fill("النور");
    await dialog.getByRole("button", { name: "إرسال عبر واتساب" }).click();

    await expect(page.locator("html")).toHaveAttribute("data-wa", /wa\.me\/963954187154\?text=/);
    const href = await page.locator("html").getAttribute("data-wa");
    const text = decodeURIComponent(href?.split("text=")[1] ?? "");
    expect(text).toContain("مرحبا home of creativity");
    expect(text).toContain("معاك أ. أحمد من شركة النور");
    expect(text).toContain("حابين نشترك معكم بباقة");
    expect(text).toContain("رقمي: 0991234567");
    expect(text).toContain("شكراً لكم");
  });
});
