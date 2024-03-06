const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

fetch(deckUrl)
  .then(response => response.json())
  .then(data => {
    const deckId = data.deck_id;
   
  });

  const drawUrl = "https://www.deckofcardsapi.com/api/deck/";

function drawCards(count) {
    const updatedDrawUrl = drawUrl + deckId + "/draw/?count=" + count;

    fetch(updatedDrawUrl)
        .then(response => response.json())
        .then(data => {
            
            const drawnCards = data.cards; 

           
        });
} 