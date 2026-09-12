import { expect, test } from "@playwright/test";
import { LANDING, PRICING } from "./helpers";

test.describe("Landing navbar and locale", () => {
  test("shows Telegram and WhatsApp in navbar instead of staff login", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    const telegram = page.getByRole("link", { name: /Start on Telegram|ابدأ عبر تيليجرام/i }).first();
    await expect(telegram).toBeVisible();
    await expect(telegram).toHaveAttribute("href", "https://t.me/pro_design_perfect_bot");
    const whatsapp = page.getByRole("link", { name: /WhatsApp|واتساب/i }).first();
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /wa\.me\/963954187154\?text=/);
    await expect(page.getByRole("link", { name: /Login|تسجيل الدخول/i })).toHaveCount(0);
  });

  test("toggles English and Arabic direction", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "English" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Start on Telegram" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "WhatsApp" }).first()).toBeVisible();

    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("link", { name: "الرئيسية" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "ابدأ عبر تيليجرام" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "واتساب" }).first()).toBeVisible();
  });

  test("section anchors exist for the main journey", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    for (const id of ["top", "about", "vision", "mission", "services", "clients", "journey", "projects", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator("#pricing")).toHaveCount(0);
    await expect(page.locator("#philosophy")).toHaveCount(0);
    await expect(page.locator("#case-studies")).toHaveCount(0);
  });

  test("selected project opens its details page", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "العربية" }).click();
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const card = page.locator("#projects a.project-card").first();
    await expect(card).toBeVisible({ timeout: 15_000 });
    const title = ((await card.innerText()) ?? "").split("\n")[0]?.trim();
    await card.click();
    await expect(page).toHaveURL(/\/projects\/detail\/\?id=/);
    if (title) {
      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    }
  });

  test("nav highlights the clicked home section", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "English" }).click();
    const menu = page.getByRole("navigation", { name: "Main menu" }).first();
    const home = menu.getByRole("link", { name: "Home" });
    const services = menu.getByRole("link", { name: "Services" });
    const contact = menu.getByRole("link", { name: "Contact us" });

    await services.click();
    await expect(services).toHaveAttribute("aria-current", "page");
    await expect(home).not.toHaveAttribute("aria-current", "page");
    await expect(page.locator("#services")).toBeInViewport();

    await contact.click();
    await expect(contact).toHaveAttribute("aria-current", "page");
    await expect(services).not.toHaveAttribute("aria-current", "page");
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("package inquiry form opens WhatsApp with the Arabic template", async ({ page }) => {
    await page.addInitScript(() => {
      window.open = ((url?: string | URL) => {
        document.documentElement.setAttribute("data-wa", String(url ?? ""));
        return null;
      }) as typeof window.open;
    });

    await page.goto(PRICING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");

    await expect(page.locator("#pricing")).toBeVisible();
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
