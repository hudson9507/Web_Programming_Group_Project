document.addEventListener('DOMContentLoaded', function() {
    updateBalanceDisplay();
});

function updateBalanceDisplay() {
    const balance = localStorage.getItem('balance');
    document.getElementById('balanceDisplay').textContent = '$' + balance;
}