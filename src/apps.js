// Öppnar de interaktiva kemi-apparna (apps/*.html) i en ruta på sidan
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("app-panel");
  const frame = document.getElementById("app-frame");
  if (!panel) return;
  document.querySelectorAll(".app-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".app-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      document.getElementById("app-title").textContent = card.dataset.title;
      frame.src = card.dataset.app;
      panel.style.display = "";
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.getElementById("app-close").addEventListener("click", () => {
    panel.style.display = "none";
    frame.src = "about:blank";
    document.querySelectorAll(".app-card").forEach(c => c.classList.remove("active"));
  });
});
