const values = [1,2,3,4,5,6,7,8,9,"J","Q","K","A"];
let playerHand = [];
let dealerHand = [];
const usercard1 = document.getElementById('userCard1');
const usercard2 = document.getElementById('userCard2');
const dealercard1 = document.getElementById('dealerCard1');
const dealercard2 = document.getElementById('dealerCard2');

function dealCards(){
    playerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)]];
    dealerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)]];
    calculateHand(playerHand, false);
    calculateHand(dealerHand, true);
    updatecardDisplay();
}

function calculateHand(cards, dealer = false){
    let aceCount = 0;
    for (card in cards) {
        if (isNaN(cards[card])){
            switch(cards[card]){
                case "J":
                    cards[card] = 10;
                    break;
                case "Q":
                    cards[card] = 10;
                    break;
                case "K":
                    cards[card] = 10;
                    break;
                case "A":
                    aceCount += 1;
                    break;
            }
            if (aceCount > 0){
                handleAce(card, dealer);
            }
        } else {
            player[card] = parseInt(player[card]);
        }
    }
    console.log(player);
}

function handleWin(){
    resetGame();
}

function handleLoss(){
    resetGame();
}

function resetGame(){
    playerHand = [];
    dealerHand = [];
    usercard1.src = "public/img/blackjack/cardBackRed.png";
    usercard2.src = "public/img/blackjack/cardBackRed.png";
    dealercard1.src = "public/img/blackjack/cardBackRed.png";
    dealercard2.src = "public/img/blackjack/cardBackRed.png";
}

function updatecardDisplay(){
    usercard1.src = "public/img/blackjack/cardBackRed.png";
    usercard2.src = "public/img/blackjack/cardBackRed.png";
    dealercard1.src = "public/img/blackjack/cardBackRed.png";
    dealercard2.src = "public/img/blackjack/cardBackRed.png";
}

function handleAce(index, dealer){
    if (dealer == false) {
        let choice = prompt("You drew an Ace! Should it count as 1 or 11?", "11");

        if (choice === "11") {
            player[index] = 11;
        } else {
            player[index] = 1;
        }
    }
    if (dealer == true) {
        if (dealerHand[0] + 11 > 21) {
            dealerHand[index] = 1;
        } else {
            dealerHand[index] = 11;
        }

}

document.getElementById('dealBtnB').addEventListener('click', dealCards);