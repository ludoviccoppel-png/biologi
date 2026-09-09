// Loads and provides access to grading criteria (facit)
const Facit = (() => {
  let data = {};

  async function load() {
    try {
      const res = await fetch(CONFIG.facitPath);
      data = await res.json();
    } catch (e) {
      console.warn("Facit could not be loaded:", e);
    }
  }

  function get(id) {
    return data[id] || null;
  }

  function buildCriteriaHTML(id) {
    const f = get(id);
    if (!f || !f.criteria) return "";
    const rows = Object.entries(f.criteria)
      .filter(([k]) => k !== "note")
      .map(([level, text]) => `<div><strong>${level}:</strong> ${text}</div>`)
      .join("");
    const note = f.criteria.note ? `<div style="opacity:.7;margin-top:6px">${f.criteria.note}</div>` : "";
    return `<div class="criteria-box">${rows}${note}</div>`;
  }

  return { load, get, buildCriteriaHTML };
})();
