document.addEventListener('DOMContentLoaded', function() {
    const butin = document.querySelector('.submit');
    butin.addEventListener('mouseover', function() {
        butin.style.backgroundColor = 'forestgreen';
    });
    butin.addEventListener('mouseout', function() {
        butin.style.backgroundColor = 'limegreen';
    });
    butin.addEventListener('click', function() {
        const audio = document.querySelector('.coin');
        audio.play();
    });
});