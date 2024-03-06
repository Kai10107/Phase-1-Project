const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

fetch(deckUrl)
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
   
  function drawCards(count) {
    const updatedDrawUrl = drawUrl + deckId + "/draw/?count=" + count;

    fetch(updatedDrawUrlUrl)
    .then(response => response.json())
    .then(data => {
      const drawnCards = data.cards;
            
    });    
} 

const playButton = document.getElementById("play-round");
const roundResult = document.getElementById("round-result"); 

playButton.addEventListener("click", () => {
    drawCards(2); 

    if (drawnCards[0].value > drawnCards[1].value) {
        roundResult.textContent = "Player Wins the Round!";
    } else if (drawnCards[0].value < drawnCards[1].value) {
        roundResult.textContent = "Computer Wins the Round!";
    } else {
        roundResult.textContent = "It's a Tie!";
    }
  });
});