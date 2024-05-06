const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

let deckId,
    playerScore = 0,
    computerScore = 0,
    playerDeck = [],
    computerDeck = [],
    playerWonCards = [],
    computerWonCards = [],
    tiedCards = []; // Array to hold tied cards

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch(deckUrl)
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id;
    return fetch(`${drawUrl}${deckId}/draw/?count=52`);
  })
  .then(res => res.json())
  .then(data => {
    const cards = data.cards;
    playerDeck = cards.slice(0, 26);
    computerDeck = cards.slice(26);
  });

const playButton = document.getElementById("play-round");
const roundResult = document.getElementById("round-result");
const playerCard = document.getElementById("player-card");
const computerCard = document.getElementById("computer-card");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const gameResult = document.getElementById("game-result");

playButton.addEventListener("click", playRound);

function playRound() {
  if (playerDeck.length === 0 && playerWonCards.length > 0) {
    playerDeck = shuffle(playerWonCards);
    playerWonCards = [];
  }
  if (computerDeck.length === 0 && computerWonCards.length > 0) {
    computerDeck = shuffle(computerWonCards);
    computerWonCards = [];
  }

  if (playerDeck.length > 0 && computerDeck.length > 0) {
    const playerCard = playerDeck.shift();
    const computerCard = computerDeck.shift();

    displayCards([playerCard, computerCard]);
    determineRoundWinner(playerCard, computerCard);
  } else {
    gameResult.textContent = "Game Over!";
    playButton.disabled = true;
  }
}

function displayCards(cards) {
  playerCard.innerHTML = `<img src="${cards[0].image}" class="card" title="Cards left: ${playerDeck.length}, Win pile: ${playerWonCards.length}">`;
  computerCard.innerHTML = `<img src="${cards[1].image}" class="card" title="Cards left: ${computerDeck.length}, Win pile: ${computerWonCards.length}">`;
}
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

function getCardValue(cardValue) {
  if (['JACK', 'QUEEN', 'KING'].includes(cardValue)) {
    return 11;
  } else if (cardValue === 'ACE') {
    return 12;
  } else {
    return Number(cardValue);
  }
}

function updateScores() {
  playerScoreDisplay.textContent = `Player Score: ${playerScore} (Cards left: ${playerDeck.length})`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore} (Cards left: ${computerDeck.length})`;
}

function checkWinCondition() {
  
}