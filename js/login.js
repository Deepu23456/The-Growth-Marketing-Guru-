// login.js
import { auth, db } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch role from Realtime Database
        const snapshot = await get(ref(db, 'Users/' + user.uid));
        if (!snapshot.exists()) throw new Error("User data not found");

        const role = snapshot.val().role;
        if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "blogs.html";
        }

    } catch (err) {
        errorMsg.textContent = err.message;
    }
});