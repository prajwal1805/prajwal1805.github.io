document.addEventListener("DOMContentLoaded", () => {
    fetchWritings();
    loadTheme();

    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
});

// Load Dark Mode
function loadTheme() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// Fetch Writings
async function fetchWritings() {
    try {
        const response = await fetch("writings.json?t=" + new Date().getTime());
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        writingsList.innerHTML = "";

        writings.forEach((writing) => {
            const listItem = document.createElement("div");
            listItem.classList.add("writing-item");
            listItem.textContent = writing.title;
            listItem.dataset.file = writing.file;

            listItem.addEventListener("click", async () => {
                await openWriting(writing.title, writing.file);
            });

            writingsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error loading writings:", error);
    }
}

// Open Writing
async function openWriting(title, file) {
    try {
        const response = await fetch(file);
        const text = await response.text();
        const contentDisplay = document.getElementById("content-display");
        contentDisplay.innerHTML = `<h2>${title}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;
        contentDisplay.style.display = "block";

        gsap.fromTo(contentDisplay, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    } catch (error) {
        console.error("Error opening writing:", error);
    }
}
