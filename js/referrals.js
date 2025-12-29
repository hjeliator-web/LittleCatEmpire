const refDiv = document.getElementById("referrals");
const user = tg.initDataUnsafe?.user;

refDiv.innerHTML = `
<div class="card">
Your ID: ${user?.id}
<br>Invite link:
<br>t.me/YOUR_BOT?start=${user?.id}
</div>
`;
const startParam = Telegram.WebApp.initDataUnsafe.start_param;
if (startParam && startParam !== user.id) {
  // save referral once
}
