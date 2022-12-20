import scrape from "./scrape.js";

const shows = await scrape();
if (shows?.length) {
  console.log(shows);
  // update firebase (overwrite everything)
}
