import { updateDb } from "./firebase.js";
import scrape from "./scrape.js";

const shows = await scrape();
if (shows?.length) {
  // update firebase (overwrite everything)
  updateDb({ shows: shows });
}
