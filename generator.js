const $ = id => document.getElementById(id);

/* tablar almashtirish */
document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("on", b === btn));
    document.querySelectorAll(".pane").forEach(p => p.classList.toggle("on", p.id === btn.dataset.t));
  };
});

const sets = {
  oLow: "abcdefghijklmnopqrstuvwxyz",
  oUp: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  oNum: "0123456789",
  oSym: "!@#$%^&*()-_=+[]{};:,.?",
};

// xavfsiz tasodifiy son: 0 dan n-1 gacha
const rnd = n => crypto.getRandomValues(new Uint32Array(1))[0] % n;

$("glen").oninput = () => { $("lenv").textContent = $("glen").value; };

let timer;
function reveal(final) {
  const junk = "!@#$%^&*0123456789ABCDEFabcdef";
  let i = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    let s = final.slice(0, i);
    for (let j = i; j < final.length; j++) s += junk[rnd(junk.length)];
    $("gen").textContent = s;
    if (i++ >= final.length) clearInterval(timer);
  }, 35);
}

function make() {
  const chosen = Object.keys(sets).filter(id => $(id).checked);
  if (chosen.length === 0) {
    $("gen").textContent = "Kamida bitta turni tanlang!";
    return;
  }
  const pool = chosen.map(id => sets[id]).join("");
  const len = Number($("glen").value);

  const out = chosen.map(id => sets[id][rnd(sets[id].length)]);
  while (out.length < len) out.push(pool[rnd(pool.length)]);

  for (let i = out.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  reveal(out.join(""));
}

$("make").onclick = make;

$("copy").onclick = async () => {
  const t = $("gen").textContent;
  if (t.includes("•")) return;
  if (t.includes("tanlang")) return;
  await navigator.clipboard.writeText(t);
  $("copy").textContent = "✔ Nusxalandi";
  setTimeout(() => { $("copy").textContent = "Nusxa"; }, 1500);
};

make();