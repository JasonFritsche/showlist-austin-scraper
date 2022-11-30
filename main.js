const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("https://austin.showlists.net/");
  var element = await page.waitForSelector(
    ".entry-content > div:nth-child(1) > a"
  );
  const text = await page.evaluate((element) => element.textContent, element);
  console.log(text);
  await browser.close();
}
scrape();
