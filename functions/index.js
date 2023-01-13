const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.scraper = functions.pubsub
  .schedule("every 72 hours")
  .onRun(async () => {
    const shows = await scrape();
    if (shows?.length) {
      console.log(shows);
      // update firebase (overwrite everything)
      updateDb({ shows: shows });
    }
    return null;
  });
