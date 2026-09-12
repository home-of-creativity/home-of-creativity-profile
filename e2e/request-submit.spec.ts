import { expect, test } from "@playwright/test";
import { LANDING } from "./helpers";

const API = process.env.E2E_API_URL ?? "http://127.0.0.1:8000/api";

test.describe("Website request submit", () => {
  test("client API submit appears in admin requests list", async ({ request, page }) => {
    const clientLogin = await request.post(`${API}/auth/login`, {
      data: { email: "test@example.com", password: "password" },
    });
    expect(clientLogin.ok(), await clientLogin.text()).toBeTruthy();
    const clientToken = (await clientLogin.json()).data.token as string;

    const title = `Landing E2E ${Date.now()}`;
    const submitted = await request.post(`${API}/requests`, {
      headers: { Authorization: `Bearer ${clientToken}` },
      data: {
        title,
        description: "Submitted from website-side E2E coverage.",
      },
    });
    expect(submitted.status(), await submitted.text()).toBe(201);
    const number = (await submitted.json()).data.number as string;

    const adminLogin = await request.post(`${API}/auth/login`, {
      data: { email: "admin@example.com", password: "password" },
    });
    expect(adminLogin.ok()).toBeTruthy();
    const adminToken = (await adminLogin.json()).data.token as string;

    const adminList = await request.get(`${API}/admin/requests?status=submitted`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(adminList.ok()).toBeTruthy();
    const items = (await adminList.json()).data as Array<{ number: string; title: string }>;
    expect(items.some((item) => item.number === number && item.title === title)).toBeTruthy();

    await page.goto(LANDING, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#contact")).toBeVisible();
  });
});
