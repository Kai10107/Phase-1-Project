const deckUrl =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let deckId = "";

fetch(deckUrl)
  .then((response) => response.json())
  .then((data) => {
    deckId = data.deck_id;
    const drawUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=`;

    const drawButton = document.getElementById("draw-card");
    const cardDisplay = document.getElementById("card-display");
    const shuffleButton = document.getElementById("shuffle-deck");

    drawButton.addEventListener("click", () => {
      const cardCount = document.getElementById("card-count").value;
      const updatedDrawUrl = drawUrl + cardCount;

      fetch(updatedDrawUrl)
        .then((response) => response.json())
        .then((data) => {
          const cards = data.cards;
          cardDisplay.innerHTML = "";

          cards.forEach((card) => {
            const cardImage = document.createElement("img");
            cardImage.src = card.image;
            cardDisplay.appendChild(cardImage);
          });
        });
    });

    shuffleButton.addEventListener("click", () => {
      fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    });
  });


  let playerHand = [];
  let dealerHand = [];
  let playerScore = 0;
  let gameStarted = false;

  const dealButton = document.getElementById("deal-button");

   dealButton.addEventListener('click', () => {