// admin-protect.js
import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html"; // Not logged in
    return;
  }

  const snapshot = await get(ref(db, 'users/' + user.uid));
  if (!snapshot.exists() || snapshot.val().role !== "admin") {
    window.location.href = "blogs.html"; // Not admin
  }
});