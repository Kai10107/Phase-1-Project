const deckUrl =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

let deckId,
  playerScore = 0,
  computerScore = 0;

fetch(deckUrl)
  .then((res) => res.json())
  .then((data) => (deckId = data.deck_id));

const playButton = document.getElementById("play-round");
const roundResult = document.getElementById("round-result");
const playerCard = document.getElementById("player-card");
const computerCard = document.getElementById("computer-card");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const gameResult = document.getElementById("game-result");

playButton.addEventListener("click", playRound);


function playRound() {
  playerCard.innerHTML = computerCard.innerHTML = ''; 
  fetch(drawUrl + deckId + "/draw/?count=2")
      .then(res => res.json())
      .then(data => {
          displayCards(data.cards);
          determineRoundWinner(data.cards);
      }); 
}


function displayCards(cards) {
  playerCard.innerHTML = `<img src="${cards[0].image}">`;
  computerCard.innerHTML = `<img src="${cards[1].image}">`;
}


function determineRoundWinner(cards) {}


function getCardValues(cards) {}


function updateScores() {}


function checkWinCondition() {}
