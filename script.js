const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let deckId = '';

fetch(deckUrl)
    .then(response => response.json()) 
    .then(data => {
        deckId = data.deck_id;
        console.log(data); 
    })
    .catch(error => console.error("Error fetching deck:", error));

