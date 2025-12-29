import { saveUser } from "./firebase.js";
import { game, updateUI } from "./game.js";

let lastTap = 0;
const TAP_DELAY = 80; // ms (anti auto-click)

window.tapCat = async function () {
  const now = Date.now();

  // Anti-spam protection
  if (now - lastTap < TAP_DELAY) return;
  lastTap = now;

  if (game.energy <= 0) return;

  // Apply tap
  game.coins += game.tapPower;
  game.energy -= 1;

  updateUI();

  // Save to Firebase (REAL earning)
  await saveUser({
    coins: game.coins,
    energy: game.energy
  });
};
