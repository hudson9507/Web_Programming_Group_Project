//set up slot machine symbols and multipliers
const symbols = [
   "./public/img/slots/lemon.png",
   "./public/img/slots/diamond.png",
   "./public/img/slots/cherry.png",
   "./public/img/slots/bell.png",
   "./public/img/slots/bar.png",
   "./public/img/slots/7.png"
];
const multipliers = [2,50,5,10,20,100];

//get current balance from localStorage and balance display element
let currentBalance = localStorage.getItem('balance');
const balanceDisplay = document.getElementById('balanceDisplay');

//Initialize balance display on page load
balanceDisplay.textContent = 'Balance: $' + (currentBalance);

//Function to handle spinning the slot machine
function spin() {
   const betAmt = parseInt(document.getElementById("betAmount").value);
   if (!isNaN(betAmt) && betAmt != 0 && currentBalance >= betAmt) {
      const n1 = Math.floor(Math.random() * symbols.length);
      const s1 = symbols[n1]
      const s2 = symbols[Math.floor(Math.random() * symbols.length)];
      const s3 = symbols[Math.floor(Math.random() * symbols.length)];
      document.getElementById("slot1").src = s1;
      document.getElementById("slot2").src = s2;
      document.getElementById("slot3").src = s3;
      let message = document.getElementById("message");
      if (s1 === s2 && s2 === s3) {
         handleWin(betAmt, multipliers[n1]);
      } else {
         handleLoss(betAmt);
      }
   } else {
      message.textContent = "Please enter a valid integer bet amount greater than 0 and make sure that you have enough money for your bet!";
   }
}

//Function to handle a win
function handleWin(bet, mult){
   //set message text
   message.textContent = `🎉 JACKPOT! YOU WIN! YOU WON ${bet*mult}🎉`;
   //update balance
   currentBalance = parseInt(currentBalance + (bet * mult));
   localStorage.setItem('balance', currentBalance);
   balanceDisplay.textContent = 'Balance: $' + (currentBalance);
}

//Function to handle a loss
function handleLoss(bet){
   //set message text
   message.textContent = "Better luck next time!";
   //update balance
   currentBalance = parseInt(currentBalance - bet);
   localStorage.setItem('balance', currentBalance);
   balanceDisplay.textContent = 'Balance: $' + (currentBalance);
}

//add event listener to spin button
document.getElementById("spinBtn").addEventListener("click", spin);
