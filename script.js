const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

fetch(deckUrl)
  .then(response => response.json())
  .then(data => {
    const deckId = data.deck_id;
   
  });