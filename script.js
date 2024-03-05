const deckUrl =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let deckId = "";

fetch(deckUrl)
  .then((response) => response.json())
  .then((data) => {
    deckId = data.deck_id;
    console.log(data);
  });

const drawButton = document.getElementById("draw-card");
const cardDisplay = document.getElementById("card-display");
const shuffleButton = document.getElementById("shuffle-deck");

drawButton.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      const card = data.cards[0];
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardDisplay.appendChild(cardImage);
    });
});

shuffleButton.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
  console.log("Deck shuffled!");
});
