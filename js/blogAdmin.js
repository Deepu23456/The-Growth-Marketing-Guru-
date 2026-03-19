import { db } from './firebaseConfig.js';
import { ref, push, set, onValue, remove, update, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Form & inputs
const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("blogTitle");
const authorInput = document.getElementById("blogAuthor");
const contentInput = document.getElementById("blogContent");
const blogContainer = document.getElementById("admin-blog-container");

let editId = null; // Track if editing

// Function to render blogs
function renderBlogs(snapshot) {
    blogContainer.innerHTML = ""; // Clear existing

    snapshot.forEach((child) => {
        const blog = child.val();
        const id = child.key;

        const card = document.createElement("div");
        card.classList.add("blog-card");
        card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        card.style.padding = "20px";
        card.style.borderRadius = "10px";
        card.style.marginBottom = "20px";
        card.innerHTML = `
            <h3 class="blog-title" style="text-align:center;">${blog.title}</h3>
            <p class="blog-meta" style="text-align:center;">By <span class="author">${blog.author}</span> | <span class="date">${new Date(blog.date).toLocaleString()}</span></p>
            <p class="blog-content">
                ${blog.content.substring(0, 150)}${blog.content.length > 150 ? '...' : ''}
                <button class="read-more" style="margin-left:10px;padding:4px 8px;cursor:pointer;">Read More</button>
            </p>
            <div class="blog-actions" style="display:flex;gap:10px;margin-top:10px;justify-content:center;">
                <button class="edit-btn" style="padding:5px 10px;cursor:pointer;">Edit</button>
                <button class="delete-btn" style="padding:5px 10px;cursor:pointer;">Delete</button>
            </div>
        `;

        // Read More button
        card.querySelector(".read-more").addEventListener("click", () => {
            window.location.href = `blogPageDetail.html?blogId=${id}`;
        });

        // Edit button
        card.querySelector(".edit-btn").addEventListener("click", () => {
            titleInput.value = blog.title;
            authorInput.value = blog.author;
            contentInput.value = blog.content;
            blogForm.querySelector("button").textContent = "Save Changes";
            editId = id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Delete button
        card.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this blog?")) {
                remove(ref(db, "blogs/" + id));
            }
        });

        blogContainer.appendChild(card);
    });
}

// Listen for blogs changes
const blogsRef = ref(db, "blogs");
onValue(blogsRef, (snapshot) => {
    if (snapshot.exists()) {
        renderBlogs(snapshot);
    } else {
        blogContainer.innerHTML = "<p>No blogs published yet.</p>";
    }
});

// Form submit (publish or save changes)
blogForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (editId) {
        // Editing existing blog → preserve original date
        const blogRef = ref(db, "blogs/" + editId);
        const snapshot = await get(blogRef);
        const originalDate = snapshot.exists() ? snapshot.val().date : Date.now();

        const blogData = {
            title: titleInput.value,
            author: authorInput.value,
            content: contentInput.value,
            date: originalDate
        };
        update(blogRef, blogData);
        blogForm.querySelector("button").textContent = "Publish Blog";
        editId = null;
    } else {
        // New blog → set date now
        const blogData = {
            title: titleInput.value,
            author: authorInput.value,
            content: contentInput.value,
            date: Date.now()
        };
        const newBlogRef = push(blogsRef);
        set(newBlogRef, blogData);
    }

    blogForm.reset();
});