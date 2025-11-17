//Basic interactivity for the payment page including sound on the submit button
document.addEventListener('DOMContentLoaded', function() {
    const butin = document.querySelector('.submit');
    butin.addEventListener('mouseover', function() {
        butin.style.backgroundColor = 'forestgreen';
    });
    butin.addEventListener('mouseout', function() {
        butin.style.backgroundColor = 'limegreen';
    });
    butin.addEventListener('click', function() {
        checkform();
    });
});
//Function to allow only digits in specific input fields
function allowOnlyDigits(input) {
    input.addEventListener('input', () =>{
        input.value = input.value.replace(/\D/g, '');
    });
}
allowOnlyDigits(cardNumber);
allowOnlyDigits(cvv);
allowOnlyDigits(amount);

//Function to validate the payment form
function checkform() {
    //Get form elements
    const form = document.querySelector('form');
    const formErrors = document.getElementById('formErrors');
    const inputs = form.querySelectorAll('input');
    const fullName = document.getElementById('name');
    const cardNumber = document.getElementById('cardNumber');
    const cvv = document.getElementById('cvv');
    const exp = document.getElementById('expirationDate');
    const amount = document.getElementById('amount');
    let messages = [];

    //Clear previous errors
    inputs.forEach(input => { if (input.classList.contains('error')) { input.classList.remove('error') } });

    //Check for form errors
    if (fullName.value.length < 1){
        messages.push('Name is required');
        fullName.classList.add('error');
    }
    if(!/^\d{13,19}$/.test(cardNumber.value)){
        messages.push('Card number must be between 13 and 19 digits.');
        cardNumber.classList.add('error');
    }
    if(!/^\d{3,4}$/.test(cvv.value)){
        messages.push('CVV must be 3 or 4 digits');
        cvv.classList.add('error');
    }
    if(exp.value === ''){
        messages.push('Expiration date is required');
        exp.classList.add('error');
    }
    if(amount.value === '' || amount.value <= 0 || amount.value % 1 !== 0){
        messages.push('Please enter a valid integer number to add');
        amount.classList.add('error');
    }

    //Display errors
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
            try {
                addMoney(amount.value);
            } catch (err) {
                console.error('Error adding money:', err);
                formErrors.classList.remove('hide');
                formErrors.innerHTML = '<p>Unexpected error processing payment. Please try again.</p>';
            }
    }
}

//Function to add money to the user's balance
function addMoney(amount) {
    const addValue = parseInt(amount, 10);

    //Get the current balance from localStorage, or default to 0 if not set
    let currentBalance = 0;
    try {
        const stored = localStorage.getItem('balance');
        currentBalance = parseInt(stored, 10);
        if (isNaN(currentBalance)) currentBalance = 0;
    } catch (err) {
        console.error('Failed to read balance from localStorage:', err);
        currentBalance = 0;
    }

    //Update the balance
    const newBalance = currentBalance + addValue;

    //Save it back to localStorage
    try {
        localStorage.setItem('balance', newBalance);
    } catch (err) {
        console.error('Failed to save balance to localStorage:', err);
        // continue — user still hears coin and is redirected, but storage failed
    }

    //Play coin sound and redirect after sound ends
    const audio = document.querySelector('.coin');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});           // ignore autoplay errors
        audio.addEventListener('ended', () => { // go after sound finishes
        document.getElementById('paymentForm')?.reset();
        window.location.href = 'index.html';
        }, { once: true });
    } else {
        document.getElementById('paymentForm')?.reset();
        window.location.href = 'index.html';
    }
}