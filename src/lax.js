// Läxförhör- och provlogik
// Aktiveras när LAX_DATA för ett ämne innehåller frågor.
// Varje visad fråga får en "post" (record) som sparar svar, poäng, tips och chatt,
// så att eleven kan hoppa tillbaka till tidigare frågor via bollarna i poängraden.

const Lax = (() => {
  let questions = [];
  let used = new Set();
  let records = [];   // en post per visad fråga, i den ordning de visats
  let view = -1;      // index i records för frågan som visas just nu

  // ── Start / stäng ────────────────────────────────────
  function init() {
    document.querySelectorAll(".lax-card").forEach(card => {
      const topic = card.dataset.topic;
      const hasQuestions = LAX_DATA[topic] && LAX_DATA[topic].length > 0;
      if (hasQuestions) {
        card.classList.add("ready");
        card.querySelector(".lax-status").textContent = LAX_DATA[topic].length + " frågor";
        card.addEventListener("click", () => startTopic(topic, card));
      }
      // Utan frågor är kortet inte klickbart (visas som "Kommer snart")
    });
    buildExtras();
  }

  function startTopic(topic, card) {
    document.querySelectorAll(".lax-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    questions = [...LAX_DATA[topic]];
    used.clear();
    records = [];
    view = -1;

    el("lax-area-tag").textContent = card.querySelector(".lax-name").textContent;
    el("lax-panel").style.display = "";
    el("lax-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    newQuestion();
  }

  function close() {
    el("lax-panel").style.display = "none";
    document.querySelectorAll(".lax-card").forEach(c => c.classList.remove("active"));
    records = []; view = -1;
  }

  // ── Frågor och navigering ────────────────────────────
  function newQuestion() {
    if (questions.every(q => used.has(q.id))) used.clear();
    const pool = questions.filter(q => !used.has(q.id));
    const q = pool[Math.floor(Math.random() * pool.length)];
    used.add(q.id);
    records.push({
      q, max: maxFor(q), status: "new", pts: 0, pip: null,
      sel: [], text: "", matchVals: [], chosen: null,
      fb: null, hints: [], chat: [], busy: false
    });
    renderView(records.length - 1);
  }

  function goTo(i) {
    if (i < 0 || i >= records.length || i === view) return;
    renderView(i);
  }

  function nextQ() {
    if (view < records.length - 1) renderView(view + 1);
    else newQuestion();
  }

  // Max poäng för en fråga: eget "points"-fält i datan, annars 3 för öppna frågor och 1 för övriga
  function maxFor(q) {
    return q.points || (q.type === "open" ? 3 : 1);
  }

  function typeLabel(t) {
    return { mc: "Flerval", multi: "Kryssfråga", match: "Para ihop", open: "Öppen fråga" }[t] || t;
  }

  // ── Rendering av en fråga utifrån dess post ──────────
  function cur() { return records[view]; }

  // Sparar pågående, ej bedömt svar (text i rutan, val i rullistor) innan vyn byts
  function saveDraft() {
    const r = cur();
    if (!r || r.status === "done") return;
    const ta = el("lax-open-ta");
    if (ta && r.q.type === "open") r.text = ta.value;
    if (r.q.type === "match") {
      r.matchVals = r.q.left.map((_, i) => (el("lms-" + i) || {}).value || "");
    }
  }

  function renderView(i) {
    saveDraft();
    view = i;
    const r = cur();
    const q = r.q;

    el("lax-type-tag").textContent = typeLabel(q.type);
    el("lax-q-text").textContent = q.text;
    el("lax-q-body").innerHTML = "";

    if (q.type === "mc")         paintMC(r);
    else if (q.type === "multi") paintMulti(r);
    else if (q.type === "match") paintMatch(r);
    else                         paintOpen(r);

    if (r.status === "done" && q.expl) {
      const expl = document.createElement("div");
      expl.className = "expl-box";
      expl.textContent = q.expl;
      el("lax-q-body").appendChild(expl);
    }

    const fb = el("lax-feedback");
    if (r.fb) { fb.className = "feedback-box " + r.fb.cls; fb.innerHTML = r.fb.html; fb.style.display = ""; }
    else { fb.style.display = "none"; fb.innerHTML = ""; }

    paintHint(r);
    paintChat(r);
    paintActions(r);
    renderPips();
    renderScorebar();
  }

  // ── Kryssfråga (kryssa i ALLA rätta påståenden) ──────
  // Datafält: opts {A..E}, correct: ["B","C",...], expl (valfritt), halfCredit (valfritt)
  function paintMulti(r) {
    const done = r.status === "done";
    const right = new Set(r.q.correct);
    const list = document.createElement("div");
    list.className = "opts-list";
    Object.keys(r.q.opts).sort().forEach(k => {
      const picked = r.sel.includes(k);
      const btn = document.createElement("button");
      btn.className = "opt-btn" + (picked && !done ? " selected" : "");
      btn.dataset.key = k;
      btn.setAttribute("aria-pressed", String(picked));

      const box = document.createElement("span");
      box.className = "opt-box";
      box.textContent = picked ? "☒ " : "☐ ";
      const key = document.createElement("strong");
      key.textContent = k + ". ";
      btn.append(box, key, document.createTextNode(r.q.opts[k]));

      if (done) {
        btn.disabled = true;
        let note = "";
        if (right.has(k)) {
          btn.classList.add("correct");
          if (!picked) note = "✓ Rätt påstående – du kryssade inte i det";
        } else if (picked) {
          btn.classList.add("wrong");
          note = "✗ Fel påstående";
        }
        if (note) {
          const tag = document.createElement("span");
          tag.className = "opt-note";
          tag.textContent = note;
          btn.appendChild(tag);
        }
      } else {
        btn.addEventListener("click", () => {
          const on = !r.sel.includes(k);
          r.sel = on ? [...r.sel, k] : r.sel.filter(x => x !== k);
          btn.classList.toggle("selected", on);
          btn.setAttribute("aria-pressed", String(on));
          box.textContent = on ? "☒ " : "☐ ";
          const check = el("lax-check-btn");
          if (check) check.disabled = r.sel.length === 0;
        });
      }
      list.appendChild(btn);
    });
    el("lax-q-body").appendChild(list);
  }

  function checkMulti() {
    const r = cur();
    if (r.status === "done" || r.sel.length === 0) return;
    const right = new Set(r.q.correct);
    const keys = Object.keys(r.q.opts);
    const n = keys.length;
    const classifiedRight = keys.filter(k => r.sel.includes(k) === right.has(k)).length;

    const allRight = classifiedRight === n;
    const half = !allRight && r.q.halfCredit && classifiedRight === n - 1;
    const full = r.max;
    r.pts = allRight ? full : half ? full / 2 : 0;
    r.pip = allRight ? "hit" : classifiedRight >= n - 1 ? "part" : "miss";
    r.status = "done";
    r.fb = {
      cls: allRight ? "good" : classifiedRight >= n - 1 ? "part" : "poor",
      html: esc(allRight
        ? `Alla ${n} påståenden rätt – full poäng!`
        : half
          ? `${classifiedRight} av ${n} påståenden bedömda rätt – ett missat eller felaktigt kryss ger ${fmt(full / 2)} poäng.`
          : `${classifiedRight} av ${n} påståenden bedömda rätt. Ingen poäng den här gången.`)
    };
    r.answerText = "Eleven kryssade i: " + r.sel.slice().sort().join(", ");
    r.facitText = "Rätta påståenden: " + r.q.correct.join(", ") + ". " +
      keys.map(k => `${k}. ${r.q.opts[k]}`).join(" | ");
    renderView(view);
  }

  // ── Flerval ──────────────────────────────────────────
  function paintMC(r) {
    const done = r.status === "done";
    const list = document.createElement("div");
    list.className = "opts-list";
    ["A", "B", "C", "D"].forEach(k => {
      if (!r.q.opts?.[k]) return;
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.dataset.key = k;
      btn.innerHTML = `<strong>${k}.</strong> ${r.q.opts[k]}`;
      if (done) {
        btn.disabled = true;
        if (k === r.q.correct) btn.classList.add("correct");
        if (k === r.chosen && r.chosen !== r.q.correct) btn.classList.add("wrong");
      } else {
        btn.addEventListener("click", () => checkMC(k));
      }
      list.appendChild(btn);
    });
    el("lax-q-body").appendChild(list);
  }

  function checkMC(chosen) {
    const r = cur();
    if (r.status === "done") return;
    r.chosen = chosen;
    const ok = chosen === r.q.correct;
    r.pts = ok ? r.max : 0;
    r.pip = ok ? "hit" : "miss";
    r.status = "done";
    r.answerText = `Eleven valde ${chosen}.`;
    r.facitText = `Rätt svar: ${r.q.correct}. ` + Object.entries(r.q.opts || {}).map(([k, v]) => `${k}. ${v}`).join(" | ");
    renderView(view);
  }

  // ── Para ihop ────────────────────────────────────────
  function paintMatch(r) {
    const done = r.status === "done";
    if (!r.shuffled) r.shuffled = [...r.q.right].sort(() => Math.random() - 0.5);
    const grid = document.createElement("div");
    grid.className = "match-grid";
    r.q.left.forEach((l, i) => {
      const row = document.createElement("div");
      row.className = "match-row";
      row.innerHTML = `
        <div class="match-left"><strong>${i + 1}.</strong> ${l}</div>
        <div class="match-arrow">→</div>
        <select class="match-select" id="lms-${i}">
          <option value="">Välj…</option>
          ${r.shuffled.map(x => `<option value="${x}">${x}</option>`).join("")}
        </select>`;
      grid.appendChild(row);
    });
    el("lax-q-body").appendChild(grid);
    r.q.left.forEach((l, i) => {
      const sel = el("lms-" + i);
      sel.value = r.matchVals[i] || "";
      if (done) {
        sel.disabled = true;
        if (sel.value === r.q.answers[i]) sel.classList.add("correct");
        else {
          sel.classList.add("wrong");
          Array.from(sel.options).forEach(opt => {
            if (opt.value === r.q.answers[i]) opt.textContent += " ✓";
          });
        }
      }
    });
  }

  function checkMatch() {
    const r = cur();
    if (r.status === "done") return;
    saveDraft();
    const all = r.q.left.length;
    const correct = r.q.left.filter((_, i) => r.matchVals[i] === r.q.answers[i]).length;
    r.pts = correct === all ? r.max : 0;
    r.pip = correct === all ? "hit" : correct > 0 ? "part" : "miss";
    r.status = "done";
    r.answerText = r.q.left.map((l, i) => `${l} → ${r.matchVals[i] || "(inget svar)"}`).join("; ");
    r.facitText = r.q.left.map((l, i) => `${l} → ${r.q.answers[i]}`).join("; ");
    renderView(view);
  }

  // ── Öppen fråga ──────────────────────────────────────
  function paintOpen(r) {
    const ta = document.createElement("textarea");
    ta.className = "open-textarea";
    ta.id = "lax-open-ta";
    ta.placeholder = "Skriv ditt svar här…";
    ta.rows = 4;
    ta.value = r.text;
    ta.disabled = r.status === "done" || r.busy;
    el("lax-q-body").appendChild(ta);
  }

  async function checkOpen() {
    const r = cur();
    const ta = el("lax-open-ta");
    const input = ta?.value.trim();
    if (!input || r.status === "done" || r.busy) return;
    r.text = ta.value;
    r.busy = true;
    r.fb = null;
    renderView(view);

    const q = r.q;
    const maxQ = r.max;
    const scaleText = Array.from({ length: maxQ + 1 }, (_, i) => i).join(", ");

    try {
      const text = await ask([{
        role: "user",
        content: `Du är en biologilärare. Bedöm elevens svar med poäng 0-${maxQ} (frågan är värd högst ${maxQ} poäng).
Fråga: ${q.text}
Nyckelbegrepp / facit: ${q.modelAnswer || ""}
Elevens svar: ${input}

Svara EXAKT:
POÄNG: [ett heltal: ${scaleText}]
ÅTERKOPPLING: [2-4 meningar på svenska]`
      }], "", 600);
      const ptMatch = text.match(/POÄNG:\s*(\d+)/);
      const pts = ptMatch ? Math.min(parseInt(ptMatch[1]), maxQ) : 0;
      const fbText = text.replace(/POÄNG:[^\n]*\n?/, "").replace("ÅTERKOPPLING:", "").trim();

      r.pts = pts;
      r.pip = pts / maxQ >= 0.66 ? "hit" : pts > 0 ? "part" : "miss";
      r.status = "done";
      const stars = "★".repeat(pts) + "☆".repeat(maxQ - pts);
      r.fb = {
        cls: pts === maxQ ? "good" : pts > 0 ? "part" : "poor",
        html: `<div class="grade-badge"><span class="grade-stars">${stars}</span><span>${pts} / ${maxQ} poäng</span></div>${esc(fbText)}`
      };
      r.answerText = input;
      r.facitText = q.modelAnswer || "";
      r.gradeText = `${pts} av ${maxQ} poäng. Återkoppling som eleven fick: ${fbText}`;
    } catch (e) {
      // Lås upp så eleven kan försöka igen (svaret finns kvar i rutan)
      r.fb = { cls: "poor", html: esc("Kunde inte bedöma: " + e.message) };
    }
    r.busy = false;
    if (records[view] === r) renderView(view); else renderPips();
    renderScorebar();
  }

  // ── Hoppa över ───────────────────────────────────────
  function skip() {
    const r = cur();
    if (r.status === "done" || r.busy) return;
    saveDraft();
    r.status = "skip";
    r.pip = "skip";
    nextQ();
  }

  // ── Tips ─────────────────────────────────────────────
  function hintMaterial(r) {
    const q = r.q;
    if (q.type === "open") return `Nyckelbegrepp / facit (får inte avslöjas): ${q.modelAnswer || ""}`;
    if (q.type === "multi") {
      const opts = Object.keys(q.opts).sort().map(k => `${k}. ${q.opts[k]}`).join("\n");
      return `Påståenden:\n${opts}\nRätta påståenden (får inte avslöjas): ${q.correct.join(", ")}`;
    }
    if (q.type === "mc") {
      const opts = Object.entries(q.opts || {}).map(([k, v]) => `${k}. ${v}`).join("\n");
      return `Alternativ:\n${opts}\nRätt svar (får inte avslöjas): ${q.correct}`;
    }
    return `Ska paras ihop: ${q.left.join("; ")} med ${q.right.join("; ")}. Facit (får inte avslöjas): ${q.answers.join("; ")}`;
  }

  async function getHint(ev) {
    const r = cur();
    if (r.status === "done" || r.hintBusy) return;
    const btn = ev.currentTarget;
    r.hintBusy = true;
    btn.disabled = true;
    btn.textContent = "Hämtar…";
    const prev = r.hints.length
      ? `\n\nTidigare tips (upprepa inte, ge ett nytt tips från en annan vinkel):\n- ${r.hints.join("\n- ")}`
      : "";
    try {
      const text = await ask([{
        role: "user",
        content: `Fråga: ${r.q.text}\n${hintMaterial(r)}${prev}\n\nGe ETT kort tips (1-2 meningar) som hjälper eleven komma igång, utan att avslöja svaret eller vilka alternativ som är rätta. Skriv på svenska.`
      }], "", 300);
      r.hints.push(text.trim());
    } catch (e) {
      r.hintError = true;
    }
    r.hintBusy = false;
    if (records[view] === r) { paintHint(r); paintActions(r); }
  }

  function paintHint(r) {
    const box = el("lax-hint-box");
    const last = r.hints[r.hints.length - 1];
    if (r.hintError && !r.hintBusy) {
      el("lax-hint-text").textContent = "Kunde inte hämta tips.";
      r.hintError = false;
      box.style.display = "";
    } else if (last && r.status !== "done") {
      el("lax-hint-text").textContent = last;
      box.style.display = "";
    } else {
      box.style.display = "none";
    }
  }

  // ── Följdfrågor efter bedömning ──────────────────────
  function paintChat(r) {
    const sec = el("lax-chat-section");
    if (r.status !== "done") { sec.style.display = "none"; return; }
    sec.style.display = "";
    const log = el("lax-chat-log");
    log.innerHTML = "";
    r.chat.forEach(m => appendChatMsg(m.content, m.role === "user" ? "student" : "teacher"));
    el("lax-chat-input").value = r.chatDraft || "";
    setChatBusy(!!r.chatBusy);
  }

  function setChatBusy(b) {
    el("lax-chat-input").disabled = b;
    el("lax-chat-send").disabled = b;
  }

  function appendChatMsg(text, role) {
    const div = document.createElement("div");
    div.className = "chat-msg " + role;
    div.textContent = text;
    el("lax-chat-log").appendChild(div);
    el("lax-chat-log").scrollTop = el("lax-chat-log").scrollHeight;
  }

  async function sendChat() {
    const r = cur();
    const ta = el("lax-chat-input");
    const msg = ta.value.trim();
    if (!msg || r.status !== "done" || r.chatBusy) return;
    ta.value = ""; r.chatDraft = "";
    r.chat.push({ role: "user", content: msg });
    r.chatBusy = true;
    appendChatMsg(msg, "student");
    setChatBusy(true);

    const system =
      `Du är en biologilärare i Sverige som just har bedömt en elevs svar. Frågan var: "${r.q.text}". ` +
      `${r.answerText ? "Elevens svar: " + r.answerText + ". " : ""}` +
      `${r.facitText ? "Facit: " + r.facitText + ". " : ""}` +
      `${r.gradeText ? "Bedömning: " + r.gradeText + " " : ""}` +
      `Svara pedagogiskt och uppmuntrande på elevens följdfrågor. Håll svaren korta (2-4 meningar). Skriv på svenska.`;
    let ok = true;
    try {
      const reply = await ask(r.chat, system, 500);
      r.chat.push({ role: "assistant", content: reply });
    } catch (e) {
      ok = false;
      r.chat.pop(); // behåll växlande user/assistant i historiken
    }
    r.chatBusy = false;
    if (records[view] === r) {
      if (ok) appendChatMsg(r.chat[r.chat.length - 1].content, "teacher");
      else appendChatMsg("Kunde inte svara just nu. Försök igen.", "teacher");
      setChatBusy(false);
      el("lax-chat-input").focus();
    }
  }

  // ── API ──────────────────────────────────────────────
  async function ask(messages, system, maxTokens) {
    const body = { model: "claude-haiku-4-5-20251001", max_tokens: maxTokens, messages };
    if (system) body.system = system;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !Array.isArray(data.content)) {
      const apiMsg = typeof data.error === "string" ? data.error : data.error?.message;
      throw new Error(`Servern svarade ${res.status}${apiMsg ? ": " + apiMsg : ""}`);
    }
    return data.content.map(c => c.text || "").join("");
  }

  // ── Knappar ──────────────────────────────────────────
  function paintActions(r) {
    const wrap = el("lax-actions");
    wrap.innerHTML = "";
    const type = r.q.type;
    if (r.status !== "done") {
      if (type === "match") {
        wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkMatch));
      } else if (type === "multi") {
        const b = mkBtn("Kontrollera svar", "btn-primary", checkMulti);
        b.id = "lax-check-btn";
        b.disabled = r.sel.length === 0;
        wrap.appendChild(b);
      } else if (type === "open") {
        const b = mkBtn(r.busy ? "Bedömer…" : "Bedöm mitt svar", "btn-primary", checkOpen);
        b.id = "lax-check-btn";
        b.disabled = r.busy;
        wrap.appendChild(b);
      }
      const h = mkBtn(r.hintBusy ? "Hämtar…" : r.hints.length ? "💡 Nytt tips" : "💡 Tips", "btn-secondary", getHint);
      h.disabled = r.busy || !!r.hintBusy;
      wrap.appendChild(h);
      const s = mkBtn("Hoppa över →", "btn-skip", skip);
      s.disabled = r.busy;
      wrap.appendChild(s);
    } else {
      wrap.appendChild(mkBtn("Nästa fråga →", "btn-primary", nextQ));
    }
  }

  // ── Poängrad ─────────────────────────────────────────
  function renderPips() {
    const box = el("lax-pips");
    box.innerHTML = "";
    records.forEach((r, i) => {
      const p = document.createElement("button");
      p.type = "button";
      p.className = "pip" + (r.pip ? " " + r.pip : "") + (i === view ? " active" : "");
      const st = r.status === "done" ? `${fmt(r.pts)} av ${fmt(r.max)} p` : r.status === "skip" ? "hoppade över" : "ej besvarad";
      p.title = `Fråga ${i + 1} – ${st}`;
      p.setAttribute("aria-label", p.title);
      p.addEventListener("click", () => goTo(i));
      box.appendChild(p);
    });
  }

  function renderScorebar() {
    let score = 0, maxPoints = 0;
    records.forEach(r => {
      if (r.status === "done") { score += r.pts; maxPoints += r.max; }
      else if (r.status === "skip") { maxPoints += r.max; }
    });
    el("lax-q-num").textContent = view + 1;
    el("lax-score").textContent = fmt(score);
    el("lax-max").textContent = fmt(maxPoints);
  }

  // ── Extra element (tips-ruta och chatt) ──────────────
  function buildExtras() {
    const card = el("lax-q-card");
    if (!card || el("lax-hint-box")) return;

    const hint = document.createElement("div");
    hint.className = "hint-box";
    hint.id = "lax-hint-box";
    hint.style.display = "none";
    hint.innerHTML = `<span class="hint-label">💡 Tips</span><p id="lax-hint-text"></p>`;
    card.insertBefore(hint, el("lax-feedback"));

    const chat = document.createElement("div");
    chat.className = "chat-section";
    chat.id = "lax-chat-section";
    chat.style.display = "none";
    chat.innerHTML = `
      <div class="chat-label">Ställ en följdfråga</div>
      <div class="chat-log" id="lax-chat-log"></div>
      <div class="chat-row">
        <textarea id="lax-chat-input" placeholder="Skriv din fråga…" rows="2"></textarea>
        <button class="btn-send" id="lax-chat-send" type="button">Skicka</button>
      </div>`;
    card.insertBefore(chat, el("lax-actions"));

    el("lax-chat-send").addEventListener("click", sendChat);
    el("lax-chat-input").addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
    });
    el("lax-chat-input").addEventListener("input", e => { if (cur()) cur().chatDraft = e.target.value; });
  }

  // ── Hjälpfunktioner ──────────────────────────────────
  function mkBtn(label, cls, fn) {
    const btn = document.createElement("button");
    btn.className = cls; btn.textContent = label;
    btn.addEventListener("click", fn);
    return btn;
  }
  function el(id) { return document.getElementById(id); }
  function fmt(n) { return String(n).replace(".", ","); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return { init, close };
})();

// Används av onclick i HTML
function closeLax() { Lax.close(); }

document.addEventListener("DOMContentLoaded", () => Lax.init());
