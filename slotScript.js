const symbols = [
   "./public/img/slots/lemon.png",
   "./public/img/slots/diamond.png",
   "./public/img/slots/cherry.png",
   "./public/img/slots/bell.png",
   "./public/img/slots/bar.png",
   "./public/img/slots/7.png"
];

function spin() {
   const betAmt = parseInt(document.getElementById("betAmount").value);
   if (isNaN(betAmt) || betAmt <= 0) {
      const s1 = symbols[Math.floor(Math.random() * symbols.length)];
      const s2 = symbols[Math.floor(Math.random() * symbols.length)];
      const s3 = symbols[Math.floor(Math.random() * symbols.length)];
      document.getElementById("slot1").src = s1;
      document.getElementById("slot2").src = s2;
      document.getElementById("slot3").src = s3;
      let message = document.getElementById("message");
      if (s1 === s2 && s2 === s3) {
         handleWin(betAmt);
      } else {
         message.textContent = "Try again!";
      }
   } else {
      message.textContent = "Please enter a valid integer bet amount greater than 0.";
   }
}

function handleWin(bet){
   console.log(bet);
   console.log("beef");
   message.textContent = "🎉 JACKPOT! YOU WIN! 🎉";
}

function handleLoss(bet){
   console.log(bet);
   message.textContent = "Better luck next time!";
}
document.getElementById("spinBtn").addEventListener("click", spin);
