//global variable of the current balance
let currBalance = 0;
const betButton = document.getElementById('betBtnB');

//Update balance display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateBalanceDisplay();
});
document.addEventListener(onclick, blackjack());


//Updates the balance display
function updateBalanceDisplay() {
    const stored = localStorage.getItem('balance');
    const balance = stored ? parseInt(stored, 10) : 0;

    currBalance = balance;

    document.getElementById('balanceDisplay').textContent = '$' + currBalance;
}

function blackjack() {
    const betInput = document.getElementById('betInputB').value;
    if (betInput % 1 != 0 ){
        betInput = Math.floor(betInput);
    }
    if (betInput <= 0) {
        betInput = 1;
    }
}