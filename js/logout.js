// logout.js
import { auth } from './firebaseConfig.js';
import { signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth); // Logs the user out
    window.location.href = "login.html"; // Redirect to login page
  } catch (err) {
    alert("Error logging out: " + err.message);
  }
});