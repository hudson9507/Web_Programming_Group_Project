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
   const betAmountSelect = document.getElementById("betAmountSelect");
   const spinButton = document.getElementById("spinButton");
   const resultNumberEl = document.getElementById("resultNumber");
   const resultColorEl = document.getElementById("resultColor");
   const messageEl = document.getElementById("message");
   const wheelEl = document.getElementById("wheel");
   const balanceDisplay = document.getElementById('balanceDisplay');

   // Get current balance from localStorage (number)
   let currentBalance = parseInt(localStorage.getItem('balance'), 10) || 0;

   // Populate betAmountSelect with sensible options based on balance
   // Preserve previously selected value (and saved value in localStorage)
   function populateBetOptions() {
      if (!betAmountSelect) return;
      const prev = betAmountSelect.value;
      const saved = parseInt(localStorage.getItem('rouletteBetAmount'), 10) || null;
      betAmountSelect.innerHTML = '';
      const presets = [1,5,10,25,50,100];
      presets.forEach(v => {
         if (v <= currentBalance) {
            const opt = document.createElement('option');
            opt.value = v;
            opt.textContent = '$' + v;
            betAmountSelect.appendChild(opt);
         }
      });
      if (currentBalance > 0) {
         const allIn = document.createElement('option');
         allIn.value = currentBalance;
         allIn.textContent = 'All in ($' + currentBalance + ')';
         betAmountSelect.appendChild(allIn);
      }
      // If no options were added, add a disabled option
      if (!betAmountSelect.options.length) {
         const opt = document.createElement('option');
         opt.value = 0;
         opt.textContent = 'No funds';
         opt.disabled = true;
         betAmountSelect.appendChild(opt);
      }

      // Try to restore saved selection (saved takes precedence), otherwise previous selection
      const tryValue = saved || prev;
      if (tryValue) {
         const found = Array.from(betAmountSelect.options).some(o => o.value == tryValue);
         if (found) {
            betAmountSelect.value = tryValue;
         }
      }
      // Save current selection to localStorage so it persists across reloads
      if (betAmountSelect.value) localStorage.setItem('rouletteBetAmount', betAmountSelect.value);
   }

   function updateBalanceDisplay() {
      if (balanceDisplay) balanceDisplay.textContent = '$' + currentBalance;
      localStorage.setItem('balance', currentBalance);
   }

   // Restore saved bet type if present
   const savedBetType = localStorage.getItem('rouletteBetType');
   if (savedBetType && betTypeSelect) {
      // If the option exists, set it
      if (Array.from(betTypeSelect.options).some(o => o.value === savedBetType)) {
         betTypeSelect.value = savedBetType;
      }
   }

   // When user changes selection, persist it
   if (betAmountSelect) {
      betAmountSelect.addEventListener('change', () => {
         localStorage.setItem('rouletteBetAmount', betAmountSelect.value);
      });
   }
   if (betTypeSelect) {
      betTypeSelect.addEventListener('change', () => {
         localStorage.setItem('rouletteBetType', betTypeSelect.value);
      });
   }

   populateBetOptions();
   updateBalanceDisplay();

   let currentRotation = 0;

   spinButton.addEventListener("click", () => {
      const bet = betTypeSelect.value;
      const betAmt = betAmountSelect ? parseInt(betAmountSelect.value, 10) || 0 : 0;

      if (!bet) {
         messageEl.textContent = "Please choose a bet type first.";
         messageEl.className = "";
         return;
      }

      if (!betAmt || betAmt <= 0) {
         messageEl.textContent = "Please choose a bet amount.";
         messageEl.className = "";
         return;
      }

      if (betAmt > currentBalance) {
         messageEl.textContent = "Insufficient funds for that bet.";
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
            // Even-money payout: win returns bet (1:1)
            currentBalance += betAmt;
            updateBalanceDisplay();
            messageEl.textContent = "YOU WIN!";
            messageEl.className = "win";
         } else {
            // Lose: subtract bet
            currentBalance -= betAmt;
            if (currentBalance < 0) currentBalance = 0;
            updateBalanceDisplay();
            messageEl.textContent = "You lose. Try again!";
            messageEl.className = "lose";
         }

         // Re-populate bet options in case balance changed
         populateBetOptions();

         spinButton.disabled = false;
      }, 2000); 
   });
});