document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const writingsList = document.getElementById("writings-list");
    const writingContent = document.getElementById("writing-content");
    const homeSection = document.getElementById("home");
    const writingDisplay = document.getElementById("writing-display");
    const backButton = document.getElementById("back-button");

    // Dark Mode Toggle
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        writingContent.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        writingContent.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load Writings from JSON
    fetch("writings.json")
        .then(response => response.json())
        .then(writings => {
            writings.forEach(writing => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = "#";
                link.textContent = writing.title;
                link.dataset.file = writing.file;

                link.addEventListener("click", async (event) => {
                    event.preventDefault();
                    await loadWriting(writing.title, writing.file);
                });

                listItem.appendChild(link);
                writingsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading writings:", error));

    // Load Writing Content
    async function loadWriting(title, file) {
        try {
            const response = await fetch(file);
            const text = await response.text();
            writingDisplay.innerHTML = `<h2>${title}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;
            
            homeSection.classList.add("hidden");
            writingContent.classList.remove("hidden");
        } catch (error) {
            writingDisplay.innerHTML = `<p>Error loading content.</p>`;
        }
    }

    // Back to Home
    backButton.addEventListener("click", () => {
        homeSection.classList.remove("hidden");
        writingContent.classList.add("hidden");
    });
});
