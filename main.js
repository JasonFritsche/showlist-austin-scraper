import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToData = path.join(__dirname, "showdata.json");

let data = null;

async function scrape() {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();

  await page.goto("https://austin.showlists.net/");
  const allShowData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".show-date"), (e) => ({
      isodate: e.id,
      date: e.querySelector("h5.text-brand").innerText,
      shows: Array.from(e.querySelectorAll("li.showlist-item"), (el) => ({
        description: el.querySelector(".show-title")?.innerText,
        eventLink: el.querySelector(".show-title")?.href,
        venue: {
          title: el.querySelector(".venue-title")?.innerText,
          href: el.querySelector(".venue-title")?.href,
          map: el.querySelector(".maps-link")?.href,
        },
        time: el
          .querySelector(".text-gray")
          ?.innerText?.replace(/[\[\]']+/g, ""),
      })),
    }))
  );

  await browser.close();
  data = { allShowData };
}

// execute and persist data
scrape().then(() => {
  // persist data
  fs.writeFileSync(path.resolve(pathToData), JSON.stringify(data, null, 2));
});
