const values = [1,2,3,4,5,6,7,8,9,"J","Q","K","A"];
let win = true;
let playerHand = [];
let dealerHand = [];
const usercard1 = document.getElementById('userCard1');
const usercard2 = document.getElementById('userCard2');
const dealercard1 = document.getElementById('dealerCard1');
const dealercard2 = document.getElementById('dealerCard2');

function dealCards(){

    calculateHand(playerHand, dealerHand);
}

function calculateHand(player, dealer){
    if (win){
        handleWin();
    } else {
        handleLoss();
    }
}

function handleWin(){

}

function handleLoss(){

}

document.getElementById('dealBtnB').addEventListener('click', dealCards());