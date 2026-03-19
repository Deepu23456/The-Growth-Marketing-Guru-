// signup.js
import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const signupForm = document.getElementById('signupForm');
const errorMsg = document.getElementById('error-msg');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info to Realtime Database
        await set(ref(db, 'Users/' + user.uid), {
            name: name,
            email: email,
            role: "user" // default role is user
        });

        // Redirect to login
        window.location.href = "login.html";

    } catch (err) {
        errorMsg.textContent = err.message;
    }
});