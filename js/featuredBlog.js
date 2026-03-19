import { db } from './firebaseConfig.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const container = document.getElementById("featured-container");

const blogsRef = ref(db, "blogs");

onValue(blogsRef, (snapshot) => {

    container.innerHTML = "";

    if (!snapshot.exists()) {
        container.innerHTML = "<p>No featured blogs yet.</p>";
        return;
    }

    let blogs = [];

    snapshot.forEach(child => {
        blogs.push({
            id: child.key,
            ...child.val()
        });
    });

    // Sort by latest date
    blogs.sort((a, b) => b.date - a.date);

    // Take latest 3
    const latestBlogs = blogs.slice(0, 3);

    latestBlogs.forEach(blog => {

        const card = document.createElement("div");
        card.classList.add("blog-card");

        card.innerHTML = `
            <h3>${blog.title}</h3>

            <p class="blog-meta">
            By ${blog.author} | ${new Date(blog.date).toLocaleString()}
            </p>

            <p>
            ${blog.content.substring(0, 120)}
            ${blog.content.length > 120 ? "..." : ""}
            </p>

            <button class="read-more">Read More</button>
        `;

        card.querySelector(".read-more").addEventListener("click", () => {
            window.location.href = `blogPageDetail.html?blogId=${blog.id}`;
        });

        container.appendChild(card);

    });

});