// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Save user preference in local storage
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// Function to check and apply dark mode preference
function applyDarkModePreference() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
}

// Function to fetch writings dynamically
async function fetchWritings() {
    try {
        const response = await fetch("writings.json"); // Fetch JSON file
        const writings = await response.json();
        const writingsList = document.getElementById("writings-list");
        const contentDisplay = document.getElementById("content-display");

        // Clear previous entries
        writingsList.innerHTML = "";

        // Create list of writings
        writings.forEach((writing) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = writing.title;
            link.dataset.file = writing.file;

            // Click event to load content
            link.addEventListener("click", async (event) => {
                event.preventDefault();
                const file = event.target.dataset.file;

                try {
                    const response = await fetch(file);
                    const text = await response.text();
                    contentDisplay.innerHTML = `<h2>${writing.title}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;
                } catch (error) {
                    contentDisplay.innerHTML = `<p>Error loading content.</p>`;
                }
            });

            listItem.appendChild(link);
            writingsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error loading writings:", error);
    }
}

// Load writings when page loads
fetchWritings();
applyDarkModePreference();
