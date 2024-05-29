import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmrGxg8hVvEDsQBCEruTylXAcydED_fd4",
  authDomain: "warong-bakar-bakar.firebaseapp.com",
  databaseURL:
    "https://warong-bakar-bakar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warong-bakar-bakar",
  storageBucket: "warong-bakar-bakar.appspot.com",
  messagingSenderId: "465540071205",
  appId: "1:465540071205:web:2691cb1b2450feaf17a4cc",
  measurementId: "G-YD625H0MN5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

export const saveCartData = (userId, cartData) => {
  const cartRef = ref(database, `users/${userId}/cart`);
  return set(cartRef, cartData).catch((error) => {
    console.error("Error saving cart data:", error);
  });
};

export const getCartData = async (userId) => {
  const cartRef = ref(database, `users/${userId}/cart`);
  const snapshot = await get(cartRef);
  return snapshot.exists() ? snapshot.val() : [];
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export { auth, storage, database };
