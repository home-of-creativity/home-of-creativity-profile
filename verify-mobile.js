const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push("pageerror: " + err.message));
  await page.goto("http://127.0.0.1:3000/home-of-creativity-profile/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "hero-mobile-t1.png" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "hero-mobile-t2.png" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "hero-mobile-t3.png" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "hero-mobile-final.png" });

  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    return { docWidth, winWidth, hasHorizontalOverflow: docWidth > winWidth + 1 };
  });
  console.log("OVERFLOW:", JSON.stringify(overflow));
  console.log("ERRORS:", JSON.stringify(errors));
  await browser.close();
})();
