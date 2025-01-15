// An array containing the deck of cards including suits and values
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

//To populate HTML with textArea
let textArea = document.getElementById("text-area");
//To display new game button via HTML
let newGameButton = document.getElementById("new-game-button");
//To  hit button via HTML
let hitButton = document.getElementById("hit-button");
//To display stand button via HTML
let standButton = document.getElementById("stand-button");

//Variables to check the games state
//Boolean for game status
let gamesStarted = false;
let gameOver = false;
let playerWon = false;
//An empty array to store cards for the opponent
let opponentCards = [];
//An empty array to store cards for the player
let playerCards = [];
//Starting scores
let opponentScore = 0;
let playerScore = 0;
//Empty initial deck
let deck = [];

// Hide the hit and stand button as not needed until game has begun
hitButton.style.display = "none";
standButton.style.display = "none";

// Event Listeners - new game, hit, stand buttons
newGameButton.addEventListener("click", startNewGame);
hitButton.addEventListener("click", playerHits);
standButton.addEventListener("click", playerStands);

//Function to begin a new game
function startNewGame() {
    //Change game status to true
  gamesStarted = true;
  // Reset game over/player won to false (default)
  gameOver = false;
  playerWon = false;

  //Create new deck at the start of each games
  // Store result (deck of cards) of the function creating a deck to 'deck'
  deck = createDeck();
  //Call function to shuffle the pack of cards at the start of each game
  shuffleDeck(deck);
  // Get the first 2 cards for the players
  opponentCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  // Hide the new game button
  newGameButton.style.display = "none";
  // Display the hit and stand buttons
  hitButton.style.display = "inline";
  standButton.style.display = "inline";

  showStatus();
}

// Handle the player clicking "Hit" - add a card to the playerCards array
function playerHits() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
}

// If player stands, mark the game as over, compare scores, display game status (messages)
function playerStands() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
}

// Create a full deck of cards
function createDeck() {
    // Empty array to hold cards
  let deck = [];
  // loop through each suit
  for (let suit of suits) {
    //inner loop loop through each value for each suit
    for (let value of values) {
        // Pair the suit and value object and add to deck array
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Shuffle the deck
function shuffleDeck(deck) {
    //Loop through every card in the deck
  for (let i = 0; i < deck.length; i++) {
    //Get a random whole number under 52 (random position in the deck)
    let swapIndex = Math.trunc(Math.random() * deck.length);
    //Swap position of 2 cards in the deck array
    [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }
}

// Get a card string (e.g. "Ace of Spades")
function getCardString(card) {
  return `${card.value} of ${card.suit}`;
}

//Get the next card from the deck (first in array)
function getNextCard() {
  return deck.shift();
}

// Calculate the numeric value of a card
function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace": return 1; // Will adjust later for Ace being 11 if needed
    case "Two": return 2;
    case "Three": return 3;
    case "Four": return 4;
    case "Five": return 5;
    case "Six": return 6;
    case "Seven": return 7;
    case "Eight": return 8;
    case "Nine": return 9;
    default: return 10; // For King, Queen, Jack, or Ten
  }
}

// Calculate the score for a hand
function getScore(cardArray) {
    //score initialized to 0
    let score = 0;
    //ace status initialized to false
    let hasAce = false;
  
    // Loop through each card in the hand and take the value
    for (let card of cardArray) {
        //Add the value of each card to the score
      score += getCardNumericValue(card);
      //Check for an ace and change boolean to true
      if (card.value === "Ace") {
        hasAce = true;
      }
    }
    //Check what value of ace should be based on current score and rules of game
    if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  //if would go bust if ace is 11, return the value as 1
  return score;
}
  

// Update scores for both players
function updateScores() {
  opponentScore = getScore(opponentCards);
  playerScore = getScore(playerCards);
}

// Check for the end of the game
function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    // Opponent draws cards while their score is less than the player's score
    while (
      opponentScore < playerScore &&
      playerScore <= 21 &&
      opponentScore <= 21
    ) {
      opponentCards.push(getNextCard());
      updateScores();
    }
  }
// if player is bust, end game and declare opponent as winner
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    // if opponent is bust, end game and declare player as winner
  } else if (opponentScore > 21) {
    playerWon = true;
    gameOver = true;
    // if neither have bust, compare the two scores to decide the winner
  } else if (gameOver) {
    playerWon = playerScore > opponentScore;
  }
}

//Update the status of the game
function showStatus() {
    //Welcome message display
  if (!gamesStarted) {
    textArea.innerText = "Welcome to BlackJack!";
    return;
  }
// Generate picked card and suit information
  let opponentCardString = opponentCards.map(getCardString).join("\n");
  let playerCardString = playerCards.map(getCardString).join("\n");
//update game scores
  updateScores();
// populate text area with scores 
  textArea.innerText = 
  `Your opponent has: ${opponentCardString} (score: ${opponentScore})
   You have: ${playerCardString} (score: ${playerScore})`;
// update text area if game is over - text will declare winner
  if (gameOver) {
    textArea.innerText += playerWon ? "\n\nYou Win!" : "\n\nYour opponent wins!";
    //display new game button
    newGameButton.style.display = "inline";
    //hide hit and stand buttons
    hitButton.style.display = "none";
    standButton.style.display = "none";
  }
}







// Export for testing
module.exports = {
  startNewGame, 
};

