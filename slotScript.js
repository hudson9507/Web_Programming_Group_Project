const symbols = [
   "lemon.png",
   "diamond.png",
   "cherry.png",
   "bell.png",
   "bar.png",
   "7.png"
];

function spin() {
   let s1 = symbols[Math.floor(Math.random() * symbols.length)];
   let s2 = symbols[Math.floor(Math.random() * symbols.length)];
   let s3 = symbols[Math.floor(Math.random() * symbols.length)];
   document.getElementById("slot1").src = s1;
   document.getElementById("slot2").src = s2;
   document.getElementById("slot3").src = s3;
   let message = document.getElementById("message");
   if (s1 === s2 && s2 === s3) {
      message.textContent = "🎉 JACKPOT! YOU WIN! 🎉";
   } else {
      message.textContent = "Try again!";
   }
}
document.getElementById("spinBtn").addEventListener("click", spin);
