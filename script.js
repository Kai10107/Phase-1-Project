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


    drawButton.addEventListener("click", () => drawCard()); 
    shuffleButton.addEventListener("click", () => shuffleDeck());



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



