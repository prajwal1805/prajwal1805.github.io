// List of your writings
const writings = [
    { 
        title: "My First Writing", 
        content: "This is the content of my first writing. It talks about..."
    },
    { 
        title: "Another Article", 
        content: "This is another article about a fascinating topic..."
    }
];

// Get the list and content display elements
const writingsList = document.getElementById("writings-list");
const contentDisplay = document.getElementById("content-display");

// Ensure the content display div exists before proceeding
if (writingsList && contentDisplay) {
    // Generate links dynamically
    writings.forEach((writing, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#" data-index="${index}">${writing.title}</a>`;
        writingsList.appendChild(listItem);
    });

    // Add event listener to display content when clicked
    writingsList.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const index = event.target.getAttribute("data-index");
            contentDisplay.innerHTML = `<h2>${writings[index].title}</h2><p>${writings[index].content}</p>`;
        }
    });
}
