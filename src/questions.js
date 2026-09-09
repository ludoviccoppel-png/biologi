// Manages questions — data inlined from questions-data.js
const Questions = (() => {
  let filtered = [];
  let used = new Set();

  function init() {
    buildAreaTabs();
    filtered = [...QUESTIONS_DATA];
  }

  function buildAreaTabs() {
    const areas = ["all", ...new Set(QUESTIONS_DATA.map(q => q.area))];
    const nav = document.getElementById("area-tabs");
    nav.innerHTML = "";
    areas.forEach(area => {
      const btn = document.createElement("button");
      btn.className = "tab" + (area === "all" ? " active" : "");
      btn.dataset.area = area;
      btn.textContent = area === "all" ? "Alla områden" : area;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        setArea(area);
        App.restart();
      });
      nav.appendChild(btn);
    });
  }

  function setArea(area) {
    filtered = area === "all" ? [...QUESTIONS_DATA] : QUESTIONS_DATA.filter(q => q.area === area);
    used.clear();
  }

  function next() {
    const pool = filtered.filter(q => !used.has(q.id));
    if (pool.length === 0) {
      used.clear();
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    used.add(q.id);
    return q;
  }

  function reset() { used.clear(); }

  return { init, next, reset, setArea };
})();
