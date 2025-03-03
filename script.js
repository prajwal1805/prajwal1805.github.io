// Function to fetch the list of writings dynamically
async function fetchWritingsList() {
    try {
        const response = await fetch('writings.json'); // Fetch the list of writings
        const writings = await response.json();

        const writingsList = document.getElementById("writings-list");
        const contentDisplay = document.getElementById("content-display");

        // Clear existing list
        writingsList.innerHTML = "";

        // Generate links dynamically
        writings.forEach((writing) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" data-file="writings/${writing.file}">${writing.title}</a>`;
            writingsList.appendChild(listItem);
        });

        // Event listener for displaying content
        writingsList.addEventListener("click", async function(event) {
            if (event.target.tagName === "A") {
                event.preventDefault();
                const filePath = event.target.getAttribute("data-file");

                try {
                    const response = await fetch(filePath);
                    const text = await response.text();
                    contentDisplay.innerHTML = `<h2>${event.target.textContent}</h2><p>${text}</p>`;
                } catch (error) {
                    contentDisplay.innerHTML = `<p>Error loading content.</p>`;
                }
            }
        });

    } catch (error) {
        console.error("Error loading writings list:", error);
    }
}

// Load the writings list when the page loads
fetchWritingsList();
