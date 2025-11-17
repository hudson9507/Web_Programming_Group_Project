//initialize global variables for the game
const values = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const faces = ["club","diamond","heart","spade"];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

//get HTML elements
const usercard1 = document.getElementById('usercard1');
const usercard2 = document.getElementById('usercard2');
const usercard3 = document.getElementById('usercard3');
const usercard4 = document.getElementById('usercard4');
const usercard5 = document.getElementById('usercard5');
const dealercard1 = document.getElementById('dealercard1');
const dealercard2 = document.getElementById('dealercard2');
const dealercard3 = document.getElementById('dealercard3');
const dealercard4 = document.getElementById('dealercard4');
const dealercard5 = document.getElementById('dealercard5');
const scoreDisplayPlayer = document.getElementById('player-score');
const scoreDisplayDealer = document.getElementById('dealer-score');
const deal = document.getElementById('dealBtn');
const hit = document.getElementById('hitBtn');
const stand = document.getElementById('standBtn');
const message = document.getElementById('message');
//get player balance from localStorage
let playerBalance = parseInt(localStorage.getItem('balance'));

//Function to start a new game of blackjack
function game(){
    //reset game state at tjhe start of a new game to ensure no leftover data
    resetGame();
    //get bet amount from input
    const betInput = parseInt(document.getElementById('betAmount').value);
    //check if bet amount is valid and user has enough balance then deal initial cards
    if(betInput > 0 && !isNaN(betInput) && betInput <= playerBalance){
        playerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)], 0, 0, 0];
        dealerHand = [values[Math.floor(Math.random() * values.length)], values[Math.floor(Math.random() * values.length)], 0, 0, 0];
        updatecardDisplay();
        calculateHand(playerHand, false);
        calculateHand(dealerHand, true);
        scoreDisplayDealer.textContent = dealerScore;
        scoreDisplayPlayer.textContent = playerScore;
        evaluateGame(true);
    } else {
        message.textContent = "Please enter a valid integer bet amount greater than 0 to start the game!";
    }
}

//Function to evaluate the game state
function evaluateGame(initial, standed){
    //check for blackjack or win/loss conditions
    if (dealerScore == 21 && playerScore == 21){
            message.textContent = "It's a push! Both you and the dealer have Blackjack!";
            resetGame();
    } else if (dealerScore == 21){
        message.textContent = `Dealer has Blackjack! You lose ${parseInt(document.getElementById('betAmount').value)}!`;
        handleLoss(parseInt(document.getElementById('betAmount').value));
    } else if (playerScore == 21){
        message.textContent = `Blackjack! You win! ${parseInt(document.getElementById('betAmount').value) * 2}!`;
        handleWin(parseInt(document.getElementById('betAmount').value));
    //if this is the initial deal disable deal button and enable hit/stand buttons
    } else if (initial == true){
        deal.disabled = true;
        hit.disabled = false;
        stand.disabled = false;
    //if the player has stood evaluate final scores
    } else if (standed == true){
        //determine winner or push
        if (playerScore == dealerScore){
            message.textContent = "It's a push!";
            deal.disabled = false;
            hit.disabled = true;
            stand.disabled = true;
        }else if (dealerScore > 21){
            message.textContent = `Dealer busts! You win! You won ${parseInt(document.getElementById('betAmount').value) * 2}!`;
            handleWin(parseInt(document.getElementById('betAmount').value));
        } else if (21 < playerScore){
            message.textContent = `You lose! You lost ${parseInt(document.getElementById('betAmount').value)}!`;
            handleLoss(parseInt(document.getElementById('betAmount').value));
        } else if (playerScore > dealerScore){
            message.textContent = `You win! You won ${parseInt(document.getElementById('betAmount').value) * 2}!`;
            handleWin(parseInt(document.getElementById('betAmount').value));
        } else{
            message.textContent = `You lose! You lost ${parseInt(document.getElementById('betAmount').value)}!`;
            handleLoss(parseInt(document.getElementById('betAmount').value));
        }
    } else{
        return;
    }
}

//Function to calculate the score of a hand
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
        playerScore = cards[0] + cards[1] + cards[2] + cards[3] + cards[4];
    } else {
        dealerScore = cards[0] + cards[1] + cards[2] + cards[3] + cards[4];
    }
    if (aceCount > 0){
        handleAce(card, dealer);
    }
    if (!dealer && playerScore > 21) {
    message.textContent = "Bust! You went over 21!";
    handleLoss(parseInt(document.getElementById('betAmount').value));
    }

    if (dealer && dealerScore > 21) {
        message.textContent = "Dealer busts! You win!";
        handleWin(parseInt(document.getElementById('betAmount').value));
    }
}

//Function to handle player hitting or standing
function hitOrStand(didHit){
    if (didHit == true){
        if (playerHand[2] == 0){
            playerHand[2] = values[Math.floor(Math.random() * values.length)];
        } else if (playerHand[3] == 0){
            playerHand[3] = values[Math.floor(Math.random() * values.length)];
        } else if (playerHand[4] == 0){
            playerHand[4] = values[Math.floor(Math.random() * values.length)];
        }
        dealerLogic();
        calculateHand(playerHand, false);
        calculateHand(dealerHand, true);
        updatecardDisplay();
        scoreDisplayDealer.textContent = dealerScore;
        scoreDisplayPlayer.textContent = playerScore;
        evaluateGame(false,false);
    } else {
        dealerLogic();
        calculateHand(playerHand, false);
        calculateHand(dealerHand, true);
        updatecardDisplay();
        scoreDisplayDealer.textContent = dealerScore;
        scoreDisplayPlayer.textContent = playerScore;
        evaluateGame(false,true);
    }
}

//Function for dealer's logic
function dealerLogic(){
    if (dealerScore < 15){
        if (dealerHand[2] == 0){
            dealerHand[2] = values[Math.floor(Math.random() * values.length)];
        } else if (dealerHand[3] == 0){
            dealerHand[3] = values[Math.floor(Math.random() * values.length)];
        } else if (dealerHand[4] == 0){
            dealerHand[4] = values[Math.floor(Math.random() * values.length)];
        } else {
            //this should never happen since if 5 cards are reached the user wins automatically and it is handled before this function is called
            handleWin(document.getElementById('betAmount').value);
            message.textContent = "Maximum cards reached! You win by default!";
        }
    }
}

//Function to handle a win
function handleWin(money){
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    playerBalance -= money;
    playerBalance += money*2
    localStorage.setItem('balance', playerBalance);
    return;
}

//Function to handle a loss
function handleLoss(money){
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    playerBalance -= money;
    localStorage.setItem('balance', playerBalance);
    return;
}

//Function to reset the game state
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
    message.textContent = "";
    scoreDisplayDealer.textContent = dealerScore;
    scoreDisplayPlayer.textContent = playerScore;
}

//Function to update the card images and balance display
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
    document.getElementById('balanceDisplay').textContent = '$' + playerBalance;
}

//Function to handle Ace value choice for player and dealer
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

//Add event listeners to buttons
deal.addEventListener('click', game);
hit.addEventListener('click', () => hitOrStand(true));
stand.addEventListener('click', () => hitOrStand(false));