// Gemensam data och ritfunktion för kemi-apparna (grundämne 1–20)
const CAT = {
  alkali:  { name: "Alkalimetaller",              color: "#e8845a" },
  jord:    { name: "Alkaliska jordartsmetaller",  color: "#e8c75a" },
  metall:  { name: "Övriga metaller",             color: "#9aa7c7" },
  halvm:   { name: "Halvmetaller",                color: "#5ecfa0" },
  icke:    { name: "Icke-metaller",               color: "#5ab0e8" },
  halogen: { name: "Halogener",                   color: "#c58af0" },
  adel:    { name: "Ädelgaser",                   color: "#f08ab4" }
};
// [Z, symbol, namn, grupp, period, vanligaste masstal, kategori]
const EL = [
  [1,"H","Väte",1,1,1,"icke"],[2,"He","Helium",18,1,4,"adel"],
  [3,"Li","Litium",1,2,7,"alkali"],[4,"Be","Beryllium",2,2,9,"jord"],[5,"B","Bor",13,2,11,"halvm"],
  [6,"C","Kol",14,2,12,"icke"],[7,"N","Kväve",15,2,14,"icke"],[8,"O","Syre",16,2,16,"icke"],
  [9,"F","Fluor",17,2,19,"halogen"],[10,"Ne","Neon",18,2,20,"adel"],
  [11,"Na","Natrium",1,3,23,"alkali"],[12,"Mg","Magnesium",2,3,24,"jord"],[13,"Al","Aluminium",13,3,27,"metall"],
  [14,"Si","Kisel",14,3,28,"halvm"],[15,"P","Fosfor",15,3,31,"icke"],[16,"S","Svavel",16,3,32,"icke"],
  [17,"Cl","Klor",17,3,35,"halogen"],[18,"Ar","Argon",18,3,40,"adel"],
  [19,"K","Kalium",1,4,39,"alkali"],[20,"Ca","Kalcium",2,4,40,"jord"]
].map(a => ({ z:a[0], sym:a[1], name:a[2], group:a[3], period:a[4], mass:a[5], cat:a[6] }));
const bySym = s => EL.find(e => e.sym === s);
const byZ = z => EL.find(e => e.z === z);

// Elektroner fördelas på skalen K, L, M, N med högst 2, 8, 8, 2 (gäller grundämne 1–20)
function shells(electrons) {
  const caps = [2, 8, 8, 2], out = [];
  let rem = electrons;
  for (const c of caps) { const t = Math.min(c, rem); if (t > 0) out.push(t); rem -= t; }
  return out;
}
const SHELL_NAMES = ["K", "L", "M", "N"];
const sup = n => String(n).replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
const charge = c => c === 0 ? "" : (Math.abs(c) > 1 ? sup(Math.abs(c)) : "") + (c > 0 ? "⁺" : "⁻");

// Ritar en atom som skalmodell i en SVG. opts: {p, n, e, cx, cy, scale, label, valenceColor}
function drawAtom(svg, o) {
  const NS = "http://www.w3.org/2000/svg";
  const g = document.createElementNS(NS, "g");
  const cx = o.cx ?? 150, cy = o.cy ?? 150, s = o.scale ?? 1;
  const sh = shells(o.e);
  const nshell = Math.max(sh.length, 1);
  const r0 = 26 * s, step = 24 * s;
  const mk = (tag, attrs, text) => {
    const x = document.createElementNS(NS, tag);
    for (const k in attrs) x.setAttribute(k, attrs[k]);
    if (text !== undefined) x.textContent = text;
    return x;
  };
  const maxShells = o.maxShells ?? nshell;
  for (let i = 0; i < maxShells && i < 4; i++) {
    const r = r0 + step * (i + 1) - 6 * s;
    g.appendChild(mk("circle", { cx, cy, r, fill: "none", stroke: "#263050", "stroke-width": 1.2, "stroke-dasharray": i < nshell ? "" : "3 4" }));
  }
  g.appendChild(mk("circle", { cx, cy, r: r0 - 2 * s, fill: "#2a1f3a", stroke: "#e8845a", "stroke-width": 1.5 }));
  g.appendChild(mk("text", { x: cx, y: cy - 2 * s, "text-anchor": "middle", "font-size": 11 * s, fill: "#e8845a" }, o.p + "p"));
  g.appendChild(mk("text", { x: cx, y: cy + 11 * s, "text-anchor": "middle", "font-size": 11 * s, fill: "#9aa7c7" }, o.n + "n"));
  sh.forEach((cnt, i) => {
    const r = r0 + step * (i + 1) - 6 * s;
    const outer = i === sh.length - 1;
    for (let k = 0; k < cnt; k++) {
      const a = (Math.PI * 2 * k) / cnt - Math.PI / 2 + i * 0.5;
      g.appendChild(mk("circle", {
        cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a), r: 4.4 * s,
        fill: outer ? (o.valenceColor || "#5ab0e8") : "#5ecfa0", stroke: "#0b0f1a", "stroke-width": 1
      }));
    }
    if (o.shellLabels !== false) {
      g.appendChild(mk("text", { x: cx + r + 7 * s, y: cy + 14 * s, "font-size": 9 * s, fill: "#8d9bbb" }, SHELL_NAMES[i]));
    }
  });
  if (o.label) g.appendChild(mk("text", { x: cx, y: cy + r0 + step * (maxShells) + 14 * s, "text-anchor": "middle", "font-size": 13 * s, fill: "#dde4f0" }, o.label));
  svg.appendChild(g);
  return g;
}
const $ = id => document.getElementById(id);

// Gör en SVG-cirkel (elektron) dragbar. vb = [bredd, höjd] på SVG:ns viewBox.
// onDrop(x, y) anropas i SVG-koordinater när eleven släpper.
function enableDrag(dot, svg, vb, onDrop) {
  dot.style.cursor = "grab";
  dot.addEventListener("pointerdown", ev => {
    ev.preventDefault();
    const rect = svg.getBoundingClientRect();
    const toSvg = (cx, cy) => [((cx - rect.left) * vb[0]) / rect.width, ((cy - rect.top) * vb[1]) / rect.height];
    dot.setPointerCapture(ev.pointerId);
    dot.setAttribute("r", +dot.getAttribute("r") + 2);
    const move = m => { const [x, y] = toSvg(m.clientX, m.clientY); dot.setAttribute("cx", x); dot.setAttribute("cy", y); };
    const up = m => {
      dot.removeEventListener("pointermove", move);
      dot.removeEventListener("pointerup", up);
      dot.removeEventListener("pointercancel", up);
      const [x, y] = toSvg(m.clientX, m.clientY);
      onDrop(x, y);
    };
    dot.addEventListener("pointermove", move);
    dot.addEventListener("pointerup", up);
    dot.addEventListener("pointercancel", up);
  });
}
const SVGNS = "http://www.w3.org/2000/svg";
function mkSvg(tag, attrs, text) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text !== undefined) e.textContent = text;
  return e;
}
