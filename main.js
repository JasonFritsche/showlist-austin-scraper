import { updateDb } from "./firebase.js";
import scrape from "./scrape.js";

const shows = await scrape();
return shows;
