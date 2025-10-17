document.addEventListener('DOMContentLoaded', function() {
    const butin = document.querySelector('.submit');
    butin.addEventListener('mouseover', function() {
        butin.style.backgroundColor = 'forestgreen';
    });
    butin.addEventListener('mouseout', function() {
        butin.style.backgroundColor = 'limegreen';
    });
});

document.getElementById('.submit').addEventListener('click', function() {
    const audio = document.getElementById('clickSound');
    audio.play();
});