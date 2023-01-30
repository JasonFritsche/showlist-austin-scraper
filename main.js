import puppeteer from "puppeteer";
const fs = require("fs");
const path = require("path");

const pathToData = path.join(__dirname, "showdata.json");

let data = null;

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
  data = allShowData;
  // return allShowData;
}

// execute and persist data
scrape() // no top level await... yet
  .then(() => {
    // persist data
    fs.writeFileSync(path.resolve(pathToData), JSON.stringify(data, null, 2));
  });
