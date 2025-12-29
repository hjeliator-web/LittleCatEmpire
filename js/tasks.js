const tasksDiv = document.getElementById("tasks");

tasksDiv.innerHTML = `
<div class="card">
Join Channel – Reward 500
<button onclick="task(500)">Claim</button>
</div>
`;

function task(r){
  game.coins+=r;
  save(); updateUI();
}
