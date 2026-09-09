// ── State ────────────────────────────────────────────
let score = 0;
let total = 0;
let maxScore = 0;
let pipData = [];
let answered = false;
let currentQ = null;
let chatHistory = [];

// ── Boot ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([Questions.load(), Facit.load()]);

  document.getElementById("start-btn").addEventListener("click", startSession);
  document.getElementById("restart-btn").addEventListener("click", restart);
  document.getElementById("chat-send").addEventListener("click", sendChat);
  document.getElementById("chat-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
  });
});

// ── Session control ───────────────────────────────────
function startSession() {
  document.getElementById("start-screen").style.display = "none";
  score = 0; total = 0; maxScore = 0; pipData = [];
  renderScorebar();
  document.getElementById("scorebar").style.display = "";
  document.getElementById("q-card").style.display = "";
  nextQuestion();
}

function restart() {
  Questions.reset();
  score = 0; total = 0; maxScore = 0; pipData = [];
  answered = false;
  renderScorebar();
  nextQuestion();
}

// ── Question flow ─────────────────────────────────────
function nextQuestion() {
  answered = false;
  chatHistory = [];
  currentQ = Questions.next();

  // Reset UI
  hide("feedback-box");
  hide("hint-box");
  hide("chat-section");
  document.getElementById("chat-log").innerHTML = "";

  // Meta tags
  el("q-type-tag").textContent = typeLabel(currentQ.type);
  el("q-source").textContent = currentQ.source || "";
  el("q-area-tag").textContent = currentQ.area || "";

  // Image
  if (currentQ.image) {
    el("q-image").src = CONFIG.imagesPath + currentQ.image;
    el("q-image").alt = currentQ.area || "Provbild";
    show("q-image-wrap");
  } else {
    hide("q-image-wrap");
  }

  el("q-text").textContent = currentQ.text;

  // Render body by type
  const body = el("q-body");
  body.innerHTML = "";

  if (currentQ.type === "mc")    renderMC(body);
  else if (currentQ.type === "match") renderMatch(body);
  else                           renderOpen(body);
}

function typeLabel(type) {
  return type === "mc" ? "Flerval" : type === "match" ? "Para ihop" : "Öppen fråga";
}

// ── MC ────────────────────────────────────────────────
function renderMC(body) {
  const list = document.createElement("div");
  list.className = "opts-list";
  ["A","B","C","D"].forEach(k => {
    if (!currentQ.opts[k]) return;
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.innerHTML = `<strong>${k}.</strong> ${currentQ.opts[k]}`;
    btn.addEventListener("click", () => checkMC(k, btn));
    list.appendChild(btn);
  });
  body.appendChild(list);
  renderActions({ type: "mc" });
}

function checkMC(chosen, btn) {
  if (answered) return;
  answered = true;
  total++;
  const correct = currentQ.correct;
  const isCorrect = chosen === correct;

  el("q-card").querySelectorAll(".opt-btn").forEach(b => {
    b.disabled = true;
    const k = b.querySelector("strong").textContent.replace(".","").trim();
    if (k === correct) b.classList.add("correct");
    if (k === chosen && !isCorrect) b.classList.add("wrong");
  });

  const pts = isCorrect ? 1 : 0;
  score += pts;
  maxScore += 1;
  addPip(isCorrect ? "hit" : "miss");
  renderScorebar();

  // Show explanation + facit criteria
  const facit = Facit.get(currentQ.facit_id);
  const expl = document.createElement("div");
  expl.className = "expl-box";
  expl.innerHTML = currentQ.expl + Facit.buildCriteriaHTML(currentQ.facit_id);
  el("q-body").appendChild(expl);

  renderActions({ type: "mc", done: true });
}

// ── Match ─────────────────────────────────────────────
function renderMatch(body) {
  const grid = document.createElement("div");
  grid.className = "match-grid";
  const shuffled = [...currentQ.right].sort(() => Math.random() - 0.5);

  currentQ.left.forEach((l, i) => {
    const row = document.createElement("div");
    row.className = "match-row";
    row.innerHTML = `
      <div class="match-left"><strong>${i+1}.</strong> ${l}</div>
      <div class="match-arrow">→</div>
      <select class="match-select" id="ms-${i}">
        <option value="">Välj…</option>
        ${shuffled.map(r => `<option value="${r}">${r}</option>`).join("")}
      </select>`;
    grid.appendChild(row);
  });

  body.appendChild(grid);
  renderActions({ type: "match" });
}

function checkMatch() {
  if (answered) return;
  answered = true;
  total++;
  let correct = 0;

  currentQ.left.forEach((l, i) => {
    const sel = document.getElementById("ms-" + i);
    sel.disabled = true;
    if (sel.value === currentQ.answers[i]) {
      sel.classList.add("correct");
      correct++;
    } else {
      sel.classList.add("wrong");
      // Mark the correct option
      Array.from(sel.options).forEach(opt => {
        if (opt.value === currentQ.answers[i]) opt.textContent += " ✓";
      });
    }
  });

  const all = currentQ.left.length;
  const pts = correct === all ? 1 : correct > 0 ? 0.5 : 0;
  score += pts;
  maxScore += 1;
  addPip(correct === all ? "hit" : correct > 0 ? "part" : "miss");
  renderScorebar();

  const expl = document.createElement("div");
  expl.className = "expl-box";
  expl.innerHTML = currentQ.expl + Facit.buildCriteriaHTML(currentQ.facit_id);
  el("q-body").appendChild(expl);

  renderActions({ type: "match", done: true });
}

