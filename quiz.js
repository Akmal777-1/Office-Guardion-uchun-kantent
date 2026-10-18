(() => {
  const g = id => document.getElementById(id);

  const items = [
    { from: "SMS · BANK",
      text: "Kartangiz bloklandi! 30 daqiqa ichida tasdiqlang: http://bank-uz-verify.top/login",
      phish: true,
      why: "Shoshiltirish va notanish sayt manzili (.top) firibgarlik belgisi. Bank hech qachon SMS orqali havolaga bosishni talab qilmaydi." },
    { from: "Telegram · noma'lum akkaunt",
      text: "Tabriklaymiz! Siz yangi iPhone yutdingiz! Sovg'ani olish uchun karta raqami va kodini yuboring.",
      phish: true,
      why: "Qatnashmagan tanlovda yutish bo'lmaydi. Karta ma'lumotlarini so'rash aniq firibgarlik." },
    { from: "Email · Google",
      text: "Hisobingizga yangi qurilmadan kirildi. Agar bu siz bo'lsangiz, hech narsa qilmang. Tekshirish uchun brauzerda o'zingiz myaccount.google.com ni oching.",
      phish: false,
      why: "Havolaga bosishni emas, manzilni o'zingiz ochishni aytyapti va shoshirmayapti. Bu to'g'ri usul." },
    { from: "Havola",
      text: "https://paypa1.com/login",
      phish: true,
      why: "Diqqat bilan qarang: 'paypal' dagi 'l' harfi o'rniga '1' raqami turibdi. Bunday soxta domenlar juda ko'p." },
    { from: "WhatsApp · 'Direktor'",
      text: "Salom, men yangi raqamdan yozyapman. Zudlik bilan shu hisobga 5 mln so'm o'tkazing, keyin tushuntiraman.",
      phish: true,
      why: "Yangi raqam, shoshilinch pul so'rovi va 'keyin tushuntiraman'. Avval rahbar bilan eski raqamidan bog'laning." },
    { from: "SMS · bank ilovasi",
      text: "To'lov tasdiqlash kodi: 482913. Kodni hech kimga bermang. Siz so'ramagan bo'lsangiz, bankka qo'ng'iroq qiling.",
      phish: false,
      why: "Siz hozirgina to'lov qilgan bo'lsangiz, bu oddiy bir martalik kod. Muhimi uni hech kimga aytmaslik." },
    { from: "Havola",
      text: "https://accounts.google.com.verify-login.net/signin",
      phish: true,
      why: "Haqiqiy domen manzilning ENG OXIRGI qismi: bu yerda verify-login.net. 'google.com' faqat bezak." },
    { from: "Email · parolni tiklash",
      text: "Siz hozirgina 'Parolni unutdim' tugmasini bosgan edingiz. Yangi parol o'rnatish havolasi 15 daqiqa amal qiladi. So'ramagan bo'lsangiz, xatni e'tiborsiz qoldiring.",
      phish: false,
      why: "Siz o'zingiz so'ragansiz, bosim yo'q va e'tiborsiz qoldirish mumkinligi aytilgan. Odatda bu normal xat." }
  ];

  let order, i, score, done;

  function start() {
    order = items.slice().sort(() => Math.random() - 0.5);
    i = 0;
    score = 0;
    done = false;
    show();
  }

  function show() {
    const it = order[i];
    g("qnum").textContent = (i + 1) + "/" + order.length;
    g("qscore").textContent = "Ball: " + score;
    g("qfrom").textContent = it.from;
    g("qtext").textContent = it.text;
    g("qfb").textContent = "";
    g("qfb").className = "";
    g("qbtns").classList.remove("hide");
    g("qnext").classList.add("hide");
  }

  function answer(saidPhish) {
    const it = order[i];
    const right = saidPhish === it.phish;
    if (right) score++;
    g("qscore").textContent = "Ball: " + score;
    g("qfb").className = right ? "good" : "bad";
    g("qfb").textContent = (right ? "✔ To'g'ri! " : "✘ Noto'g'ri. ") + it.why;
    g("qbtns").classList.add("hide");
    g("qnext").classList.remove("hide");
    g("qnext").textContent = i === order.length - 1 ? "NATIJA ▶" : "KEYINGISI ▶";
  }

  function finish() {
    done = true;
    const pct = Math.round(score / order.length * 100);
    let t = "Ehtiyot bo'ling! Qayta urinib ko'ring.";
    if (pct >= 70) t = "Yaxshi, lekin doim ehtiyot bo'ling.";
    if (pct === 100) t = "Mukammal! Siz haqiqiy qo'riqchisiz 🛡️";
    g("qfrom").textContent = "NATIJA";
    g("qtext").textContent = score + " / " + order.length + " (" + pct + "%). " + t;
    g("qfb").textContent = "";
    g("qfb").className = "";
    g("qnext").textContent = "QAYTA BOSHLASH ↻";
  }

  g("qBad").onclick = () => answer(true);
  g("qGood").onclick = () => answer(false);
  g("qnext").onclick = () => {
    if (done) { start(); return; }
    i++;
    if (i < order.length) show(); else finish();
  };

  start();
})();