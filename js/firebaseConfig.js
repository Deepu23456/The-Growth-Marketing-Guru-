// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCR9ZzRH3-BDYBlCacdT94aAowQKB4zxrk",
  authDomain: "growthmarketingguruweb.firebaseapp.com",
  projectId: "growthmarketingguruweb",
  storageBucket: "growthmarketingguruweb.firebasestorage.app",
  messagingSenderId: "342086094402",
  appId: "1:342086094402:web:17db0c0697d040028067db",
  databaseURL: "https://growthmarketingguruweb-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);