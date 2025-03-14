document.addEventListener("DOMContentLoaded", () => {
    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Toggle dark mode
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load writings
    fetchWritings();
});

// Function to fetch and display writings list
async function fetchWritings() {
    try {
        const response = await fetch("writings.json?t=" + new Date().getTime()); // Ensure fresh fetch
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        const contentDisplay = document.getElementById("content-display");

        // Clear previous list
        writingsList.innerHTML = "";

        // Create list items
        writings.forEach((writing) => {
            const listItem = document.createElement("button");
            listItem.classList.add("writing-item");
            listItem.textContent = writing.title;
            listItem.dataset.file = writing.file;

            // Click event to load content
            listItem.addEventListener("click", async () => {
                const file = listItem.dataset.file;

                try {
                    const response = await fetch(file);
                    const text = await response.text();

                    // Hide the writings list and show content
                    writingsList.style.display = "none";
                    contentDisplay.style.display = "block";
                    contentDisplay.innerHTML = `
                        <button class="back-button">⬅ Back</button>
                        <h2>${writing.title}</h2>
                        <p>${text.replace(/\n/g, "<br>")}</p>
                    `;

                    // Add back button functionality
                    document.querySelector(".back-button").addEventListener("click", () => {
                        contentDisplay.style.display = "none";
                        writingsList.style.display = "block";
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
