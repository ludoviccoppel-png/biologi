// Läxförhör- och provlogik
// Aktiveras när LAX_DATA för ett ämne innehåller frågor.
// Varje visad fråga får en "post" (record) som sparar svar, poäng, tips och chatt,
// så att eleven kan hoppa tillbaka till tidigare frågor via bollarna i poängraden.

const Lax = (() => {
  let questions = [];
  let ordered = false; // true = frågorna kommer i den ordning de ligger i lax-data.js (data-ordered="true" på kortet)
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
    openFromUrl();
    window.addEventListener("hashchange", openFromUrl);
  }

  // Direktlänkar: https://…/#biologi8 (eller ?topic=biologi8) öppnar det kortet automatiskt
  function openFromUrl() {
    const t = (location.hash || "").replace(/^#/, "") || new URLSearchParams(location.search).get("topic");
    if (!t) return;
    const card = Array.from(document.querySelectorAll(".lax-card")).find(c => c.dataset.topic === t);
    if (card && card.classList.contains("ready")) card.click();
  }

  function startTopic(topic, card) {
    document.querySelectorAll(".lax-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    questions = [...LAX_DATA[topic]];
    ordered = card.dataset.ordered === "true";
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
  // Finns det frågor som ännu inte visats i den här omgången?
  function hasUnused() {
    return questions.some(q => !used.has(q.id));
  }

  function newQuestion() {
    // Nästa omgång börjar först när eleven själv går vidare efter att ha besvarat sista frågan
    // (inte via "Hoppa över"), och då aldrig med frågan som just visades.
    if (!hasUnused()) {
      const lastId = records.length ? records[records.length - 1].q.id : null;
      used.clear();
      if (lastId && questions.length > 1) used.add(lastId);
    }
    const pool = questions.filter(q => !used.has(q.id));
    const q = ordered ? pool[0] : pool[Math.floor(Math.random() * pool.length)];
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
    return { mc: "Flerval", multi: "Kryssfråga", shells: "Fyll skalen", molecule: "Bygg molekyl", forces: "Rita krafter", match: "Para ihop", open: "Öppen fråga" }[t] || t;
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
    else if (q.type === "shells") paintShells(r);
    else if (q.type === "molecule") paintMolecule(r);
    else if (q.type === "forces") paintForces(r);
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

  // ── Fyll skalen (klicka för att lägga elektroner i skalen K, L, M, N) ──
  // Datafält: z (atomnummer), sym, name. Rätt = elektronerna fördelade 2, 8, 8, 2 inifrån och ut.
  const SHELL_CAP = [2, 8, 8, 2];
  const SHELL_NAME = ["K", "L", "M", "N"];
  function shellsFor(z) {
    const out = [0, 0, 0, 0];
    let rem = z;
    SHELL_CAP.forEach((c, i) => { const t = Math.min(c, rem); out[i] = t; rem -= t; });
    return out;
  }

  function paintShells(r) {
    const done = r.status === "done";
    const q = r.q;
    if (!r.shell) r.shell = [0, 0, 0, 0];
    const right = shellsFor(q.z);
    const nRings = q.z > 18 ? 4 : 3;
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs, text) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text !== undefined) e.textContent = text;
      return e;
    };
    const wrap = document.createElement("div");
    wrap.className = "shells-wrap";
    const svg = mk("svg", { viewBox: "0 0 300 300", class: "shells-svg", role: "img", "aria-label": "Atom med elektronskal" });
    const cx = 150, cy = 150, radii = nRings === 4 ? [50, 80, 110, 138] : [52, 90, 126];

    radii.forEach((rad, i) => {
      const n = r.shell[i];
      const ok = done && n === right[i];
      const stroke = done ? (ok ? "#5ecfa0" : "#e85a5a") : "#3a4a78";
      const ring = mk("circle", { cx, cy, r: rad, fill: "none", stroke, "stroke-width": 1.6 });
      svg.appendChild(ring);
      for (let k = 0; k < SHELL_CAP[i]; k++) {   // tomma platser
        const a = (Math.PI * 2 * k) / SHELL_CAP[i] - Math.PI / 2;
        svg.appendChild(mk("circle", { cx: cx + rad * Math.cos(a), cy: cy + rad * Math.sin(a), r: 3, fill: "#263050" }));
      }
      for (let k = 0; k < n; k++) {               // elektroner
        const a = (Math.PI * 2 * k) / SHELL_CAP[i] - Math.PI / 2;
        svg.appendChild(mk("circle", { cx: cx + rad * Math.cos(a), cy: cy + rad * Math.sin(a), r: 6.5, fill: done ? (ok ? "#5ecfa0" : "#e85a5a") : "#5ab0e8", stroke: "#0b0f1a", "stroke-width": 1.5 }));
      }
      svg.appendChild(mk("text", { x: cx + rad * 0.72 + 4, y: cy - rad * 0.72 - 4, "font-size": 11, fill: "#8d9bbb" }, SHELL_NAME[i]));
      if (!done) {                                // klick på ringen lägger till en elektron
        const hit = mk("circle", { cx, cy, r: rad, fill: "none", stroke: "transparent", "stroke-width": 20, style: "cursor:pointer" });
        hit.addEventListener("click", () => shellChange(i, +1));
        svg.appendChild(hit);
      }
    });
    svg.appendChild(mk("circle", { cx, cy, r: 26, fill: "#2a1f3a", stroke: "#e8845a", "stroke-width": 1.6 }));
    svg.appendChild(mk("text", { x: cx, y: cy + 5, "text-anchor": "middle", "font-size": 14, fill: "#e8845a" }, q.z + "p"));
    wrap.appendChild(svg);

    const ctrls = document.createElement("div");
    ctrls.className = "shells-ctrls";
    for (let i = 0; i < nRings; i++) {
      const row = document.createElement("div");
      row.className = "shells-row";
      const lab = document.createElement("span");
      lab.textContent = SHELL_NAME[i] + "-skalet";
      const minus = mkBtn("−", "btn-secondary shells-btn", () => shellChange(i, -1));
      minus.setAttribute("aria-label", "Ta bort elektron från " + SHELL_NAME[i] + "-skalet");
      const cnt = document.createElement("strong");
      cnt.textContent = r.shell[i];
      const plus = mkBtn("+", "btn-secondary shells-btn", () => shellChange(i, +1));
      plus.setAttribute("aria-label", "Lägg till elektron i " + SHELL_NAME[i] + "-skalet");
      minus.disabled = done || r.shell[i] <= 0;
      plus.disabled = done || r.shell[i] >= SHELL_CAP[i];
      row.append(lab, minus, cnt, plus);
      if (done) {
        const mark = document.createElement("span");
        mark.className = "shells-mark";
        mark.textContent = r.shell[i] === right[i] ? "✓" : "✗ rätt: " + right[i];
        row.appendChild(mark);
      }
      ctrls.appendChild(row);
    }
    const total = document.createElement("div");
    total.className = "shells-total";
    const sum = r.shell.reduce((a, b) => a + b, 0);
    total.textContent = `Elektroner placerade: ${sum} (${q.sym} ska ha ${q.z})`;
    ctrls.appendChild(total);
    wrap.appendChild(ctrls);
    el("lax-q-body").appendChild(wrap);
  }

  function shellChange(i, d) {
    const r = cur();
    if (r.status === "done") return;
    const v = r.shell[i] + d;
    if (v < 0 || v > SHELL_CAP[i]) return;
    r.shell[i] = v;
    renderView(view);
  }

  function checkShells() {
    const r = cur();
    if (r.status === "done") return;
    const right = shellsFor(r.q.z);
    const ok = right.every((n, i) => n === r.shell[i]);
    const fmtCfg = a => a.filter((n, i) => n > 0 || i < 2).join(", ");
    r.pts = ok ? r.max : 0;
    r.pip = ok ? "hit" : "miss";
    r.status = "done";
    r.fb = {
      cls: ok ? "good" : "poor",
      html: esc(ok
        ? `Rätt! ${r.q.sym} har ${fmtCfg(right)} elektroner i skalen.`
        : `Inte riktigt. Elektronerna fyller skalen inifrån och ut (K rymmer 2, L rymmer 8, M rymmer 8). ${r.q.sym} ska ha ${fmtCfg(right)}.`)
    };
    r.answerText = "Eleven placerade " + r.shell.slice(0, 4).join(", ") + " elektroner i K, L, M, N";
    r.facitText = r.q.modelAnswer || "";
    renderView(view);
  }

  // ── Bygg molekyl (dra valenselektroner till mitten mellan två atomer → delat elektronpar) ──
  // Datafält: name, formula, atoms [[symbol,x,y],...] (koordinater i 400×300), bonds [[i,j,ordning],...] (facit)
  const VALENCE = { H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7 };
  const bondKey = (i, j) => (i < j ? i + "-" + j : j + "-" + i);
  const MOL_W = 400, MOL_H = 300, SHELL_R = 32, ZONE_R = 15;

  // Platser där elektroner kan släppas: mitt emellan atomer som ligger nära varandra
  function molZones(q) {
    const zones = [];
    for (let i = 0; i < q.atoms.length; i++) {
      for (let j = i + 1; j < q.atoms.length; j++) {
        const A = q.atoms[i], B = q.atoms[j];
        if (Math.hypot(A[1] - B[1], A[2] - B[2]) < 150) {
          zones.push({ key: bondKey(i, j), i, j, x: (A[1] + B[1]) / 2, y: (A[2] + B[2]) / 2,
                       ang: Math.atan2(B[2] - A[2], B[1] - A[1]) });
        }
      }
    }
    return zones;
  }

  function molFresh(q) {
    const els = [];
    q.atoms.forEach((A, i) => {
      const v = VALENCE[A[0]], slots = A[0] === "H" ? 2 : 8;
      for (let k = 0; k < v; k++) els.push({ atom: i, slot: Math.floor((k * slots) / v), zone: null });
    });
    return els;
  }

  // Bindningsordning per zon utifrån var elektronerna ligger (ogiltig om olika många från vardera atom)
  function molBonds(q, els) {
    const out = {};
    molZones(q).forEach(z => {
      const a = els.filter(e => e.zone === z.key && e.atom === z.i).length;
      const b = els.filter(e => e.zone === z.key && e.atom === z.j).length;
      if (a || b) out[z.key] = a === b ? a : -1;
    });
    return out;
  }

  function paintMolecule(r) {
    const done = r.status === "done";
    const q = r.q;
    if (!r.els) r.els = molFresh(q);
    const zones = molZones(q);
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs, text) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text !== undefined) e.textContent = text;
      return e;
    };
    const svg = mk("svg", { viewBox: `0 0 ${MOL_W} ${MOL_H}`, class: "mol-svg", role: "img", "aria-label": "Atomer med valenselektroner" });
    const COLORS = ["#e8845a", "#5ab0e8", "#c58af0", "#5ecfa0", "#e8c75a", "#f08ab4"];
    const colorOf = i => (q.atoms[i][0] === "H" ? "#5ab0e8" : COLORS[(i % 3 === 0 ? 0 : i % 3) % COLORS.length]);

    const target = {};
    q.bonds.forEach(([i, j, o]) => { target[bondKey(i, j)] = o; });
    const mine = molBonds(q, r.els);

    // zoner (mitt emellan atomerna)
    zones.forEach(z => {
      const circle = mk("circle", { cx: z.x, cy: z.y, r: ZONE_R + 4, fill: "rgba(90,176,232,.06)", stroke: "#3a4a78", "stroke-width": 1.2, "stroke-dasharray": "3 3" });
      svg.appendChild(circle);
      if (done) {
        const m = mine[z.key] || 0, want = target[z.key] || 0;
        if (m || want) {
          const col = m === want ? "#5ecfa0" : "#e85a5a";
          const t = mk("text", { x: z.x, y: z.y - ZONE_R - 8, "text-anchor": "middle", "font-size": 10, fill: col },
            m === want ? "✓" : `✗ ska vara ${want}`);
          svg.appendChild(t);
        }
      }
    });

    // atomer med skal
    q.atoms.forEach((A, i) => {
      const need = A[0] === "H" ? 2 : 8;
      const own = r.els.filter(e => e.atom === i).length;
      const partner = r.els.filter(e => e.zone && zones.some(z => z.key === e.zone && (z.i === i || z.j === i)) && e.atom !== i).length;
      const tot = own + partner;
      const color = tot === need ? "#5ecfa0" : tot > need ? "#e85a5a" : "#8d9bbb";
      svg.appendChild(mk("circle", { cx: A[1], cy: A[2], r: SHELL_R, fill: "#161d30", stroke: tot === need ? "#5ecfa0" : "#3a4a78", "stroke-width": 1.6 }));
      svg.appendChild(mk("circle", { cx: A[1], cy: A[2], r: 17, fill: "#2a1f3a", stroke: "#e8845a", "stroke-width": 1.6 }));
      svg.appendChild(mk("text", { x: A[1], y: A[2] + 1, "text-anchor": "middle", "font-size": 13, fill: "#dde4f0" }, A[0]));
      svg.appendChild(mk("text", { x: A[1], y: A[2] + 12, "text-anchor": "middle", "font-size": 8, fill: color }, tot + "/" + need));
    });

    // elektroner
    const pos = e => {
      if (!e.zone) {
        const A = q.atoms[e.atom], slots = A[0] === "H" ? 2 : 8;
        const ang = -Math.PI / 2 + (e.slot * 2 * Math.PI) / slots;
        return [A[1] + SHELL_R * Math.cos(ang), A[2] + SHELL_R * Math.sin(ang)];
      }
      const z = zones.find(x => x.key === e.zone);
      const same = r.els.filter(o => o.zone === e.zone);
      const sideI = same.filter(o => o.atom === z.i), sideJ = same.filter(o => o.atom === z.j);
      const list = e.atom === z.i ? sideI : sideJ, idx = list.indexOf(e);
      const along = e.atom === z.i ? -6 : 6;                 // elektronerna i ett par ligger bredvid varandra
      const across = (idx - (Math.max(sideI.length, sideJ.length) - 1) / 2) * 11;
      const nx = -Math.sin(z.ang), ny = Math.cos(z.ang);
      return [z.x + Math.cos(z.ang) * along + nx * across, z.y + Math.sin(z.ang) * along + ny * across];
    };
    r.els.forEach(e => {
      const [x, y] = pos(e);
      const dot = mk("circle", { cx: x, cy: y, r: 5.5, fill: colorOf(e.atom), stroke: "#0b0f1a", "stroke-width": 1.5, class: "mol-el" });
      if (!done) {
        dot.style.cursor = "grab";
        dot.addEventListener("pointerdown", ev => startDrag(ev, e, dot, svg, zones));
      }
      svg.appendChild(dot);
    });

    const wrap = document.createElement("div");
    wrap.className = "mol-wrap";
    wrap.appendChild(svg);
    const hint = document.createElement("div");
    hint.className = "mol-hint";
    hint.textContent = done
      ? "✓ = rätt antal delade elektronpar mellan atomerna, ✗ = fel. Siffran i atomen visar elektroner i yttre skalet (egna + delade)."
      : "Dra valenselektronerna (prickarna) till de streckade ringarna mellan två atomer. Två elektroner – en från vardera atom – bildar ett delat elektronpar. Siffran i atomen visar elektroner i yttre skalet: målet är fullt skal (väte 2, övriga 8).";
    wrap.appendChild(hint);
    if (!done) {
      const reset = mkBtn("Börja om", "btn-secondary", () => { r.els = molFresh(q); renderView(view); });
      reset.disabled = r.els.every(e => !e.zone);
      wrap.appendChild(reset);
    }
    el("lax-q-body").appendChild(wrap);
  }

  function startDrag(ev, e, dot, svg, zones) {
    const r = cur();
    if (r.status === "done") return;
    ev.preventDefault();
    const rect = svg.getBoundingClientRect();
    const toSvg = (cx, cy) => [((cx - rect.left) * MOL_W) / rect.width, ((cy - rect.top) * MOL_H) / rect.height];
    dot.setPointerCapture(ev.pointerId);
    dot.setAttribute("r", 7.5);
    const move = m => {
      const [x, y] = toSvg(m.clientX, m.clientY);
      dot.setAttribute("cx", x); dot.setAttribute("cy", y);
    };
    const up = m => {
      dot.removeEventListener("pointermove", move);
      dot.removeEventListener("pointerup", up);
      dot.removeEventListener("pointercancel", up);
      const [x, y] = toSvg(m.clientX, m.clientY);
      let best = null, bd = 34;
      zones.forEach(z => {
        if (z.i !== e.atom && z.j !== e.atom) return;      // bara de egna atomernas zoner
        const d = Math.hypot(z.x - x, z.y - y);
        if (d < bd) { bd = d; best = z; }
      });
      if (best) {
        const side = r.els.filter(o => o.zone === best.key && o.atom === e.atom && o !== e).length;
        e.zone = side < 3 ? best.key : null;                 // högst tre elektroner per atom och zon (trippelbindning)
      } else {
        e.zone = null;
      }
      renderView(view);
    };
    dot.addEventListener("pointermove", move);
    dot.addEventListener("pointerup", up);
    dot.addEventListener("pointercancel", up);
  }

  function checkMolecule() {
    const r = cur();
    if (r.status === "done") return;
    const q = r.q;
    const target = {};
    q.bonds.forEach(([i, j, o]) => { target[bondKey(i, j)] = o; });
    const mine = molBonds(q, r.els);
    const all = new Set([...Object.keys(target), ...Object.keys(mine)]);
    const ok = [...all].every(k => (target[k] || 0) === (mine[k] || 0));
    r.pts = ok ? r.max : 0;
    r.pip = ok ? "hit" : "miss";
    r.status = "done";
    r.fb = {
      cls: ok ? "good" : "poor",
      html: esc(ok
        ? `Rätt! ${q.name} (${q.formula}): ${q.modelAnswer}`
        : `Inte riktigt. ${q.name} (${q.formula}): ${q.modelAnswer}`)
    };
    const desc = Object.entries(mine).map(([k, o]) => {
      const [a, b] = k.split("-").map(Number);
      return `${q.atoms[a][0]}${a + 1}–${q.atoms[b][0]}${b + 1}: ${o < 0 ? "ojämnt antal elektroner" : o + " elektronpar"}`;
    }).join(", ");
    r.answerText = "Eleven placerade elektroner i mitten: " + (desc || "inga");
    r.facitText = q.modelAnswer;
    renderView(view);
  }

  // ── Rita krafter (dra pilar från lampan, välj vad kraften heter) ──
  // Tre fasta fall: a) lampan hänger i en tråd, b) tråden har gått av, c) lampan står på golvet.
  const FORCE_NAMES = { "": "Välj kraft…", tyngd: "Tyngdkraft", drag: "Dragkraft (från tråden)", normal: "Normalkraft", frikt: "Friktionskraft", luft: "Luftmotstånd" };
  const FORCE_CASES = [
    { key: "a", x: 100, y: 190, cap: "a) Lampan hänger stilla" },
    { key: "b", x: 300, y: 190, cap: "b) Tråden har gått av" },
    { key: "c", x: 500, y: 190, cap: "c) Lampan står på golvet" }
  ];
  const FW = 600, FH = 340, FSTEP = 28, FBASE = 20;
  const arrowLen = k => FBASE + FSTEP * k;

  function paintForces(r) {
    const done = r.status === "done";
    if (!r.forces) r.forces = { a: {}, b: {}, c: {} };
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs, text) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text !== undefined) e.textContent = text;
      return e;
    };
    const svg = mk("svg", { viewBox: `0 0 ${FW} ${FH}`, class: "mol-svg force-svg", role: "img", "aria-label": "Lampan i tre fall" });
    const grey = "#5a6a90";
    // tak, tråd och golv
    svg.appendChild(mk("line", { x1: 20, y1: 40, x2: 400, y2: 40, stroke: grey, "stroke-width": 3 }));
    svg.appendChild(mk("text", { x: 22, y: 30, "font-size": 12, fill: "#8d9bbb" }, "tak"));
    svg.appendChild(mk("line", { x1: 100, y1: 40, x2: 100, y2: 170, stroke: grey, "stroke-width": 2.5 }));
    svg.appendChild(mk("line", { x1: 300, y1: 40, x2: 300, y2: 78, stroke: grey, "stroke-width": 2.5 }));
    svg.appendChild(mk("line", { x1: 300, y1: 100, x2: 300, y2: 112, stroke: grey, "stroke-width": 2.5, "stroke-dasharray": "3 5" }));
    svg.appendChild(mk("line", { x1: 410, y1: 212, x2: 590, y2: 212, stroke: grey, "stroke-width": 3 }));
    svg.appendChild(mk("text", { x: 592, y: 230, "text-anchor": "end", "font-size": 12, fill: "#8d9bbb" }, "golv"));

    const ok = done ? r.forceResult : {};
    FORCE_CASES.forEach(cs => {
      const st = r.forces[cs.key];
      const good = done ? ok[cs.key] : null;
      const col = good === null ? "#5ab0e8" : good ? "#5ecfa0" : "#e85a5a";
      svg.appendChild(mk("text", { x: cs.x, y: 18, "text-anchor": "middle", "font-size": 12, fill: "#dde4f0" }, cs.cap));
      svg.appendChild(mk("circle", { cx: cs.x, cy: cs.y, r: 20, fill: "#e8d34a", stroke: "#0b0f1a", "stroke-width": 2 }));
      ["up", "down"].forEach(dir => {
        const a = st[dir];
        if (!a) return;
        const len = arrowLen(a.k), sgn = dir === "up" ? -1 : 1;
        const y2 = cs.y + sgn * len;
        const g = mk("g", { style: done ? "" : "cursor:pointer" });
        const y0 = dir === "up" ? cs.y - 20 : cs.y;
        g.appendChild(mk("line", { x1: cs.x, y1: y0, x2: cs.x, y2: y2 - sgn * 8, stroke: col, "stroke-width": 4 }));
        g.appendChild(mk("polygon", { points: `${cs.x},${y2} ${cs.x - 8},${y2 - sgn * 14} ${cs.x + 8},${y2 - sgn * 14}`, fill: col }));
        g.appendChild(mk("line", { x1: cs.x, y1: y0, x2: cs.x, y2, stroke: "transparent", "stroke-width": 22 }));
        const title = mk("title", {}, done ? "" : "Klicka för att ta bort pilen");
        g.appendChild(title);
        if (a.label) g.appendChild(mk("text", { x: cs.x + 14, y: y2 - sgn * 8 + 4, "font-size": 11, fill: col }, FORCE_NAMES[a.label].split(" (")[0]));
        if (!done) g.addEventListener("click", () => { st[dir] = null; renderView(view); });
        svg.appendChild(g);
      });
      svg.appendChild(mk("circle", { cx: cs.x, cy: cs.y, r: 3.5, fill: "#0b0f1a" }));
      if (!done) {
        const hit = mk("circle", { cx: cs.x, cy: cs.y, r: 28, fill: "transparent", style: "cursor:ns-resize", "pointer-events": "all" });
        hit.addEventListener("pointerdown", ev => startForceDrag(ev, r, cs, svg, hit));
        svg.appendChild(hit);
      }
    });

    const wrap = document.createElement("div");
    wrap.className = "mol-wrap";
    wrap.appendChild(svg);

    const cols = document.createElement("div");
    cols.className = "force-cols";
    FORCE_CASES.forEach(cs => {
      const col = document.createElement("div");
      col.className = "force-col";
      const st = r.forces[cs.key];
      [["up", "uppåt"], ["down", "nedåt"]].forEach(([dir, word]) => {
        if (!st[dir]) return;
        const sel = document.createElement("select");
        sel.className = "match-select";
        sel.setAttribute("aria-label", `Vad heter kraften ${word} i fall ${cs.key})?`);
        Object.entries(FORCE_NAMES).forEach(([v, t]) => sel.add(new Option(`Pil ${word}: ${t}`, v)));
        sel.value = st[dir].label || "";
        sel.disabled = done;
        sel.addEventListener("change", () => { st[dir].label = sel.value; renderView(view); });
        col.appendChild(sel);
      });
      if (done) {
        const note = document.createElement("div");
        note.className = "force-note " + (ok[cs.key] ? "good" : "bad");
        note.textContent = ok[cs.key] ? "✓ Rätt" : "✗ " + r.forceWhy[cs.key];
        col.appendChild(note);
      }
      cols.appendChild(col);
    });
    wrap.appendChild(cols);

    const hint = document.createElement("div");
    hint.className = "mol-hint";
    hint.textContent = done
      ? "Grön = rätt, röd = fel. Pilens längd visar kraftens storlek."
      : "Dra från lampan uppåt eller nedåt för att rita en kraftpil – ju längre drag, desto större kraft. Välj sedan under bilden vad kraften heter. Klicka på en pil för att ta bort den.";
    wrap.appendChild(hint);
    el("lax-q-body").appendChild(wrap);
  }

  function startForceDrag(ev, r, cs, svg, hit) {
    if (r.status === "done") return;
    ev.preventDefault();
    hit.setPointerCapture(ev.pointerId);
    const rect = svg.getBoundingClientRect();
    const toSvgY = cy => ((cy - rect.top) * FH) / rect.height;
    const NS = "http://www.w3.org/2000/svg";
    const prev = document.createElementNS(NS, "line");
    prev.setAttribute("x1", cs.x); prev.setAttribute("x2", cs.x);
    prev.setAttribute("stroke", "#e8c75a"); prev.setAttribute("stroke-width", 4); prev.setAttribute("stroke-dasharray", "5 4");
    svg.appendChild(prev);
    const calc = m => {
      const dy = toSvgY(m.clientY) - cs.y;
      const k = Math.max(1, Math.min(4, Math.round(Math.abs(dy) / 30)));
      return { dir: dy < 0 ? "up" : "down", k, show: Math.abs(dy) > 12 };
    };
    const move = m => {
      const c = calc(m);
      if (!c.show) { prev.setAttribute("y1", cs.y); prev.setAttribute("y2", cs.y); return; }
      prev.setAttribute("y1", cs.y);
      prev.setAttribute("y2", cs.y + (c.dir === "up" ? -1 : 1) * arrowLen(c.k));
    };
    const up = m => {
      hit.removeEventListener("pointermove", move);
      hit.removeEventListener("pointerup", up);
      hit.removeEventListener("pointercancel", up);
      const c = calc(m);
      if (c.show) {
        const old = r.forces[cs.key][c.dir];
        r.forces[cs.key][c.dir] = { k: c.k, label: old ? old.label : "" };
      }
      renderView(view);
    };
    hit.addEventListener("pointermove", move);
    hit.addEventListener("pointerup", up);
    hit.addEventListener("pointercancel", up);
  }

  function checkForces() {
    const r = cur();
    if (r.status === "done") return;
    const f = r.forces || { a: {}, b: {}, c: {} };
    const res = {}, why = {};
    const isF = (a, lab) => a && a.label === lab;
    // a) tyngdkraft nedåt och dragkraft uppåt, lika stora
    {
      const { up, down } = f.a;
      res.a = isF(down, "tyngd") && isF(up, "drag") && up.k === down.k;
      why.a = !down || !up ? "Det verkar både en kraft nedåt och en kraft uppåt."
        : up.k !== down.k ? "Krafterna är lika stora (lampan står stilla), så pilarna ska vara lika långa."
        : "Nedåt verkar tyngdkraften och uppåt dragkraften från tråden.";
    }
    // b) bara tyngdkraft nedåt
    {
      const { up, down } = f.b;
      res.b = isF(down, "tyngd") && !up;
      why.b = up ? "Tråden är av, så ingen kraft verkar uppåt. Luftmotståndet bortser vi från."
        : "Bara tyngdkraften verkar nedåt när lampan faller.";
    }
    // c) tyngdkraft nedåt och normalkraft uppåt, lika stora
    {
      const { up, down } = f.c;
      res.c = isF(down, "tyngd") && isF(up, "normal") && up.k === down.k;
      why.c = !down || !up ? "Det verkar både en kraft nedåt och en kraft uppåt."
        : up.k !== down.k ? "Lampan står stilla, så normalkraften är lika stor som tyngdkraften."
        : "Nedåt verkar tyngdkraften och uppåt normalkraften från golvet.";
    }
    const n = ["a", "b", "c"].filter(k => res[k]).length;
    const per = r.max / 3;
    r.pts = n * per;
    r.pip = n === 3 ? "hit" : n > 0 ? "part" : "miss";
    r.status = "done";
    r.forceResult = res; r.forceWhy = why;
    r.fb = {
      cls: n === 3 ? "good" : n > 0 ? "part" : "poor",
      html: esc(`${n} av 3 fall rätt. ` + r.q.modelAnswer)
    };
    const d = k => ["up", "down"].map(dir => f[k][dir] ? `${dir === "up" ? "uppåt" : "nedåt"}: ${FORCE_NAMES[f[k][dir].label] || "ej namngiven"} (längd ${f[k][dir].k})` : "").filter(Boolean).join(", ") || "inga pilar";
    r.answerText = `Fall a) ${d("a")}; fall b) ${d("b")}; fall c) ${d("c")}`;
    r.facitText = r.q.modelAnswer;
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
    if (!hasUnused()) return; // inga nya frågor kvar – ta inte upp samma fråga igen
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
    if (q.type === "forces") return `Facit (får inte avslöjas): ${q.modelAnswer}`;
    if (q.type === "molecule") return `Facit (får inte avslöjas): ${q.modelAnswer}`;
    if (q.type === "shells") return `Facit (får inte avslöjas): ${shellsFor(q.z).filter(n => n).join(", ")} elektroner i K, L, M. Elektronerna fyller skalen inifrån och ut.`;
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
      `Svara pedagogiskt och uppmuntrande på elevens följdfrågor. Håll svaren korta (2-4 meningar). Skriv på svenska.` +
      (r.q.type === "open"
        ? ` Avsluta varje svar med att uppmuntra eleven att skriva om sitt svar med hjälp av det ni just pratat om, så att resonemanget blir tydligare och fullständigt (t.ex. fler led där varje steg följer av det förra). Nämn att knappen "Skriv om mitt svar" finns under frågan. Läs inte upp facit ordagrant.`
        : "");
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
      } else if (type === "forces") {
        wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkForces));
      } else if (type === "molecule") {
        wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkMolecule));
      } else if (type === "shells") {
        wrap.appendChild(mkBtn("Kontrollera svar", "btn-primary", checkShells));
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
      const noMore = !hasUnused();
      const s = mkBtn(noMore ? "Inga fler nya frågor" : "Hoppa över →", "btn-skip", skip);
      s.disabled = r.busy || noMore;
      wrap.appendChild(s);
    } else {
      if (type === "open") wrap.appendChild(mkBtn("✏️ Skriv om mitt svar", "btn-secondary", rewriteAnswer));
      wrap.appendChild(mkBtn("Nästa fråga →", "btn-primary", nextQ));
    }
  }

  // Låt eleven skriva om sitt svar på en öppen fråga och få det bedömt på nytt (nya poängen ersätter de gamla)
  function rewriteAnswer() {
    const r = cur();
    if (r.q.type !== "open" || r.status !== "done" || r.busy) return;
    r.status = "new";
    r.pip = null;
    r.pts = 0;
    r.fb = null;
    renderView(view);
    const ta = el("lax-open-ta");
    if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
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
