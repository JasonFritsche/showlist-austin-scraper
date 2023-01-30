// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();

  await page.goto("https://austin.showlists.net/");
  const allShowData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".show-date"), (e) => ({
      date: e.querySelector("h5.text-brand").innerText,
      shows: Array.from(e.querySelectorAll("li.showlist-item"), (el) => ({
        description: el.querySelector(".show-title")?.innerText,
        eventLink: el.querySelector(".show-title")?.href,
        venue: {
          title: el.querySelector(".venue-title")?.innerText,
          href: el.querySelector(".venue-title")?.href,
          map: el.querySelector(".maps-link")?.href,
        },
        time: el.querySelector(".text-gray")?.innerText,
      })),
    }))
  );

  await browser.close();
  return allShowData;
}

const shows = await scrape();

(function () {
  return shows;
})();