// ── Open ──────────────────────────────────────────────
function renderOpen(body) {
  const ta = document.createElement("textarea");
  ta.className = "open-textarea";
  ta.id = "open-ta";
  ta.placeholder = "Skriv ditt svar här…";
  ta.rows = 5;
  body.appendChild(ta);
  renderActions({ type: "open" });
}

async function checkOpen() {
  const ta = el("open-ta");
  const input = ta.value.trim();
  if (!input || answered) return;

  answered = true;
  ta.disabled = true;
  total++;
  maxScore += 3;

  setLoading(true, "Bedömer ditt svar…");

  try {
    const facit = Facit.get(currentQ.facit_id);
    const text = await API.gradeOpen(currentQ, input, facit?.criteria);

    const ptMatch = text.match(/POÄNG:\s*([0-3])/);
    const pts = ptMatch ? parseInt(ptMatch[1]) : 0;
    const fbText = text.replace(/POÄNG:[^\n]*\n?/, "").replace("ÅTERKOPPLING:", "").trim();

    score += pts;
    addPip(pts >= 2 ? "hit" : pts === 1 ? "part" : "miss");
    renderScorebar();

    const gradeClass = pts === 3 ? "good" : pts >= 1 ? "part" : "poor";
    const stars = ["☆☆☆","★☆☆","★★☆","★★★"][pts];
    const gradeLabel = ["0 poäng – Behöver förbättras","1 poäng – Grundläggande","2 poäng – Bra","3 poäng – Utmärkt"][pts];

    const fb = el("feedback-box");
    fb.className = "feedback-box " + gradeClass;
    fb.innerHTML = `
      <div class="grade-badge">
        <span class="grade-stars">${stars}</span>
        <span>${gradeLabel}</span>
      </div>
      <div>${fbText}</div>
      ${Facit.buildCriteriaHTML(currentQ.facit_id)}`;
    show("feedback-box");

    chatHistory = [
      { role: "user", content: `Fråga: ${currentQ.text}\nMitt svar: ${input}` },
      { role: "assistant", content: fbText },
    ];
    show("chat-section");

  } catch(e) {
    const fb = el("feedback-box");
    fb.className = "feedback-box poor";
    fb.textContent = "Kunde inte bedöma: " + e.message;
    show("feedback-box");
  }

  setLoading(false);
  renderActions({ type: "open", done: true });
}

async function getHint() {
  setLoading(true, "Hämtar tips…");
  try {
    const text = await API.getHint(currentQ);
    el("hint-text").textContent = text;
    show("hint-box");
  } catch(e) {
    el("hint-text").textContent = "Kunde inte hämta tips.";
    show("hint-box");
  }
  setLoading(false);
}

function skipQuestion() {
  if (answered) return;
  answered = true;
  total++;
  if (currentQ.type === "open") maxScore += 3;
  else maxScore += 1;

  const ta = el("open-ta");
  if (ta) ta.disabled = true;

  const fb = el("feedback-box");
  fb.className = "feedback-box skip";
  fb.innerHTML = `<div class="grade-badge"><span>–</span><span>Hoppade över (0 poäng)</span></div>`;
  show("feedback-box");

  addPip("miss");
  renderScorebar();
  renderActions({ type: currentQ.type, done: true });
}

// ── Actions renderer ──────────────────────────────────
function renderActions({ type, done = false }) {
  const wrap = el("q-actions");
  wrap.innerHTML = "";

  if (!done) {
    if (type === "mc") {
      // MC: no buttons needed — clicking option triggers check
    } else if (type === "match") {
      wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkMatch));
    } else {
      wrap.appendChild(mkBtn("Bedöm mitt svar", "btn-primary", checkOpen));
      wrap.appendChild(mkBtn("💡 Tips", "btn-secondary", getHint));
      wrap.appendChild(mkBtn("Hoppa över →", "btn-skip", skipQuestion));
    }
  } else {
    wrap.appendChild(mkBtn("Nästa fråga →", "btn-primary", nextQuestion));
  }
}

function mkBtn(label, cls, fn) {
  const btn = document.createElement("button");
  btn.className = cls;
  btn.textContent = label;
  btn.addEventListener("click", fn);
  return btn;
}

// ── Chat ──────────────────────────────────────────────
async function sendChat() {
  const ta = el("chat-input");
  const msg = ta.value.trim();
  if (!msg) return;

  const send = el("chat-send");
  ta.value = "";
  ta.disabled = true;
  send.disabled = true;

  appendChatMsg(msg, "student");
  chatHistory.push({ role: "user", content: msg });

  try {
    const reply = await API.chat(chatHistory, currentQ.text);
    chatHistory.push({ role: "assistant", content: reply });
    appendChatMsg(reply, "teacher");
  } catch(e) {
    appendChatMsg("Kunde inte svara just nu.", "teacher");
  }

  ta.disabled = false;
  send.disabled = false;
  ta.focus();
}

function appendChatMsg(text, role) {
  const log = el("chat-log");
  const div = document.createElement("div");
  div.className = "chat-msg " + role;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// ── Scorebar ──────────────────────────────────────────
function renderScorebar() {
  el("q-num").textContent = total;
  el("q-score").textContent = Number.isInteger(score) ? score : score.toFixed(1);
  el("q-max").textContent = maxScore;
  el("pips").innerHTML = pipData.map(p =>
    `<div class="pip ${p}"></div>`
  ).join("");
}

function addPip(state) {
  pipData.push(state);
}

// ── Loading ───────────────────────────────────────────
function setLoading(on, text = "Laddar…") {
  if (on) {
    el("loading-text").textContent = text;
    show("loading");
  } else {
    hide("loading");
  }
}

// ── Helpers ───────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function show(id) { el(id).style.display = ""; }
function hide(id) { el(id).style.display = "none"; }
