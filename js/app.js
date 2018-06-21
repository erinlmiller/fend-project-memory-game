/*
 * Used FEND P3 tutorial webinar by Mike Wales: https://youtu.be/_rUH-sEs68Y
 */

const cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'
            ];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Start game

function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join(' ');
}

initGame();

//Game functions

var allCards = document.querySelectorAll('.card');
var openCards = [];
var matchingCards = [];

 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     startTimer();
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
       openCards.push(card);
       card.classList.add('open', 'show');
       var firstCardType = openCards[0].dataset.card;
       if (openCards.length == 2) {
         moveCount();
         if (openCards[0].dataset.card == openCards[1].dataset.card) {
           openCards[0].classList.add('match', 'open', 'show');
           openCards[1].classList.add('match', 'open', 'show');
           let match = true;
           matchingCards.push(card);
           openCards = [];
         } else {
           setTimeout(function() {
             openCards.forEach(function(card) {
               card.classList.remove('open', 'show');
             });
             openCards = [];
           }, 1000);
         }
         gameOver();
       }
     }
   });
 });

 //Move counter and star rating system

 let moves = 0;
 let moveCounter = document.querySelector('.moves');
 const stars = document.querySelectorAll('.fa-star');
 let starCount = 3;

 function moveCount() {
   moves++;
   moveCounter.innerHTML = moves;
   if (moves == 1) {
     seconds = 0;
     minutes = 0;
     hours = 0;
     startTimer();
   }
   if (moves > 16 && moves < 20) {
     for (i = 0; i < 3; i++) {
       if (i > 1) {
         stars[i].style.visibility = 'collapse';
         starCount = 2;
       }
     }
   }
   else if (moves > 24) {
     for (i = 0; i < 3; i++) {
       if (i > 0) {
         stars[i].style.visibility = 'collapse';
         starCount = 1;
       }
     }
   }
 }

//timer functions from Chris N on FEND Slack channel

 let sec = 0;
 let min = 0;
 let timer;
 function startTimer() {
   if (!timer) {
     timer = setInterval(insertTime, 1000);
   }
 }

function stopTimer() {
  clearInterval(timer);
  sec = 0;
  min = 0;
}

function insertTime() {
  sec ++;
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (sec >= 60) {
    min++;
    sec = '00';
  }
  document.querySelector('.game-timer').innerHTML = min + ' mins, ' + sec + ' secs';
}

//restart game

var restart = document.querySelector('.restart');
function restartGame() {
  restart.addEventListener('click', function(e) {
    let restart = e.target;
    window.location.reload();
  });
};
restartGame();

//modal

let modal = document.getElementById("modal-game-over");
let modalStats = document.getElementById("stats-text");
const newGameButton = document.getElementById("newGame");
const endGameButton = document.getElementById("endGame");

function gameOver() {
  if (matchingCards.length === 8) {
    clearInterval(timer);
    modal.style.display = "block";
    modalStats.innerText = `You won! Moves: ${moves}, time: ${min} minutes and ${sec} seconds, star rating: ${starCount}. Good job!`
  }
}

newGameButton.addEventListener('click', function() {
  modal.style.display = 'none';
  window.location.reload(false);
});

endGameButton.addEventListener('click', function() {
  modal.style.display = 'none';
  window.close();
});
