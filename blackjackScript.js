const values = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const faces = ["club","diamond","heart","spade"];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
const usercard1 = document.getElementById('userCard1');
const usercard2 = document.getElementById('userCard2');
const dealercard1 = document.getElementById('dealerCard1');
const dealercard2 = document.getElementById('dealerCard2');
const scoreDisplayPlayer = document.getElementById('player-score');
const scoreDisplayDealer = document.getElementById('dealer-score');
const deal = document.getElementById('dealBtn');
const hit = document.getElementById('hitBtn');
const stand = document.getElementById('standBtn');

function dealCards(){
    playerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)], 0, 0, 0];
    dealerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)], 0, 0, 0];
    updatecardDisplay();
    calculateHand(playerHand, false);
    calculateHand(dealerHand, true);
    scoreDisplayDealer.textContent = dealerScore;
    scoreDisplayPlayer.textContent = playerScore;
    deal.disabled = true;
    hit.disabled = false;
    stand.disabled = false;
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
                    cards[card] = 0;
                    aceCount += 1;
                    break;
            }

        } else {
            cards[card] = parseInt(cards[card]);
        }
    }
    if (dealer == false){
        playerScore += playerScore + cards[0] + cards[1];
    } else {
        dealerScore += dealerScore + cards[0] + cards[1];
    }
    if (aceCount > 0){
        handleAce(card, dealer);
    }
    console.log(cards);
}

function hitOrStand(didHit){
    if (didHit == true){
        let draw
    } else {

    }
}

function dealerLogic(){

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
    usercard3.src = "public/img/blackjack/cardBackRed.png";
    usercard4.src = "public/img/blackjack/cardBackRed.png";
    usercard5.src = "public/img/blackjack/cardBackRed.png";
    dealercard1.src = "public/img/blackjack/cardBackRed.png";
    dealercard2.src = "public/img/blackjack/cardBackRed.png";
    dealercard3.src = "public/img/blackjack/cardBackRed.png";
    dealercard4.src = "public/img/blackjack/cardBackRed.png";
    dealercard5.src = "public/img/blackjack/cardBackRed.png";
    playerScore = 0;
    dealerScore = 0;
}

function updatecardDisplay(){
    usercard1.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${playerHand[0]}.png`;
    usercard2.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${playerHand[1]}.png`;
    dealercard1.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${dealerHand[0]}.png`;
    dealercard2.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${dealerHand[1]}.png`;
    if (playerHand[2] != 0){
        usercard3.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${playerHand[2]}.png`;
    }
    if (playerHand[3] != 0){
        usercard4.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${playerHand[3]}.png`;
    }
    if (playerHand[4] != 0){
        usercard5.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${playerHand[4]}.png`;
    }
    if (dealerHand[2] != 0){
        dealercard3.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${dealerHand[2]}.png`;
    }
    if (dealerHand[3] != 0){
        dealercard4.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${dealerHand[3]}.png`;
    }
    if (dealerHand[4] != 0){
        dealercard5.src = `public/img/blackjack/${faces[Math.floor(Math.random() * 4)]}/${dealerHand[4]}.png`;
    }
}

function handleAce(index, dealer){
    if (dealer == false) {
        let choice = prompt(`You drew an Ace! Should it count as 1 or 11? You currently have: ${playerScore}`, "11");
        if (choice === "11") {
            playerScore += 11;
            playerHand[index] = 11;
        } else {
            playerScore += 1;
            playerHand[index] = 1;
        }
    }
    if (dealer == true) {
        if (!(dealerScore + 11 > 21)) {
            dealerScore += 11;
            dealerHand[index] = 11;
        } else {
            dealerScore += 1;
            dealerHand[index] = 1;
        }
    }
}

deal.addEventListener('click', dealCards);
hit.addEventListener('click', hitOrStand(true));
stand.addEventListener('click', hitOrStand(false));