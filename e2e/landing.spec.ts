import { expect, test } from "@playwright/test";
import { LANDING, PRICING, PRIVACY, TERMS } from "./helpers";

test.describe("Landing navbar and locale", () => {
  test("home does not hydrate-mismatch or CORS-fetch API logos", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(LANDING, { waitUntil: "networkidle" });
    await page.locator("#clients").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    expect(errors.filter((text) => /418|Hydration failed|Access-Control-Allow-Origin|GSAP target\s+not found/i.test(text))).toEqual([]);
  });

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

  test("defaults to Arabic on a first visit", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("hoc-locale");
      } catch {
        /* private mode */
      }
      document.cookie = "hoc-locale=;path=/;max-age=0";
    });
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "ar");
    await expect(html).toHaveAttribute("dir", "rtl");
    await expect(html).not.toHaveAttribute("data-i18n-pending", "1");
    await expect(html).toHaveCSS("direction", "rtl");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("link", { name: "الرئيسية" }).first()).toBeVisible();
    await expect(page.locator("#top h1.hero-title")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: /نُهندس|العلامات/ })).toBeVisible();
  });

  test("restores English with matching LTR before showing copy", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("hoc-locale", "en");
      } catch {
        /* private mode */
      }
      document.cookie = "hoc-locale=en;path=/;max-age=31536000;samesite=lax";
    });
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "en");
    await expect(html).toHaveAttribute("dir", "ltr");
    await expect(html).toHaveCSS("direction", "ltr");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "الرئيسية" })).toHaveCount(0);
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

  test("toggles dark and light theme", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("hoc-theme", "light");
      } catch {
        /* private mode */
      }
    });
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: /Dark mode|الوضع الداكن/ }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: /Light mode|الوضع الفاتح/ }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("section anchors exist for the main journey", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    for (const id of ["top", "about", "vision", "mission", "services", "clients", "journey", "reels", "social", "projects", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator("#pricing")).toHaveCount(0);
    await expect(page.locator("#philosophy")).toHaveCount(0);
    await expect(page.locator("#case-studies")).toHaveCount(0);
  });

  test("reels come from the dashboard API or show an empty state", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#reels")).toBeVisible();
    const video = page.locator("#reels video").first();
    const empty = page.locator("#reels").getByText(/No published reels yet|لا توجد ريلز منشورة بعد/);
    await expect(video.or(empty)).toBeVisible({ timeout: 15_000 });

    if ((await page.locator("#reels video").count()) === 0) {
      await expect(empty).toBeVisible();
      return;
    }

    const videos = page.locator("#reels video");
    const count = await videos.count();
    for (let i = 0; i < count; i += 1) {
      await expect(videos.nth(i)).toHaveAttribute("src", /.+/, { timeout: 15_000 });
    }
    await expect(video).toHaveAttribute("muted", "");
    await expect(video).toHaveAttribute("autoplay", "");
    await expect(video).toHaveAttribute("playsinline", "");
    await expect(video).not.toHaveAttribute("src", /\/reels\/[^/]+\.mp4$/);
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
    expect(text).toContain("معك أ. أحمد من شركة النور");
    expect(text).toContain("حابين نشترك معكم بباقة");
    expect(text).toMatch(/رقمي: \+963/);
    expect(text).toContain("شكراً لكم");
  });

  test("privacy and terms pages are separate legal documents", async ({ page }) => {
    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "العربية" }).click();
    await page.getByRole("contentinfo").getByRole("link", { name: "سياسة الخصوصية" }).click();
    await expect(page).toHaveURL(/\/privacy\/?$/);
    await expect(page.getByRole("heading", { level: 1, name: "سياسة الخصوصية" })).toBeVisible();
    await expect(page.locator("#privacy")).toBeVisible();

    await page.getByRole("contentinfo").getByRole("link", { name: "شروط الاستخدام" }).click();
    await expect(page).toHaveURL(/\/terms\/?$/);
    await expect(page.getByRole("heading", { level: 1, name: "شروط الاستخدام" })).toBeVisible();
    await expect(page.locator("#terms")).toBeVisible();

    await page.goto(PRIVACY, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "English" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
    await page.goto(TERMS, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: "Terms of Use" })).toBeVisible();
  });
});
