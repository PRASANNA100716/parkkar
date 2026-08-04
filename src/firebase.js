// Firebase Integration Engine for PARKKAR Storage, Firestore & Authentication
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

// Retrieve custom user configuration or default project config
export function getFirebaseConfig() {
  const custom = localStorage.getItem("parkkar_firebase_custom_config");
  if (custom) {
    try {
      return JSON.parse(custom);
    } catch (e) {
      console.warn("Invalid stored Firebase config, using default.");
    }
  }

  return {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKeyForParkkarDemoStorage123",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "parkkar-parking.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "parkkar-parking",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "parkkar-parking.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:109876543210:web:abc123def456"
  };
}

let app, db, storage;

export function initFirebase(config = getFirebaseConfig()) {
  try {
    app = !getApps().length ? initializeApp(config) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("🔥 Firebase Initialized successfully for PARKKAR!");
    return { app, db, storage, success: true };
  } catch (error) {
    console.warn("Firebase initialization warning (using local fallback engine):", error);
    return { success: false, error };
  }
}

// Initial setup call
initFirebase();

export { app, db, storage };

// Save Custom User Firebase Config from UI
export function saveCustomFirebaseConfig(configObj) {
  localStorage.setItem("parkkar_firebase_custom_config", JSON.stringify(configObj));
  initFirebase(configObj);
}

// Check Firebase Live Connection Status
export function isFirebaseConnected() {
  return !!db;
}

// Save Host Space Listing to Firebase Firestore & Storage
export async function saveHostSpot(spotData) {
  try {
    if (db) {
      // 1. If photo is a base64 data URL, upload to Firebase Storage
      let uploadedPhotoUrl = spotData.photoUrl;

      if (storage && spotData.photoUrl && spotData.photoUrl.startsWith("data:image")) {
        try {
          const imageRef = ref(storage, `parking_photos/spot_${Date.now()}.jpg`);
          await uploadString(imageRef, spotData.photoUrl, "data_url");
          uploadedPhotoUrl = await getDownloadURL(imageRef);
          console.log("Photo uploaded to Firebase Storage:", uploadedPhotoUrl);
        } catch (stErr) {
          console.warn("Firebase Storage upload skipped, saving base64 string directly:", stErr);
        }
      }

      // 2. Save Document to Firestore Collection "parking_spots"
      const docRef = await addDoc(collection(db, "parking_spots"), {
        ...spotData,
        photoUrl: uploadedPhotoUrl,
        createdAt: new Date().toISOString()
      });

      console.log("Spot saved to Firebase Firestore with ID:", docRef.id);
      return docRef.id;
    }
  } catch (err) {
    console.warn("Firebase Firestore write failed, using local persistent fallback:", err);
  }

  // Fallback persistent local storage
  const existing = JSON.parse(localStorage.getItem("parkkar_custom_spots") || "[]");
  const newSpot = { ...spotData, id: "host_sp_" + Date.now(), createdAt: new Date().toISOString() };
  existing.unshift(newSpot);
  localStorage.setItem("parkkar_custom_spots", JSON.stringify(existing));
  return newSpot.id;
}

// Fetch all live host spots from Firebase Firestore
export async function fetchHostSpotsFromFirebase() {
  try {
    if (db) {
      const q = query(collection(db, "parking_spots"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const spots = [];
      snapshot.forEach(doc => {
        spots.push({ id: doc.id, ...doc.data() });
      });
      return spots;
    }
  } catch (err) {
    console.warn("Firebase fetch spots failed, loading local spots:", err);
  }

  return JSON.parse(localStorage.getItem("parkkar_custom_spots") || "[]");
}
