document.addEventListener("DOMContentLoaded", () => {
    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Dark Mode
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Fetch Writings
    fetchWritings();
});

// Function to Fetch Writings
async function fetchWritings() {
    try {
        const response = await fetch("writings.json?t=" + new Date().getTime());
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        const contentDisplay = document.getElementById("content-display");
        const writingsContainer = document.getElementById("writings-list-container");
        const writingContent = document.getElementById("writing-content");
        const backButton = document.getElementById("back-button");

        // Clear existing list
        writingsList.innerHTML = "";

        // Create list items
        writings.forEach((writing) => {
            const listItem = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = writing.title;
            button.dataset.file = writing.file;

            // Click event to load content
            button.addEventListener("click", async (event) => {
                event.preventDefault();
                const file = event.target.dataset.file;

                try {
                    const response = await fetch(file);
                    const text = await response.text();
                    contentDisplay.innerHTML = `<h2>${writing.title}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;

                    // Show content section with animation
                    writingsContainer.classList.add("hidden");
                    writingContent.classList.add("show");
                } catch (error) {
                    contentDisplay.innerHTML = `<p>Error loading content.</p>`;
                }
            });

            listItem.appendChild(button);
            writingsList.appendChild(listItem);
        });

        // Back button functionality
        backButton.addEventListener("click", () => {
            writingContent.classList.remove("show");
            setTimeout(() => {
                writingsContainer.classList.remove("hidden");
            }, 300);
        });

    } catch (error) {
        console.error("Error loading writings:", error);
    }
}
