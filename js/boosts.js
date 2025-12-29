import { saveUser } from "./firebase.js";
import { game, updateUI } from "./game.js";

const boostsDiv = document.getElementById("boosts");

boostsDiv.innerHTML = `
  <div class="card">
    ⚡ <b>Double Tap</b> (30 seconds)<br>
    <button id="boostBtn">Activate</button>
  </div>
`;

document.getElementById("boostBtn").onclick = async () => {
  const now = Date.now();

  // Prevent stacking
  if (now < game.boostTapUntil) return alert("Boost already active!");

  // Optional cost
  if (game.coins < 100) return alert("Not enough coins!");

  game.coins -= 100;
  game.boostTapUntil = now + 30000;

  await saveUser({
    coins: game.coins,
    boostTapUntil: game.boostTapUntil
  });

  updateUI();
};
