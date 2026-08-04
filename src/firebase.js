// Firebase Integration Engine for PARKKAR Storage, Firestore & Authentication
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// User Live Firebase Project Configuration (paarkkar-dda3d)
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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCyzX-3OZE6ZkBv2BIZYb0ORETuK6Wz5Js",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "paarkkar-dda3d.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "paarkkar-dda3d",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "paarkkar-dda3d.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "655222593810",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:655222593810:web:4256c41ee164f048947bcb",
    measurementId: "G-SHD38D38ET"
  };
}

let app, db, storage, auth;

export function initFirebase(config = getFirebaseConfig()) {
  try {
    app = !getApps().length ? initializeApp(config) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    console.log("🔥 Firebase Initialized successfully for PARKKAR Project (paarkkar-dda3d)!");
    return { app, db, storage, auth, success: true };
  } catch (error) {
    console.warn("Firebase initialization warning (using local fallback engine):", error);
    return { success: false, error };
  }
}

// Initial setup call
initFirebase();

export { app, db, storage, auth };

// Firebase Authentication Functions
export async function firebaseSignIn(email, password) {
  try {
    if (auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase Auth Sign-in Success:", userCredential.user.email);
      return { user: userCredential.user, success: true };
    }
  } catch (err) {
    console.warn("Firebase Auth sign-in failed, using mock auth:", err.message);
    return { success: false, error: err.message };
  }
}

export async function firebaseSignUp(email, password) {
  try {
    if (auth) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase Auth Sign-up Success:", userCredential.user.email);
      return { user: userCredential.user, success: true };
    }
  } catch (err) {
    console.warn("Firebase Auth sign-up failed:", err.message);
    return { success: false, error: err.message };
  }
}

export async function firebaseSignOutUser() {
  try {
    if (auth) {
      await signOut(auth);
      console.log("Firebase Auth Signed out successfully");
      return true;
    }
  } catch (err) {
    console.warn("Firebase Auth sign-out failed:", err);
  }
  return false;
}

// Save Custom User Firebase Config from UI
export function saveCustomFirebaseConfig(configObj) {
  localStorage.setItem("parkkar_firebase_custom_config", JSON.stringify(configObj));
  initFirebase(configObj);
}

// Check Firebase Live Connection Status
export function isFirebaseConnected() {
  return !!db;
}

// Timeout helper for reliable network calls
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    )
  ]);
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
          await withTimeout(
            uploadString(imageRef, spotData.photoUrl, "data_url"),
            10000,
            "Storage upload"
          );
          uploadedPhotoUrl = await withTimeout(getDownloadURL(imageRef), 8000, "Download URL");
          console.log("Photo uploaded to Firebase Storage:", uploadedPhotoUrl);
        } catch (stErr) {
          console.warn("Firebase Storage upload skipped, keeping local photo:", stErr);
        }
      }

      // 2. Save Document to Firestore Collection "parking_spots"
      const isDataUrl = uploadedPhotoUrl && uploadedPhotoUrl.startsWith("data:image");
      const docRef = await withTimeout(
        addDoc(collection(db, "parking_spots"), {
          ...spotData,
          photoUrl: isDataUrl ? "" : uploadedPhotoUrl,
          photoPending: !!isDataUrl,
          createdAt: new Date().toISOString()
        }),
        10000,
        "Firestore write"
      );

      console.log("Spot saved to Firebase Firestore (paarkkar-dda3d) with ID:", docRef.id);
      return docRef.id;
    }
  } catch (err) {
    console.warn("Firebase Firestore write failed, using local persistent fallback:", err);
  }

  // Fallback persistent local storage
  const newSpot = { ...spotData, id: "host_sp_" + Date.now(), createdAt: new Date().toISOString() };
  try {
    const existing = JSON.parse(localStorage.getItem("parkkar_custom_spots") || "[]");
    existing.unshift(newSpot);
    localStorage.setItem("parkkar_custom_spots", JSON.stringify(existing));
  } catch (quotaErr) {
    console.warn("Local storage full, persisting listing without the photo blob:", quotaErr);
    try {
      const existing = JSON.parse(localStorage.getItem("parkkar_custom_spots") || "[]");
      existing.unshift({ ...newSpot, photoUrl: "" });
      localStorage.setItem("parkkar_custom_spots", JSON.stringify(existing.slice(0, 20)));
    } catch (finalErr) {
      console.warn("Listing kept in memory only for this session:", finalErr);
    }
  }
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
