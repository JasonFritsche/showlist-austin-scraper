const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("https://austin.showlists.net/");

  // const element = await page.waitForSelector(
  //   ".entry-content > div:nth-child(1) > a"
  // );

  // const text = await page.evaluate((element) => element.textContent, element);
  // console.log(text);
  const shows = await page.evaluate(() => {
    const showElements = document.querySelectorAll("div.showlist div");
    const showsElementsArr = Array.from(showElements);
    const showDatesArr = showsElementsArr.filter(
      (el) => el.querySelector(".text-brand")?.innerHTML
    );

    const _shows = showDatesArr.map((el) => {
      return {
        date: el.querySelector(".text-brand")?.innerHTML,
      };
    });
    return _shows;
  });

  console.log(shows);
  await browser.close();
}
scrape();
