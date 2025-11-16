const redNumbers = [
   1, 3, 5, 7, 9, 12, 14, 16, 18,
   19, 21, 23, 25, 27, 30, 32, 34, 36
];

const blackNumbers = [
   2, 4, 6, 8, 10, 11, 13, 15, 17,
   20, 22, 24, 26, 28, 29, 31, 33, 35
];

document.addEventListener("DOMContentLoaded", () => {
   const betTypeSelect = document.getElementById("betType");
   const spinButton = document.getElementById("spinButton");
   const resultNumberEl = document.getElementById("resultNumber");
   const resultColorEl = document.getElementById("resultColor");
   const messageEl = document.getElementById("message");
   const wheelEl = document.getElementById("wheel");

   let currentRotation = 0;

   spinButton.addEventListener("click", () => {
      const bet = betTypeSelect.value;

      if (!bet) {
         messageEl.textContent = "Please choose a bet type first.";
         messageEl.className = "";
         return;
      }
      spinButton.disabled = true;

      const extraRotation = 720 + Math.floor(Math.random() * 360); 
      currentRotation += extraRotation;
      wheelEl.style.transform = `rotate(${currentRotation}deg)`;

      setTimeout(() => {
         const number = Math.floor(Math.random() * 37);

         let color = "Green";
         if (redNumbers.includes(number)) {
            color = "Red";
         } else if (blackNumbers.includes(number)) {
            color = "Black";
         }

         wheelEl.textContent = number;

         resultNumberEl.textContent = `Number: ${number}`;
         resultColorEl.textContent = `Color: ${color}`;

         let isWin = false;

         if (number !== 0) {
            if (bet === "red" && color === "Red") isWin = true;
            if (bet === "black" && color === "Black") isWin = true;
            if (bet === "odd" && number % 2 === 1) isWin = true;
            if (bet === "even" && number % 2 === 0) isWin = true;
         }

         if (isWin) {
            messageEl.textContent = "YOU WIN!";
            messageEl.className = "win";
         } else {
            messageEl.textContent = "You lose. Try again!";
            messageEl.className = "lose";
         }

         spinButton.disabled = false;
      }, 2000); 
   });
});