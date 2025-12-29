import { loadUser, saveUser } from "./firebase.js";

const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

/* ---------------- GAME STATE ---------------- */
let game = {
  coins: 0,
  energy: 100,
  tapPower: 1,
  pph: 0,
  lastTime: Date.now()
};

/* ---------------- LOAD FROM FIREBASE ---------------- */
async function initGame() {
  const data = await loadUser();
  if (data) {
    game = {
      ...game,
      ...data,
      lastTime: Date.now()
    };
  }
  updateUI();
}

initGame();

/* ---------------- UI ---------------- */
function updateUI() {
  document.getElementById("coins").innerText = Math.floor(game.coins);
  document.getElementById("energy").innerText = game.energy;
  document.getElementById("tapPower").innerText = game.tapPower;
}

/* ---------------- PASSIVE INCOME ---------------- */
function passiveIncome() {
  const now = Date.now();
  const hours = (now - game.lastTime) / 3600000;
  game.coins += hours * game.pph;
  game.lastTime = now;
}

/* ---------------- SCREEN SWITCH ---------------- */
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------- GAME LOOP ---------------- */
setInterval(async () => {
  if (game.energy < CONFIG.maxEnergy) {
    game.energy += CONFIG.energyRegen;
  }

  passiveIncome();
  updateUI();

  await saveUser({
    coins: game.coins,
    energy: game.energy,
    tapPower: game.tapPower,
    pph: game.pph
  });
}, CONFIG.energyTime);
export { game, updateUI };
