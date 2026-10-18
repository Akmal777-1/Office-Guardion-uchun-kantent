const pw = document.getElementById("pw");
const bar = document.getElementById("bar");
const natija = document.getElementById("natija");
const len = document.getElementById("len");
const ent = document.getElementById("ent");
const eye = document.getElementById("eye");
const checks = document.querySelectorAll("#checks li");

const rules = {
  len: p => p.length >= 12,
  low: p => /[a-z]/.test(p),
  up:  p => /[A-Z]/.test(p),
  num: p => /[0-9]/.test(p),
  sym: p => /[^A-Za-z0-9]/.test(p),
};
const levels = [
  ["KUTILMOQDA", "#5a6b7d", 0],
  ["JUDA ZAIF", "#ff4d4d", 20],
  ["ZAIF", "#ff8a3d", 40],
  ["O'RTACHA", "#ffcc33", 60],
  ["KUCHLI", "#9be34a", 80],
  ["JUDA KUCHLI", "#33ff88", 100],
];
let shown = 0, lastLevel = -1;

function countTo(to) { // raqam silliq sanab o'zgaradi
  const from = shown, t0 = performance.now();
  function step(now) {
    const k = Math.min(1, (now - t0) / 400);
    ent.textContent = Math.round(from + (to - from) * k) + " bit";
    if (k < 1) requestAnimationFrame(step); else shown = to;
  }
  requestAnimationFrame(step);
}

pw.addEventListener("input", () => {
  const p = pw.value;
  let n = 0;
  checks.forEach(li => {
    const ok = rules[li.dataset.r](p);
    li.classList.toggle("ok", ok);
    if (ok) n++;
  });

  const lvl = p ? Math.max(1, n) : 0;
  const [text, color, pct] = levels[lvl];
  document.documentElement.style.setProperty("--c", color);
  bar.style.width = pct + "%";
  natija.textContent = text;
  if (lvl !== lastLevel) {
    natija.classList.remove("pop");
    void natija.offsetWidth;
    natija.classList.add("pop");
    lastLevel = lvl;
  }

  let pool = 0;
  if (/[a-z]/.test(p)) pool += 26;
  if (/[A-Z]/.test(p)) pool += 26;
  if (/[0-9]/.test(p)) pool += 10;
  if (/[^A-Za-z0-9]/.test(p)) pool += 33;
  len.textContent = p.length;
  countTo(p ? Math.round(p.length * Math.log2(pool)) : 0);
});

eye.onclick = () => {
  pw.type = pw.type === "password" ? "text" : "password";
};