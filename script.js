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

function applyToolFilters() {
  const input = document.getElementById("searchInput");
  const query = input ? input.value.toLowerCase().trim() : "";

  document.querySelectorAll(".cards .card").forEach(card => {
    const category = card.dataset.category || "All";
    const categoryMatch =
      activeCategory === "All" || category === activeCategory;
    const searchMatch = card.innerText.toLowerCase().includes(query);

    card.style.display =
      categoryMatch && searchMatch ? "" : "none";
  });
}

function searchTools() {
  applyToolFilters();
}
