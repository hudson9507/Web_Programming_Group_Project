//global variable of the current balance
let currBalance = 0;

//Update balance display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateBalanceDisplay();
});

//Updates the balance display
function updateBalanceDisplay() {
    const stored = localStorage.getItem('balance');
    const balance = stored ? parseInt(stored, 10) : 0;

    currBalance = balance;

    document.getElementById('balanceDisplay').textContent = '$' + currBalance;
}