import { db } from './firebaseConfig.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Get elements
const titleEl = document.getElementById("blogTitle");
const authorEl = document.getElementById("blogAuthor");
const dateEl = document.getElementById("blogDate");
const contentEl = document.getElementById("blogContent");
const backBtn = document.getElementById("backBtn");

// Back button
backBtn.addEventListener("click", () => window.history.back());

// Get blogId from URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("blogId");

if (!blogId) {
    titleEl.textContent = "No blog selected!";
    authorEl.textContent = "";
    dateEl.textContent = "";
    contentEl.textContent = "";
} else {
    // Fetch blog from Firebase
    get(ref(db, "blogs/" + blogId))
        .then(snapshot => {
            if (snapshot.exists()) {
                const blog = snapshot.val();
                titleEl.textContent = blog.title;
                authorEl.textContent = blog.author;
                dateEl.textContent = new Date(blog.date).toLocaleString();
                contentEl.textContent = blog.content;
            } else {
                titleEl.textContent = "Blog not found!";
                authorEl.textContent = "";
                dateEl.textContent = "";
                contentEl.textContent = "";
            }
        })
        .catch(err => {
            console.error("Error fetching blog:", err);
            titleEl.textContent = "Error loading blog!";
            authorEl.textContent = "";
            dateEl.textContent = "";
            contentEl.textContent = "";
        });
}