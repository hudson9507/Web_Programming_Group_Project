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
        checkform();
    });
});
function checkform() {
    const form = document.querySelector('form');
    const formErrors = document.getElementById('formErrors');
    const inputs = form.querySelectorAll('input');

    const fullName = document.getElementById('name');
    const cardNumber = document.getElementById('cardNumber');
    const cvv = document.getElementById('cvv');
    const exp = document.getElementById('expirationDate');
    let messages = [];

    inputs.forEach(input => { if (input.classList.contains('error')) { input.classList.remove('error') } });

    if (fullName.value.length < 1){
        messages.push('Name is required');
        fullName.classList.add('error');
    }
    if(cardNumber.value.length < 13 || cardNumber.value.length > 19){
        messages.push('Card number must be between 13 and 19 digits');
        cardNumber.classList.add('error');
    }
    if(cvv.value.length < 3 || cvv.value.length > 4){
        messages.push('CVV must be 3 or 4 digits');
        cvv.classList.add('error');
    }
    if(exp.value === ''){
        messages.push('Expiration date is required');
        exp.classList.add('error');
    }

    if (messages.length > 0) {
        formErrors.classList.remove('hide');
        formErrors.innerHTML = '<ul>';
        for (let m in messages) {
            formErrors.innerHTML += '<li>' + messages[m] + '</li>';
        }
        formErrors.innerHTML += '</ul>';
    } else {
      formErrors.classList.add('hide');
      formErrors.innerHTML = '';
    }
}