import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyBFj0UrhoXhRzXb_ygFlDR_hufsiJ6Xdkw",
  authDomain: "babycatempire.firebaseapp.com",
  projectId: "babycatempire",
  storageBucket: "babycatempire.firebasestorage.app",
  messagingSenderId: "19401101304",
  appId: "1:19401101304:web:f025966ff0ceb6f59d900d",

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
