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
