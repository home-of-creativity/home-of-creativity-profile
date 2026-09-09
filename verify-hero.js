const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://127.0.0.1:3000/home-of-creativity-profile/", { waitUntil: "networkidle" });
  await page.waitForTimeout(9000);
  const data = await page.evaluate(() => {
    const wrap = document.querySelector(".hero-brand");
    const bird = document.querySelector(".hero-brand-bird");
    const ofEl = document.querySelector('[data-word="of"]');
    const homeEl = document.querySelector('[data-word="home"]');
    const creativityEl = document.querySelector('[data-word="creativity"]');
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    return {
      wrap: r(wrap),
      bird: r(bird),
      of: r(ofEl),
      home: r(homeEl),
      creativity: r(creativityEl),
      birdOpacity: bird ? getComputedStyle(bird).opacity : null,
      letters: Array.from(document.querySelectorAll(".hero-letter")).map((l) => getComputedStyle(l).opacity),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await page.screenshot({ path: "hero-final.png" });
  await browser.close();
})();
