document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    fetchWritings();
});

// Toggle Dark Mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// Fetch Writings
async function fetchWritings() {
    try {
        const response = await fetch("writings.json");
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        writingsList.innerHTML = "";

        writings.forEach(writing => {
            const listItem = document.createElement("li");
            listItem.textContent = writing.title;
            listItem.dataset.file = writing.file;

            listItem.addEventListener("click", () => loadWriting(writing));
            writingsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading writings:", error);
    }
}

// Load Writing Content
async function loadWriting(writing) {
    try {
        const response = await fetch(writing.file + "?t=" + new Date().getTime());
        const text = await response.text();
        document.getElementById("content-display").innerHTML = `<h2>${writing.title}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;
    } catch (error) {
        document.getElementById("content-display").innerHTML = "<p>Error loading content.</p>";
    }
}
