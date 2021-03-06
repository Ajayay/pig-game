'use strict';
//select elements and initialize variables
const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.getElementById('score--1');
const togglePlayer0 = document.querySelector('.player--0');
const togglePlayer1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const rollDiceButton = document.querySelector('.btn--roll');
const holdDiceButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');

//initialize variables for player's and current's score logic
let playerMainScore = [0, 0];
let currentScore = 0;

// initilaize playing state
let playing = true;

// initializing active player
let activePlayer = 0;

// initialize players score as zero at game start
scorePlayer1.textContent = 0;
scorePlayer2.textContent = 0;

// hide the untill the roll dice is clicked
diceElement.style.display = 'none';

//siwtch player function
const switchPlayer = function() {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  togglePlayer0.classList.toggle('player--active');
  togglePlayer1.classList.toggle('player--active');
};

// ask player for names
let userName = '';
playerName0.addEventListener('click', changePlayer0Name);
playerName1.addEventListener('click', changePlayer1Name);
function changePlayer0Name() {
  userName = prompt('enter player1 name');
  playerName0.textContent = userName;
}

function changePlayer1Name() {
  userName = prompt('enter player2 name');
  playerName1.textContent = userName;
}

//add event listner for roll dice button
rollDiceButton.addEventListener('click', onDiceRoll);
function onDiceRoll() {
  if (playing) {
    diceElement.style.display = 'block';
    const generateRandomNumber = Number(Math.trunc(Math.random() * 6) + 1);
    diceElement.src = `dice-${generateRandomNumber}.png`;

    if (generateRandomNumber == 1) {
      switchPlayer();
    } else {
      currentScore = currentScore + generateRandomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
}

//add event listner for hold dice button
holdDiceButton.addEventListener('click', onDiceHold);
function onDiceHold() {
  if (playing) {
    playerMainScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerMainScore[activePlayer];
    if (playerMainScore[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceElement.style.display = 'none';
    } else {
      switchPlayer();
    }
  }
}
//add event listner for new game button
newGameButton.addEventListener('click', resetButton);
function resetButton() {
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScore = 0;
  playerMainScore = [0, 0];
  activePlayer = 0;
  document.getElementById('current--0').textContent = currentScore;
  document.getElementById('current--1').textContent = currentScore;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playing = true;
}
