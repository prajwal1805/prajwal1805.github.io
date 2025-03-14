document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load writings dynamically
    fetchWritings();
});

// Function to fetch and display writings
async function fetchWritings() {
    try {
        const response = await fetch("writings.json?t=" + new Date().getTime());
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        const contentDisplay = document.getElementById("content-display");
        const mainContent = document.getElementById("main-content");

        // Clear previous entries
        writingsList.innerHTML = "";

        // Create list of writings
        writings.forEach((writing) => {
            const listItem = document.createElement("li");
            listItem.textContent = writing.title;
            listItem.dataset.file = writing.file;

            listItem.addEventListener("click", async () => {
                const file = listItem.dataset.file;

                try {
                    const response = await fetch(file);
                    const text = await response.text();

                    // Display the writing
                    contentDisplay.innerHTML = `
                        <h2>${writing.title}</h2>
                        <p>${text.replace(/\n/g, "<br>")}</p>
                        <button class="back-btn">⬅ Back</button>
                    `;
                    contentDisplay.classList.add("show");
                    mainContent.style.display = "none"; // Hide main content

                    // Back Button Event
                    document.querySelector(".back-btn").addEventListener("click", () => {
                        contentDisplay.classList.remove("show");
                        setTimeout(() => {
                            contentDisplay.innerHTML = "";
                            mainContent.style.display = "block"; // Show main content again
                        }, 300);
                    });

                } catch (error) {
                    contentDisplay.innerHTML = `<p>Error loading content.</p>`;
                }
            });

            writingsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error loading writings:", error);
    }
}
