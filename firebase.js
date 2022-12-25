import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc } from "firebase/firestore";
import dotenv from "dotenv";

async function updateDb(data) {
  dotenv.config();

  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  try {
    console.log(data);
    // Get a new write batch
    const batch = writeBatch(db);

    data.shows.forEach((showDate) => {
      const ref = doc(db, "shows", showDate.date);
      batch.set(ref, showDate);
    });

    await batch.commit();
  } catch (e) {
    console.warn("Error adding document: ", e);
  }
}

export { updateDb };
