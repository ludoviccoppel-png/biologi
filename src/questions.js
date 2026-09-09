// Loads and manages questions from JSON
const Questions = (() => {
  let all = [];
  let filtered = [];
  let used = new Set();
  let currentArea = "all";

  async function load() {
    const res = await fetch(CONFIG.questionsPath);
    all = await res.json();
    buildAreaTabs();
    filtered = [...all];
  }

  function buildAreaTabs() {
    const areas = ["all", ...new Set(all.map(q => q.area))];
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
      });
      nav.appendChild(btn);
    });
  }

  function setArea(area) {
    currentArea = area;
    filtered = area === "all" ? [...all] : all.filter(q => q.area === area);
    used.clear();
  }

  function next() {
    const pool = filtered.filter(q => !used.has(q.id));
    if (pool.length === 0) {
      // All used — reset and start over
      used.clear();
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    used.add(q.id);
    return q;
  }

  function reset() {
    used.clear();
  }

  function count() { return filtered.length; }

  return { load, next, reset, setArea, count };
})();
