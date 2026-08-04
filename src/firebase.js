// Firebase Integration Service for Paarkkar Storage & Host Spot Uploads
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Environment variables or fallback default configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKeyForPaarkkarDemoStorage123",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "paarkkar-parking.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "paarkkar-parking",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "paarkkar-parking.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:109876543210:web:abc123def456"
};

let app, db, storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization warning (using local persistent storage fallback):", error);
}

export { app, db, storage };

// Utility function to save host space listing to Firebase / LocalStorage
export async function saveHostSpot(spotData) {
  try {
    if (db) {
      const docRef = await addDoc(collection(db, "parking_spots"), {
        ...spotData,
        createdAt: new Date().toISOString()
      });
      console.log("Spot published to Firebase Firestore with ID:", docRef.id);
      return docRef.id;
    }
  } catch (err) {
    console.warn("Firebase write failed, using local storage fallback:", err);
  }

  // Local fallback persistence
  const existing = JSON.parse(localStorage.getItem("paarkkar_custom_spots") || "[]");
  const newSpot = { ...spotData, id: "host_sp_" + Date.now(), createdAt: new Date().toISOString() };
  existing.unshift(newSpot);
  localStorage.setItem("paarkkar_custom_spots", JSON.stringify(existing));
  return newSpot.id;
}
