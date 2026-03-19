import { db } from './firebaseConfig.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const blogContainer = document.getElementById("blog-container");

const blogsRef = ref(db, "blogs");

onValue(blogsRef, (snapshot) => {

    blogContainer.innerHTML = "";

    if(snapshot.exists()){

        snapshot.forEach(child => {

            const blog = child.val();
            const id = child.key;

            const card = document.createElement("div");
            card.classList.add("blog-card");

            card.innerHTML = `
                <h3>${blog.title}</h3>
                <p >By ${blog.author} | ${new Date(blog.date).toLocaleString()}</p>

                <p>
                ${blog.content.substring(0,150)}
                ${blog.content.length > 150 ? "..." : ""}
                </p>

                <button class="read-more">Read More</button>
            `;

            card.querySelector(".read-more").addEventListener("click", () => {

                window.location.href = `blogPageDetail.html?blogId=${id}`;

            });

            blogContainer.appendChild(card);

        });

    } else {

        blogContainer.innerHTML = "<p>No blogs published yet.</p>";

    }

});