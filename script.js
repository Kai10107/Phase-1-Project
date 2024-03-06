const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let deckId = "";
let drawUrl;

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let gameStarted = false;

fetch(deckUrl)
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
    drawUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=`;
  });

    // Event Listeners
    const drawButton = document.getElementById("draw-card");
    const cardDisplay = document.getElementById("card-display");
    const shuffleButton = document.getElementById("shuffle-deck");
    const dealButton = document.getElementById("deal-button");
    const hitButton = document.getElementById("hit-button");

    drawButton.addEventListener("click", () => drawCard()); 
    shuffleButton.addEventListener("click", () => shuffleDeck());
    dealButton.addEventListener("click", () => deal());
    hitButton.addEventListener("click", () => hit());


    // Functions

    function drawCard() {
      const cardCount = document.getElementById("card-count").value;
      const updatedDrawUrl = drawUrl + cardCount;

      fetch(updatedDrawUrl)
      .then(response => response.json())
      .then(data => {
          const cards = data.cards;
          cardDisplay.innerHTML = "";
          cards.forEach(card => displayCard(card)); 
      });
    }
  


    function displayCard(card) {
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardDisplay.appendChild(cardImage);
    }


    function shuffleDeck() {
      fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    }



    function deal() {
      if (gameStarted) {
        alert("Please finish the current game before starting a new one.");
        return;
    }

    resetGame(); 
    fetch(drawUrl + "2") 
        .then(response => response.json())
        .then(data => {
            playerHand = data.cards;
            updatePlayerHandDisplay();
            playerScore = calculateScore(playerHand);
            updateScoreDisplay('player-score', playerScore);
        });

    fetch(drawUrl + "1") 
        .then(response => response.json())
        .then(data => {
            dealerHand.push(data.cards[0]);
            updateDealerHandDisplay();
        });
}


    function hit() {}


    function updatePlayerHandDisplay() {
      const playerHandDisplay = document.getElementById("player-hand");
      playerHandDisplay.innerHtml = "";
      playerHand.forEach(card => displayCard(card));
    }


    function updateDealerHandDisplay() {
      const DealerHandDisplay = document.getElementById("dealer-hand");
      dealerHandDisplay.innerHtml = "";
      dealerHand.forEach(card => displayCard(card));
    }


    function calculateScore(hand) {
      let score = 0;
      let hasAce = false;

  for (const card of hand) {
    let cardValue = card.value;

    if (
      Card.value === "JACK" ||
      card.value === "QUEEN" ||
      card.value === "KING"
    ) {
      cardValue = 10;
    } else if (card.value === "ACE") {
      hasAce = true;
      cardValue = 11;
    }
    score += cardValue;
  }
  if (hasAce && score > 21) {
    score -= 10;
  }
  return score;
}


    function updateScoreDisplay(scoreElementId, score) {
      const scoreDisplay = document.getElementById(scoreElementId);
      scoreDispaly.textContent = 'Score: ' + score;
    }


    function resetGame() {
      playerHand = [];
      dealerHand = [];
      playerScore = 0;
      gameStarted = true;

      updatePlayerHandDisplay();
      updateDealerHandDisplay();
    }