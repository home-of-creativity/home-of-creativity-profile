const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("console", (msg) => console.log("CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("PAGEERROR:", err.message));
  await page.goto("http://127.0.0.1:3000/home-of-creativity-profile/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const wrap = document.querySelector(".hero-brand");
    const bird = document.querySelector(".hero-brand-bird");
    const row = document.querySelector(".hero-brand-row");
    const ofEl = document.querySelector('[data-word="of"]');
    const homeEl = document.querySelector('[data-word="home"]');
    const creativityEl = document.querySelector('[data-word="creativity"]');
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    return {
      wrap: r(wrap),
      bird: r(bird),
      row: r(row),
      of: r(ofEl),
      home: r(homeEl),
      creativity: r(creativityEl),
      birdOpacity: bird ? getComputedStyle(bird).opacity : null,
      birdTransform: bird ? getComputedStyle(bird).transform : null,
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
