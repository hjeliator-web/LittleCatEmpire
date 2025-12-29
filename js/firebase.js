import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ---------------- FIREBASE CONFIG ---------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBFj0UrhoXhRzXb_ygFlDR_hufsiJ6Xdkw",
  authDomain: "babycatempire.firebaseapp.com",
  projectId: "babycatempire",
  storageBucket: "babycatempire.firebasestorage.app",
  messagingSenderId: "19401101304",
  appId: "1:19401101304:web:f025966ff0ceb6f59d900d"
};

/* ---------------- INIT ---------------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------------- TELEGRAM SAFE INIT ---------------- */
const tg = window.Telegram?.WebApp;
if (tg) tg.ready();

const user = tg?.initDataUnsafe?.user;

/* ---------------- LOAD USER ---------------- */
export async function loadUser() {
  if (!user) {
    console.warn("Telegram user not found");
    return null;
  }

  const ref = doc(db, "users", String(user.id));
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      coins: 0,
      tapPower: 1,
      pph: 0,
      energy: 100,
      referrals: 0,
      createdAt: Date.now()
    });
    return {
      coins: 0,
      tapPower: 1,
      pph: 0,
      energy: 100
    };
  }

  return snap.data();
}

/* ---------------- SAVE USER ---------------- */
export async function saveUser(data) {
  if (!user) return;

  const ref = doc(db, "users", String(user.id));
  await setDoc(ref, data, { merge: true });
}
