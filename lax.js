// Läxförhör-logik
// Aktiveras när LAX_DATA för ett ämne innehåller frågor

const Lax = (() => {
  let currentTopic = null;
  let questions = [];
  let used = new Set();
  let score = 0;
  let total = 0;
  let maxPoints = 0;
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
    score = 0; total = 0; maxPoints = 0; answered = false;

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
    maxPoints += maxFor(currentQ);

    el("lax-type-tag").textContent = typeLabel(currentQ.type);
    el("lax-q-text").textContent = currentQ.text;
    el("lax-q-body").innerHTML = "";
    el("lax-feedback").style.display = "none";

    if (currentQ.type === "mc")          renderMC();
    else if (currentQ.type === "multi")  renderMulti();
    else if (currentQ.type === "match")  renderMatch();
    else                                 renderOpen();

    renderScorebar();
  }

  // Max poäng för en fråga: eget "points"-fält i datan, annars 3 för öppna frågor och 1 för övriga
  function maxFor(q) {
    return q.points || (q.type === "open" ? 3 : 1);
  }

  function typeLabel(t) {
    return { mc: "Flerval", multi: "Kryssfråga", match: "Para ihop", open: "Öppen fråga" }[t] || t;
  }

  // ── Multi (kryssfråga: kryssa i ALLA rätta påståenden) ───────────────
  // Datafält: opts {A..E: påstående}, correct: ["B","C",...], expl: "Varför…" (valfritt)
  // Poäng: full poäng (1 p, eller eget "points") bara om alla påståenden bedömts rätt.
  let multiSel = new Set();

  function renderMulti() {
    multiSel = new Set();
    const list = document.createElement("div");
    list.className = "opts-list";
    Object.keys(currentQ.opts).sort().forEach(k => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.dataset.key = k;
      btn.setAttribute("aria-pressed", "false");

      const box = document.createElement("span");
      box.className = "opt-box";
      box.textContent = "☐ ";
      const key = document.createElement("strong");
      key.textContent = k + ". ";
      btn.append(box, key, document.createTextNode(currentQ.opts[k]));

      btn.addEventListener("click", () => {
        if (answered) return;
        const on = !multiSel.has(k);
        if (on) multiSel.add(k); else multiSel.delete(k);
        btn.classList.toggle("selected", on);
        btn.setAttribute("aria-pressed", String(on));
        box.textContent = on ? "☒ " : "☐ ";
        const check = el("lax-check-btn");
        if (check) check.disabled = multiSel.size === 0;
      });
      list.appendChild(btn);
    });
    el("lax-q-body").appendChild(list);
    renderActions({ type: "multi" });
  }

  function checkMulti() {
    if (answered || multiSel.size === 0) return;
    answered = true;
    const right = new Set(currentQ.correct);
    const buttons = el("lax-q-body").querySelectorAll(".opt-btn");
    let classifiedRight = 0;

    buttons.forEach(b => {
      b.disabled = true;
      const k = b.dataset.key;
      const picked = multiSel.has(k);
      const isRight = right.has(k);
      if (picked === isRight) classifiedRight++;

      let note = "";
      if (isRight) {
        b.classList.add("correct");
        if (!picked) note = "✓ Rätt påstående – du kryssade inte i det";
      } else if (picked) {
        b.classList.add("wrong");
        note = "✗ Fel påstående";
      }
      if (note) {
        const tag = document.createElement("span");
        tag.className = "opt-note";
        tag.textContent = note;
        b.appendChild(tag);
      }
    });

    const n = buttons.length;
    const allRight = classifiedRight === n;
    if (allRight) score += maxFor(currentQ);
    addPip(allRight ? "hit" : classifiedRight >= n - 1 ? "part" : "miss");
    renderScorebar();

    const fb = el("lax-feedback");
    fb.className = "feedback-box " + (allRight ? "good" : classifiedRight >= n - 1 ? "part" : "poor");
    fb.textContent = allRight
      ? `Alla ${n} påståenden rätt – full poäng!`
      : `${classifiedRight} av ${n} påståenden bedömda rätt. Ingen poäng den här gången.`;
    fb.style.display = "";

    if (currentQ.expl) {
      const expl = document.createElement("div");
      expl.className = "expl-box";
      expl.textContent = currentQ.expl;
      el("lax-q-body").appendChild(expl);
    }
    renderActions({ type: "multi", done: true });
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

    const maxQ = maxFor(currentQ);
    const scaleText = Array.from({ length: maxQ + 1 }, (_, i) => i).join(", ");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          messages: [{
            role: "user",
            content: `Du är en biologilärare. Bedöm elevens svar med poäng 0-${maxQ} (frågan är värd högst ${maxQ} poäng).
Fråga: ${currentQ.text}
Nyckelbegrepp / facit: ${currentQ.modelAnswer || ""}
Elevens svar: ${input}

Svara EXAKT:
POÄNG: [ett heltal: ${scaleText}]
ÅTERKOPPLING: [2-4 meningar på svenska]`
          }]
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !Array.isArray(data.content)) {
        const apiMsg = typeof data.error === "string" ? data.error : data.error?.message;
        throw new Error(`Servern svarade ${res.status}${apiMsg ? ": " + apiMsg : ""}`);
      }
      const text = data.content.map(c => c.text || "").join("");
      const ptMatch = text.match(/POÄNG:\s*(\d+)/);
      const pts = ptMatch ? Math.min(parseInt(ptMatch[1]), maxQ) : 0;
      const fbText = text.replace(/POÄNG:[^\n]*\n?/, "").replace("ÅTERKOPPLING:", "").trim();

      const ratio = pts / maxQ;
      score += pts;
      addPip(ratio >= 0.66 ? "hit" : pts > 0 ? "part" : "miss");
      renderScorebar();

      const gradeClass = pts === maxQ ? "good" : pts > 0 ? "part" : "poor";
      const stars = "★".repeat(pts) + "☆".repeat(maxQ - pts);
      const fb = el("lax-feedback");
      fb.className = "feedback-box " + gradeClass;
      fb.innerHTML = `<div class="grade-badge"><span class="grade-stars">${stars}</span><span>${pts} / ${maxQ} poäng</span></div>${fbText}`;
      fb.style.display = "";
    } catch(e) {
      const fb = el("lax-feedback");
      fb.className = "feedback-box poor";
      fb.textContent = "Kunde inte bedöma: " + e.message;
      fb.style.display = "";
      // Lås upp så eleven kan försöka igen (svaret finns kvar i rutan)
      answered = false;
      ta.disabled = false;
      renderActions({ type: "open" });
      return;
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
      } else if (type === "multi") {
        const b = mkBtn("Kontrollera svar", "btn-primary", checkMulti);
        b.id = "lax-check-btn";
        b.disabled = true; // aktiveras när minst ett påstående är ikryssat
        wrap.appendChild(b);
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
    el("lax-max").textContent = maxPoints;
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
