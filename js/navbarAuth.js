import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const navLinks = document.querySelector(".nav-links");

onAuthStateChanged(auth, async (user) => {

    if (!navLinks) return;

    // If not logged in
    if (!user) {

        navLinks.innerHTML += `
            <li><a href="login.html">Login</a></li>
        `;

        return;
    }

    // Fetch role
    const snapshot = await get(ref(db, 'Users/' + user.uid));

    if (!snapshot.exists()) return;

    const role = snapshot.val().role;

    // Remove login if exists
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    if (loginLink) loginLink.parentElement.remove();

    // Admin
    if (role === "admin") {

        navLinks.innerHTML += `
            <li><a href="admin.html">Dashboard</a></li>
            <li id="logoutBtn">Logout</li>
        `;

    } else {

        navLinks.innerHTML += `
            <li id="logoutBtn">Logout</li>
        `;

    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", async () => {

        await auth.signOut();

        window.location.href = "index.html";

    });

});