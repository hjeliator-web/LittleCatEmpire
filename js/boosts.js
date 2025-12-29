const boostsDiv = document.getElementById("boosts");

boostsDiv.innerHTML = `
<div class="card">
⚡ Double Tap (30s)
<button onclick="boostTap()">Activate</button>
</div>
`;

function boostTap(){
  let old = game.tapPower;
  game.tapPower *= 2;
  setTimeout(()=>game.tapPower=old,30000);
}
