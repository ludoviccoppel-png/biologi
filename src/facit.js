// Provides access to grading criteria — data inlined from facit-data.js
const Facit = (() => {
  function get(id) {
    return FACIT_DATA[id] || null;
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

  return { get, buildCriteriaHTML };
})();
