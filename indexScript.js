//Gets balance from localStorage and displays it on index.html
document.addEventListener('DOMContentLoaded', function() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    balanceDisplay.textContent = '$' + (localStorage.getItem('balance') || '0');
});