const businesses = [
  { name:"🐟 Fish Factory", level:0, base:50, profit:5 },
  { name:"🧶 Yarn Shop", level:0, base:200, profit:20 },
  { name:"🏢 Cat Corp", level:0, base:1000, profit:120 }
];

const bizDiv = document.getElementById("businesses");

function loadBusinesses() {
  bizDiv.innerHTML = "";
  businesses.forEach((b,i)=>{
    let cost = b.base * (b.level+1);
    let div = document.createElement("div");
    div.className="card";
    div.innerHTML = `
      <b>${b.name}</b><br>
      Level: ${b.level}<br>
      +${b.profit}/hour<br>
      Cost: ${cost}
      <button onclick="upgradeBiz(${i})">Upgrade</button>
    `;
    bizDiv.appendChild(div);
  });
}

function upgradeBiz(i){
  let b = businesses[i];
  let cost = b.base * (b.level+1);
  if(game.coins>=cost){
    game.coins-=cost;
    b.level++;
    game.pph+=b.profit;
    save(); updateUI(); loadBusinesses();
  }
}

loadBusinesses();
