loadUser();

const tg = Telegram.WebApp;
tg.expand();

let game = JSON.parse(localStorage.getItem("babycat")) || {
  coins: 0,
  energy: 100,
  tapPower: 1,
  pph: 0,
  lastTime: Date.now()
};

function save() {
  localStorage.setItem("babycat", JSON.stringify(game));
}

function updateUI() {
  document.getElementById("coins").innerText = Math.floor(game.coins);
  document.getElementById("energy").innerText = game.energy;
  document.getElementById("tapPower").innerText = game.tapPower;
}

function passiveIncome() {
  let now = Date.now();
  let hours = (now - game.lastTime) / 3600000;
  game.coins += hours * game.pph;
  game.lastTime = now;
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

setInterval(() => {
  if (game.energy < CONFIG.maxEnergy) game.energy += CONFIG.energyRegen;
  passiveIncome();
  save();
  updateUI();
}, CONFIG.energyTime);

saveUser({
  coins: game.coins,
  tapPower: game.tapPower,
  pph: game.pph
});


updateUI();
