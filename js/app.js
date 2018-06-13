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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join(' ');
}

initGame();

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
         if (matchingCards.length === 8) {
           stopTimer();
         }
       }
     }
   });
 });

 //Move counter and star rating system

 let moves = 0;
 let moveCounter = document.querySelector('.moves');
 const stars = document.querySelectorAll('.fa-star');

 function moveCount() {
   moves++;
   moveCounter.innerHTML = moves;
   if (moves == 1) {
     seconds = 0;
     minutes = 0;
     hours = 0;
     startTimer();
   }
   if (moves > 8 && moves < 10) {
     for (i = 0; i < 3; i++) {
       if (i > 1) {
         stars[i].style.visibility = 'collapse';
       }
     }
   }
   else if (moves > 11) {
     for (i = 0; i < 3; i++) {
       if (i > 0) {
         stars[i].style.visibility = 'collapse';
       }
     }
   }
 }

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
