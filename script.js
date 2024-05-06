// URLs for the Deck of Cards API
const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

// Game state variables
let deckId,
    playerScore = 0,
    computerScore = 0,
    playerDeck = [],
    computerDeck = [],
    playerWonCards = [],
    computerWonCards = [],
    tiedCards = [];

// Initialize game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document loaded and ready');
 
  // Fetch a new shuffled deck and split it between player and computer
  fetch(deckUrl)
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
      return fetch(`${drawUrl}${deckId}/draw/?count=52`);
    })
    .then(res => res.json())
    .then(data => {
      const cards = data.cards;
      playerDeck = cards.slice(0, 26);g
      computerDeck = cards.slice(26);
      console.log('Decks are ready for play');
      
      // Setup event listeners for interactive elements
      addMouseoverEventListeners();
    })
    .catch(error => {
      console.error('Error fetching the deck:', error);
    });
});

// Function to shuffle an array (used for shuffling won cards back into the deck)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// DOM elements
const playButton = document.getElementById("play-round");
const roundResult = document.getElementById("round-result");
const playerCard = document.getElementById("player-card");
const computerCard = document.getElementById("computer-card");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const gameResult = document.getElementById("game-result");

// Event listener for the play round button
playButton.addEventListener("click", playRound);

// Function to play a round of the game
function playRound() {
  // Shuffle won cards back into the deck if necessary
  if (playerDeck.length === 0 && playerWonCards.length > 0) {
    playerDeck = shuffle(playerWonCards);
    playerWonCards = [];
  }
  if (computerDeck.length === 0 && computerWonCards.length > 0) {
    computerDeck = shuffle(computerWonCards);
    computerWonCards = [];
  }

  // Play a round if both players have cards left
  if (playerDeck.length > 0 && computerDeck.length > 0) {
    const playerCardDrawn = playerDeck.shift();
    const computerCardDrawn = computerDeck.shift();

    displayCards([playerCardDrawn, computerCardDrawn]);
    determineRoundWinner(playerCardDrawn, computerCardDrawn);
  } else {
    gameResult.textContent = "Game Over!";
    playButton.disabled = true;
  }
}

// Function to display the drawn cards on the UI
function displayCards(cards) {
  playerCard.innerHTML = `<img src="${cards[0].image}" class="card" title="Cards left: ${playerDeck.length}, Win pile: ${playerWonCards.length}">`;
  computerCard.innerHTML = `<img src="${cards[1].image}" class="card" title="Cards left: ${computerDeck.length}, Win pile: ${computerWonCards.length}">`;
}

// Function to determine the winner of a round
function determineRoundWinner(playerCard, computerCard) {
  const playerCardValue = getCardValue(playerCard.value);
  const computerCardValue = getCardValue(computerCard.value);

  if (playerCardValue > computerCardValue) {
    roundResult.textContent = "Player Wins the Round!";
    playerScore++;
    playerWonCards.push(playerCard, computerCard, ...tiedCards);
    tiedCards = [];
  } else if (playerCardValue < computerCardValue) {
    roundResult.textContent = "Computer Wins the Round!";
    computerScore++;
    computerWonCards.push(playerCard, computerCard, ...tiedCards);
    tiedCards = [];
  } else {
    roundResult.textContent = "It's a Tie!";
    tiedCards.push(playerCard, computerCard);
  }

  updateScores();
}

// Function to convert card values to numerical values for comparison
function getCardValue(cardValue) {
  if (['JACK', 'QUEEN', 'KING'].includes(cardValue)) {
    return 11;
  } else if (cardValue === 'ACE') {
    return 12;
  } else {
    return Number(cardValue);
  }
}

// Function to update the score display
function updateScores() {
  playerScoreDisplay.textContent = `Player Score: ${playerScore} (Cards left: ${playerDeck.length})`;
  computerScoreDisplay.textContent = `Computer Score: