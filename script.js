function scrollToTools() {
  document.getElementById("tools")?.scrollIntoView({
    behavior: "smooth"
  });
}

function openWebsite(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function searchTools() {
  const input = document.getElementById("searchInput");
  const query = input.value.toLowerCase().trim();

  document.querySelectorAll(".card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "" : "none";
  });
}

// Sidebar menu highlight
document.querySelectorAll(".sidebar-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".sidebar-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
let activeCategory = "All";

function filterCategory(category) {
  activeCategory = category;
  applyToolFilters();

  document.getElementById("tools")?.scrollIntoView({
    behavior: "smooth"
  });
}
document.querySelectorAll(".sidebar-link").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".sidebar-link").forEach(item => {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});
function applyToolFilters() {
  const input = document.getElementById("searchInput");
  const query = input ? input.value.toLowerCase().trim() : "";

  document.querySelectorAll(".cards .card").forEach(card => {
    const category = card.dataset.category || "All";
   const favorites = JSON.parse(
  localStorage.getItem("nexahubFavorites") || "[]"
);

const name = card.querySelector("h3")?.innerText.trim() || "";

const categoryMatch =
  activeCategory === "All" ||
  (activeCategory === "Favorites"
    ? favorites.includes(name)
    : category === activeCategory);
    const searchMatch = card.innerText.toLowerCase().includes(query);

    card.style.display =
      categoryMatch && searchMatch ? "" : "none";
  });
}

function searchTools() {
  applyToolFilters();
}
<button class="favorite-btn"
  onclick="toggleFavorite(event, this)"
  aria-label="Add YouTube to favorites">☆</button>
document.querySelectorAll(".cards .card").forEach(card => {
  if (card.querySelector(".favorite-btn")) return;

  const button = document.createElement("button");
  button.className = "favorite-btn";

  const name = card.querySelector("h3")?.innerText.trim() || "";
  const favorites = JSON.parse(
    localStorage.getItem("nexahubFavorites") || "[]"
  );

  button.textContent = favorites.includes(name) ? "⭐" : "☆";
  button.setAttribute("aria-label", "Toggle favorite");

  button.addEventListener("click", event => {
    toggleFavorite(event, button);
  });

  card.prepend(button);
});
