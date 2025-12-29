import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_YOURS",
  authDomain: "PASTE_YOURS",
  projectId: "PASTE_YOURS",
  storageBucket: "PASTE_YOURS",
  messagingSenderId: "PASTE_YOURS",
  appId: "PASTE_YOURS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const user = Telegram.WebApp.initDataUnsafe.user;

export async function loadUser() {
  const ref = doc(db, "users", String(user.id));
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      coins: 0,
      tapPower: 1,
      pph: 0,
      referrals: 0,
      created: Date.now()
    });
  }
}

export async function saveUser(data) {
  const ref = doc(db, "users", String(user.id));
  await updateDoc(ref, data);
}
