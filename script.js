'use strict';

// PIG Game

// Selecting the elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // we can do it this way !!

const scoreCurr0 = document.getElementById('current--0');
const scoreCurr1 = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnRollDiceEl = document.querySelector('.btn--roll');
const btnHoldDiceEl = document.querySelector('.btn--hold');
const btnNewGameEl = document.querySelector('.btn--new');

// function
const switchPlayer = function () {
  score = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = score;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Instead of adding or removing the classes , we can toggle the class
  // it will add the class , if it is not present
  // and it will remove the class , if it is present
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// declaring the variables , and later in the function initialising them
let bothScore, activePlayer, score, playing;

// we need initialize in 2 cases
// 1. when we are starting the game
// 2. when we are completeed the game , and now starting a new game
const initializeGame = function () {
  bothScore = [0, 0];
  activePlayer = 0;
  score = 0;
  playing = true; // describe the state of game !!
  // Initial Conditions !!
  score0El.textContent = 0;
  score1El.textContent = 0;
  scoreCurr0.textContent = 0;
  scoreCurr1.textContent = 0;

  // INItail classes settings
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// calling the function Initialize so that we define all the settings/ configurations
initializeGame();

// Event listeners

btnRollDiceEl.addEventListener('click', function () {
  if (playing) {
    // 1. Generate the random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the Dice
    //   console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      // add to next score
      score += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = score;
    } else {
      // switch to next player

      switchPlayer();
    }
  }
});

btnHoldDiceEl.addEventListener('click', function () {
  if (playing) {
    // update the current score
    bothScore[activePlayer] += score;

    document.querySelector(`#score--${activePlayer}`).textContent =
      bothScore[activePlayer];
    //check if 100 or not
    if (bothScore[activePlayer] >= 50) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // removing , so we can start the game newly
      diceEl.classList.add('hidden');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// to start the new game !!
btnNewGameEl.addEventListener('click', initializeGame);
