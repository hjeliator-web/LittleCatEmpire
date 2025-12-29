function tapCat() {
  if (game.energy <= 0) return;
  game.coins += game.tapPower;
  game.energy--;
  save();
  updateUI();
}
