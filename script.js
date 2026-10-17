// =====================================
// NEXAHUB - PROFESSIONAL DASHBOARD
// =====================================

let selectedCategory = "all";
let selectedFiles = [];

// =====================================
// WEBSITE NAVIGATION
// =====================================

function openWebsite(url) {
    if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
    }
}

function scrollToTools() {
    const tools = document.getElementById("tools");

    if (tools) {
        tools.scrollIntoView({ behavior: "smooth" });
    }
}

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// =====================================
// SIDEBAR CATEGORY FILTERS
// =====================================

const categoryKeywords = {
    developer: [
        "github", "gitlab", "bitbucket", "stackoverflow",
        "w3schools", "mdn", "geeksforgeeks", "python",
        "java", "replit", "codepen", "hackerrank",
        "leetcode", "kaggle", "programming", "coding",
        "developer", "tableau", "power bi", "datawrapper"
    ],

    productivity: [
        "gmail", "google drive", "google docs",
        "google sheets", "google slides", "google forms",
        "google calendar", "google meet", "google keep",
        "notion", "trello", "slack", "zoom",
        "microsoft teams", "dropbox", "onedrive",
        "outlook", "calculator", "grammarly", "quillbot"
    ],

    education: [
        "coursera", "edx", "khan academy", "udemy",
        "nptel", "mit opencourseware", "wikipedia",
        "britannica", "google scholar", "researchgate",
        "arxiv", "pubmed", "britannica kids",
        "philosophy", "learning", "education",
        "classroom", "tutorial", "course"
    ],

    career: [
        "indeed", "naukri", "internshala", "glassdoor",
        "linkedin", "resume", "cv builder",
        "job", "career", "interview"
    ],

    ai: [
        "chatgpt", "gemini", "artificial intelligence",
        "ai tool", "ai assistant", "ai writer",
        "image generator", "copilot"
    ]
};

function filterCategory(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".side-link").forEach(link => {
        link.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    searchTools();
}

// =====================================
// SEARCH + CATEGORY FILTER
// =====================================

function searchTools() {
    const input = document.getElementById("searchInput");
    const query = input ? input.value.toLowerCase().trim() : "";

    const cards = document.querySelectorAll(".cards .card");

    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        const matchesSearch = text.includes(query);

        const keywords = categoryKeywords[selectedCategory] || [];

        const matchesCategory =
            selectedCategory === "all" ||
            keywords.some(keyword => text.includes(keyword));

        const showCard = matchesSearch && matchesCategory;

        card.style.display = showCard ? "" : "none";

        if (showCard) {
            visibleCount++;
        }
    });

    const countElement = document.getElementById("resultsCount");

    if (countElement) {
        countElement.textContent =
            `${visibleCount} tools found`;
    }
}

// =====================================
// CALCULATOR
// Supports both calculator display IDs
// =====================================

function getCalculatorDisplay() {
    return document.getElementById("display") ||
           document.getElementById("calculatorDisplay");
}

function openCalculator() {
    const calculator = document.getElementById("calculator");

    if (calculator) {
        calculator.style.display = "block";
        calculator.scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href = "calculator.html";
    }
}

function addValue(value) {
    const display = getCalculatorDisplay();

    if (!display) return;

    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    const display = getCalculatorDisplay();

    if (display) {
        display.value = "";
    }
}

function deleteLast() {
    const display = getCalculatorDisplay();

    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

function calculatorValue(value) {
    addValue(value);
}

function clearCalculator() {
    clearDisplay();
}

function deleteCalculator() {
    deleteLast();
}

function calculateResult() {
    calculate();
}

function calculate() {
    const display = getCalculatorDisplay();

    if (!display) return;

    const expression = display.value.trim();

    if (!expression) return;

    // Permit only basic arithmetic characters
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = String(result);
    } catch {
        display.value = "Error";
    }
}

// =====================================
// GAMES, FILES AND NOTES NAVIGATION
// =====================================

function openGames() {
    const games = document.getElementById("games");

    if (games) {
        games.scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Games section is not available on this page.");
    }
}

function openFiles() {
    const files = document.getElementById("files");

    if (files) {
        files.scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Files section is not available on this page.");
    }
}

function openNotes() {
    const notes = document.getElementById("notes");

    if (notes) {
        notes.scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Notes section is not available on this page.");
    }
}

// =====================================
// FILE MANAGER
// =====================================

function showFiles() {
    const input = document.getElementById("fileInput");

    if (!input) return;

    selectedFiles = Array.from(input.files || []);

    displayFiles(selectedFiles);
}

function displayFiles(files) {
    const fileList = document.getElementById("fileList");

    if (!fileList) return;

    fileList.innerHTML = "";

    if (!files.length) {
        fileList.textContent = "No files selected.";
        return;
    }

    files.forEach(file => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";

        const details = document.createElement("div");
        const name = document.createElement("strong");
        const size = document.createElement("small");

        name.textContent = "📄 " + file.name;
        size.textContent = (file.size / 1024).toFixed(2) + " KB";

        details.append(name, document.createElement("br"), size);

        const actions = document.createElement("div");
        const downloadButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        downloadButton.textContent = "⬇️";
        downloadButton.type = "button";
        downloadButton.title = "Download file";
        downloadButton.addEventListener("click", () => {
            downloadFile(selectedFiles.indexOf(file));
        });

        deleteButton.textContent = "🗑️";
        deleteButton.type = "button";
        deleteButton.title = "Remove file";
        deleteButton.addEventListener("click", () => {
            deleteFile(selectedFiles.indexOf(file));
        });

        actions.append(downloadButton, deleteButton);
        fileItem.append(details, actions);
        fileList.appendChild(fileItem);
    });
}

function deleteFile(index) {
    if (index < 0 || index >= selectedFiles.length) return;

    selectedFiles.splice(index, 1);
    displayFiles(getFilteredFiles());
}

function downloadFile(index) {
    const file = selectedFiles[index];

    if (!file) return;

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getFilteredFiles() {
    const input = document.getElementById("fileSearch");
    const query = input ? input.value.toLowerCase().trim() : "";

    return selectedFiles.filter(file =>
        file.name.toLowerCase().includes(query)
    );
}

function filterFiles() {
    displayFiles(getFilteredFiles());
}

// =====================================
// NOTES - LOCAL STORAGE
// =====================================

function saveNotes() {
    const notes = document.getElementById("notesArea");
    const status = document.getElementById("notesStatus");

    if (!notes) return;

    localStorage.setItem("nexaHubNotes", notes.value);

    if (status) {
        status.textContent = "Notes saved successfully!";
    }
}

function clearNotes() {
    const notes = document.getElementById("notesArea");
    const status = document.getElementById("notesStatus");

    if (!notes) return;

    notes.value = "";
    localStorage.removeItem("nexaHubNotes");

    if (status) {
        status.textContent = "Notes cleared.";
    }
}

// =====================================
// INITIALIZE DASHBOARD
// =====================================

window.addEventListener("DOMContentLoaded", function () {
    const notes = document.getElementById("notesArea");

    if (notes) {
        notes.value = localStorage.getItem("nexaHubNotes") || "";
    }

    searchTools();
});
