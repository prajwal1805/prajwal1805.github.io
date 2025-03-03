// List of your writings
const writings = [
    { title: "My First Writing", link: "https://example.com/my-first-writing" },
    { title: "Another Article", link: "https://example.com/another-article" }
];

// Get the list element
const writingsList = document.getElementById("writings-list");

// Generate links dynamically
writings.forEach(writing => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="${writing.link}" target="_blank">${writing.title}</a>`;
    writingsList.appendChild(listItem);
});
