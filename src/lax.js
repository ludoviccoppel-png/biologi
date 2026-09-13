// Läxförhör-logik
// Aktiveras när LAX_DATA för ett ämne innehåller frågor

const Lax = (() => {
  let currentTopic = null;
  let questions = [];
  let used = new Set();
  let score = 0;
  let total = 0;
  let answered = false;
  let currentQ = null;

  function init() {
    document.querySelectorAll(".lax-card").forEach(card => {
      const topic = card.dataset.topic;
      const hasQuestions = LAX_DATA[topic] && LAX_DATA[topic].length > 0;

      if (hasQuestions) {
        card.classList.add("ready");
        card.querySelector(".lax-status").textContent =
          LAX_DATA[topic].length + " frågor";
        card.addEventListener("click", () => startTopic(topic, card));
      }
      // Om inga frågor ännu — kort är inte klickbart (visas som "Kommer snart")
    });
  }

  function startTopic(topic, card) {
    document.querySelectorAll(".lax-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    currentTopic = topic;
    questions = [...LAX_DATA[topic]];
    used.clear();
    score = 0; total = 0; answered = false;

    document.getElementById("lax-area-tag").textContent =
      card.querySelector(".lax-name").textContent;
    document.getElementById("lax-panel").style.display = "";
    document.getElementById("lax-panel").scrollIntoView({ behavior: "smooth", block: "start" });

    renderScorebar();
    nextQ();
  }

  function closeLax() {
    document.getElementById("lax-panel").style.display = "none";
    document.querySelectorAll(".lax-card").forEach(c => c.classList.remove("active"));
    currentTopic = null;
  }

  function nextQ() {
    answered = false;
    const pool = questions.filter(q => !used.has(q.id));
    if (pool.length === 0) { used.clear(); }
    const refreshed = questions.filter(q => !used.has(q.id));
    currentQ = refreshed[Math.floor(Math.random() * refreshed.length)];
    used.add(currentQ.id);
    total++;

    el("lax-type-tag").textContent = typeLabel(currentQ.type);
    el("lax-q-text").textContent = currentQ.text;
    el("lax-q-body").innerHTML = "";
    el("lax-feedback").style.display = "none";

    if (currentQ.type === "mc")          renderMC();
    else if (currentQ.type === "match")  renderMatch();
    else                                 renderOpen();

    renderScorebar();
  }

  function typeLabel(t) {
    return { mc: "Flerval", match: "Para ihop", open: "Öppen fråga" }[t] || t;
  }

  // ── MC ──────────────────────────────────────────────
  function renderMC() {
    const list = document.createElement("div");
    list.className = "opts-list";
    ["A","B","C","D"].forEach(k => {
      if (!currentQ.opts?.[k]) return;
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.innerHTML = `<strong>${k}.</strong> ${currentQ.opts[k]}`;
      btn.addEventListener("click", () => checkMC(k));
      list.appendChild(btn);
    });
    el("lax-q-body").appendChild(list);
    renderActions({ type: "mc" });
  }

  function checkMC(chosen) {
    if (answered) return;
    answered = true;
    const correct = currentQ.correct;
    el("lax-q-body").querySelectorAll(".opt-btn").forEach(b => {
      b.disabled = true;
      const k = b.querySelector("strong").textContent.replace(".","").trim();
      if (k === correct) b.classList.add("correct");
      if (k === chosen && chosen !== correct) b.classList.add("wrong");
    });
    const ok = chosen === correct;
    if (ok) score++;
    addPip(ok ? "hit" : "miss");
    renderScorebar();
    if (currentQ.expl) {
      const expl = document.createElement("div");
      expl.className = "expl-box";
      expl.textContent = currentQ.expl;
      el("lax-q-body").appendChild(expl);
    }
    renderActions({ type: "mc", done: true });
  }

  // ── Match ────────────────────────────────────────────
  function renderMatch() {
    const grid = document.createElement("div");
    grid.className = "match-grid";
    const shuffled = [...currentQ.right].sort(() => Math.random() - 0.5);
    currentQ.left.forEach((l, i) => {
      const row = document.createElement("div");
      row.className = "match-row";
      row.innerHTML = `
        <div class="match-left"><strong>${i+1}.</strong> ${l}</div>
        <div class="match-arrow">→</div>
        <select class="match-select" id="lms-${i}">
          <option value="">Välj…</option>
          ${shuffled.map(r => `<option value="${r}">${r}</option>`).join("")}
        </select>`;
      grid.appendChild(row);
    });
    el("lax-q-body").appendChild(grid);
    renderActions({ type: "match" });
  }

  function checkMatch() {
    if (answered) return;
    answered = true;
    let correct = 0;
    currentQ.left.forEach((l, i) => {
      const sel = document.getElementById("lms-" + i);
      sel.disabled = true;
      if (sel.value === currentQ.answers[i]) {
        sel.classList.add("correct"); correct++;
      } else {
        sel.classList.add("wrong");
        Array.from(sel.options).forEach(opt => {
          if (opt.value === currentQ.answers[i]) opt.textContent += " ✓";
        });
      }
    });
    const all = currentQ.left.length;
    if (correct === all) score++;
    addPip(correct === all ? "hit" : correct > 0 ? "part" : "miss");
    renderScorebar();
    if (currentQ.expl) {
      const expl = document.createElement("div");
      expl.className = "expl-box";
      expl.textContent = currentQ.expl;
      el("lax-q-body").appendChild(expl);
    }
    renderActions({ type: "match", done: true });
  }

  // ── Open ─────────────────────────────────────────────
  function renderOpen() {
    const ta = document.createElement("textarea");
    ta.className = "open-textarea";
    ta.id = "lax-open-ta";
    ta.placeholder = "Skriv ditt svar här…";
    ta.rows = 4;
    el("lax-q-body").appendChild(ta);
    renderActions({ type: "open" });
  }

  async function checkOpen() {
    const ta = el("lax-open-ta");
    const input = ta?.value.trim();
    if (!input || answered) return;
    answered = true;
    ta.disabled = true;

    const btn = el("lax-check-btn");
    if (btn) { btn.disabled = true; btn.textContent = "Bedömer…"; }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          messages: [{
            role: "user",
            content: `Du är en biologilärare. Bedöm elevens svar med poäng 0-3.
Fråga: ${currentQ.text}
Nyckelbegrepp: ${currentQ.modelAnswer || ""}
Elevens svar: ${input}

Svara EXAKT:
POÄNG: [0, 1, 2 eller 3]
ÅTERKOPPLING: [2-4 meningar på svenska]`
          }]
        })
      });
      const data = await res.json();
      const text = data.content.map(c => c.text || "").join("");
      const ptMatch = text.match(/POÄNG:\s*([0-3])/);
      const pts = ptMatch ? parseInt(ptMatch[1]) : 0;
      const fbText = text.replace(/POÄNG:[^\n]*\n?/, "").replace("ÅTERKOPPLING:", "").trim();

      score += pts >= 2 ? 1 : 0;
      addPip(pts >= 2 ? "hit" : pts === 1 ? "part" : "miss");
      renderScorebar();

      const gradeClass = pts === 3 ? "good" : pts >= 1 ? "part" : "poor";
      const stars = ["☆☆☆","★☆☆","★★☆","★★★"][pts];
      const fb = el("lax-feedback");
      fb.className = "feedback-box " + gradeClass;
      fb.innerHTML = `<div class="grade-badge"><span class="grade-stars">${stars}</span><span>${pts} poäng</span></div>${fbText}`;
      fb.style.display = "";
    } catch(e) {
      const fb = el("lax-feedback");
      fb.className = "feedback-box poor";
      fb.textContent = "Kunde inte bedöma: " + e.message;
      fb.style.display = "";
    }
    renderActions({ type: "open", done: true });
  }

  // ── Actions ──────────────────────────────────────────
  function renderActions({ type, done = false }) {
    const wrap = el("lax-actions");
    wrap.innerHTML = "";
    if (!done) {
      if (type === "match") {
        wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkMatch));
      } else if (type === "open") {
        const b = mkBtn("Bedöm mitt svar", "btn-primary", checkOpen);
        b.id = "lax-check-btn";
        wrap.appendChild(b);
      }
    } else {
      wrap.appendChild(mkBtn("Nästa fråga →", "btn-primary", nextQ));
    }
  }

  // ── Scorebar ─────────────────────────────────────────
  let pipData = [];
  function addPip(state) { pipData.push(state); renderPips(); }
  function renderPips() {
    el("lax-pips").innerHTML = pipData.map(p => `<div class="pip ${p}"></div>`).join("");
  }
  function renderScorebar() {
    el("lax-q-num").textContent = total;
    el("lax-score").textContent = score;
    el("lax-max").textContent = total;
  }

  // ── Helpers ──────────────────────────────────────────
  function mkBtn(label, cls, fn) {
    const btn = document.createElement("button");
    btn.className = cls; btn.textContent = label;
    btn.addEventListener("click", fn);
    return btn;
  }
  function el(id) { return document.getElementById(id); }

  return { init };
})();

// Exposed globally for onclick in HTML
function closeLax() {
  if (Lax.init) {
    document.getElementById("lax-panel").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => Lax.init());
