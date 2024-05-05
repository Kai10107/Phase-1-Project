const deckUrl =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

let deckId,
  playerScore = 0,
  computerScore = 0;

  let playerDeck = [];
  let computerDeck = [];

fetch(deckUrl)
  .then((res) => res.json())
  .then((data) => {
   deckId = data.deck_id;
   return fetch(`${drawUrl}${deckId}/draw/?count=52`);
  })
  .then((res) => res.json())
  .then((data) => {
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
 
  if (playerDeck.length === 0 || computerDeck.length === 0) {
   
    return;
  }

 
  const playerCard = playerDeck.shift();
  const computerCard = computerDeck.shift();

  displayCards([playerCard, computerCard]);
  determineRoundWinner(playerCard, computerCard);
}


function displayCards(cards) {
  playerCard.innerHTML = `<img src="${cards[0].image}" class="card">`;
  computerCard.innerHTML = `<img src="${cards[1].image}" class="card">`;
}

function determineRoundWinner(playerCard, computerCard) {
   
  const playerCardValues = getCardValue(playerCard.value);
  const computerCardValues = getCardValue(computerCard.value);

    if (playerCardValue > computerCardValue) {
        roundResult.textContent = "Player Wins the Round!";
        playerScore++;
        
    } else if (playerCardValue < computerCardValue) {
        roundResult.textContent = "Computer Wins the Round!";
        computerScore++;
         
    } else {
        roundResult.textContent = "It's a Tie!";
    }

    updateScores();
    checkWinCondition();
}
function getCardValue(cardValue) {
  if (['JACK', 'QUEEN', 'KING'].includes(cardValue)) {
    return 11;
  } else if (cardValue === 'ACE') {
    return 12;
  } else {
    return parseInt(cardValue);
  }
}




function updateScores() {
  playerScoreDisplay.textContent = "Player Score: " + playerScore;
  computerScoreDisplay.textContent = "Computer Score: " + computerScore;
}

function checkWinCondition() {
  if (playerScore >= 10) {
      gameResult.textContent = "Player Wins!";
      playButton.disabled = true; 
  } else if (computerScore >= 10) {
      gameResult.textContent = "Computer Wins!";
      playButton.disabled = true; 
  }
}