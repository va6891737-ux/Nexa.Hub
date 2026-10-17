"use strict";

// Current selected category
let activeCategory = "All";

// Get all tool cards
function getToolCards() {
  return document.querySelectorAll(".cards .card");
}

// Search tools and apply category filters
function searchTools() {
  applyToolFilters();
}

// Filter tools by category
function filterCategory(category) {
  activeCategory = category;

  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.classList.remove("active");
  });

  const clickedLink = event?.currentTarget;
  if (clickedLink) {
    clickedLink.classList.add("active");
  }

  applyToolFilters();

  document.getElementById("tools")?.scrollIntoView({
    behavior: "smooth"
  });
}

// Apply search and category filters together
function applyToolFilters() {
  const input = document.getElementById("searchInput");
  const query = input ? input.value.toLowerCase().trim() : "";
  const favorites = getFavorites();

  let visibleCount = 0;

  getToolCards().forEach(card => {
    const text = card.textContent.toLowerCase();
    const category = card.dataset.category || "All";
    const name = card.querySelector("h3")?.textContent.trim() || "";

    const matchesSearch = text.includes(query);

    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Favorites"
        ? favorites.includes(name)
        : category === activeCategory);

    const show = matchesSearch && matchesCategory;

    card.style.display = show ? "" : "none";

    if (show) visibleCount++;
  });

  const countElement = document.getElementById("toolCount");
  if (countElement) {
    countElement.textContent = visibleCount;
  }

  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

// Scroll to tools section
function scrollToTools() {
  document.getElementById("tools")?.scrollIntoView({
    behavior: "smooth"
  });
}

// Open a tool website in a new tab
function openWebsite(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Read saved favorites safely
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("nexahubFavorites") || "[]");
  } catch {
    return [];
  }
}

// Save or remove a favorite tool
function toggleFavorite(event, button) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const card = button.closest(".card");
  if (!card) return;

  const name = card.querySelector("h3")?.textContent.trim();
  if (!name) return;

  let favorites = getFavorites();

  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
  } else {
    favorites.push(name);
  }

  localStorage.setItem("nexahubFavorites", JSON.stringify(favorites));

  button.textContent = favorites.includes(name) ? "⭐" : "☆";
  button.setAttribute(
    "aria-label",
    favorites.includes(name) ? "Remove from favorites" : "Add to favorites"
  );

  applyToolFilters();
}

// Add favorite buttons to all tool cards
function setupFavoriteButtons() {
  getToolCards().forEach(card => {
    let button = card.querySelector(".favorite-btn");

    if (!button) {
      button = document.createElement("button");
      button.className = "favorite-btn";
      button.type = "button";
      card.prepend(button);
    }

    const name = card.querySelector("h3")?.textContent.trim() || "";
    const favorites = getFavorites();

    button.textContent = favorites.includes(name) ? "⭐" : "☆";
    button.setAttribute(
      "aria-label",
      favorites.includes(name) ? "Remove from favorites" : "Add to favorites"
    );

    button.onclick = function(event) {
      toggleFavorite(event, this);
    };
  });
}

// Highlight sidebar selection
function setupSidebar() {
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", function() {
      document.querySelectorAll(".sidebar-link").forEach(item => {
        item.classList.remove("active");
      });

      this.classList.add("active");
    });
  });
}

// Count all tools when the page loads
function updateToolCount() {
  const countElement = document.getElementById("toolCount");

  if (countElement) {
    countElement.textContent = getToolCards().length;
  }
}

// Initialize after page content is ready
document.addEventListener("DOMContentLoaded", function() {
  setupFavoriteButtons();
  setupSidebar();
  updateToolCount();
  applyToolFilters();
});
