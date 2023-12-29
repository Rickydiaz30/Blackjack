const dealerCards = document.querySelector('.dealer-cards');
const playerCards = document.querySelector('.player-cards');
const dealerPoints = document.querySelector('.dealer-points');
const playerPoints = document.querySelector('.player-points');
const hit = document.querySelector('.hit');
const stay = document.querySelector('.stay');
const bank = document.querySelector('.bank');
const bet = document.querySelector('.bet');
const placeBet = document.querySelector('.place-bet');
const chipContainer = document.querySelector('.chip-container');
const twentyFive = document.querySelector('.twenty-five');
const fifty = document.querySelector('.fifty');
const hundred = document.querySelector('.hundred');

let dealerPointsTotal;
let playerPointsTotal;
let intervalId;
let playerAceCount = 0;
let dealerAceCount = 0;
let hasBeenReduced = false;
let img1;
let img2;
let dealerImage1;
let canBet = true;
let canHit = true;
let canStay = true;

let card = {
  cardNumber: '',
  suit: '',
  points: 0,
  playerPointsTotal: 0,
  dealerPointsTotal: 0,
};

let playerBet = {
  total: 0,
};

let playerBank = {
  total: 1000,
};

let winnings = {
  total: 0,
};

hideButtons();

//Create a random card
function createRandomCard() {
  let suitNumber = Math.floor(Math.random() * 4 + 1);

  let cardNumber = Math.floor(Math.random() * 13 + 1);

  if (suitNumber === 1) {
    card.suit = 'H';
  } else if (suitNumber === 2) {
    card.suit = 'D';
  } else if (suitNumber === 3) {
    card.suit = 'S';
  } else if (suitNumber === 4) {
    card.suit = 'C';
  }

  if (cardNumber === 1) {
    card.cardNumber = 'A';
    card.points = 11;
  } else if (cardNumber === 11) {
    card.cardNumber = 'J';
    card.points = 10;
  } else if (cardNumber === 12) {
    card.cardNumber = 'Q';
    card.points = 10;
  } else if (cardNumber === 13) {
    card.cardNumber = 'K';
    card.points = 10;
  } else {
    card.cardNumber = cardNumber;
    card.points = cardNumber;
  }

  randomCard = `images/${card.cardNumber}-${card.suit}.png`;
  return randomCard;
}

function hideButtons() {
  stay.classList.add('hidden');
  hit.classList.add('hidden');
}

function createDealersFirstCard() {
  img1 = document.createElement('img');
  img1.src = 'images/BACK.png';
  dealerImage1 = createRandomCard();
  dealerCards.appendChild(img1);
  img1.classList.add('cards');
  points = card.points;
  if (card.cardNumber === 'A') {
    dealerAceCount++;
  }
  return points;
}

function createDealersSecondCard() {
  img2 = document.createElement('img');
  img2.src = createRandomCard();
  dealerCards.appendChild(img2);
  img2.classList.add('cards');
  points = card.points;
  if (card.cardNumber === 'A') {
    dealerAceCount++;
  }
  console.log(img2);
  return points;
}

function createPlayerCards() {
  const img = document.createElement('img');
  img.src = createRandomCard();
  playerCards.appendChild(img);
  img.classList.add('cards');
  points = card.points;
  if (card.cardNumber === 'A') {
    playerAceCount++;
  }
  return points;
}

function startGame() {
  hasBeenReduced = false;

  setTimeout(() => {
    createDealersFirstCard();
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    point1 = card.points;
  }, 500);

  setTimeout(() => {
    createPlayerCards();
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    point3 = card.points;
  }, 1000);

  setTimeout(() => {
    createDealersSecondCard();
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    if (dealerAceCount > 1) {
      point2 = 1;
    } else {
      point2 = card.points;
    }
    dealerPointsTotal = point1 + point2;
  }, 1500);

  setTimeout(() => {
    createPlayerCards();
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    if (playerAceCount > 1) {
      point4 = 1;
    } else {
      point4 = card.points;
    }
    playerPointsTotal = point3 + point4;
  }, 2000);

  setTimeout(() => {
    dealerPoints.textContent = 'LETS PLAY !';
  }, 2500);

  setTimeout(() => {
    playerPoints.textContent = playerPointsTotal + ' POINTS';
  }, 3000);

  setTimeout(() => {
    stay.classList.remove('hidden');
    hit.classList.remove('hidden');
  }, 3500);
  checkForPlayerBlackjack();
}

function placeBet25() {
  if (playerBank.total >= 25) {
    playerBet.total += 25;
    playerBank.total -= 25;
    bet.textContent = playerBet.total;
    bank.textContent = playerBank.total;
    console.log(playerBet.total);
  }
}

function placeBet50() {
  if (playerBank.total >= 50) {
    playerBet.total += 50;
    playerBank.total -= 50;
    bet.textContent = playerBet.total;
    bank.textContent = playerBank.total;
  }
}

function placeBet100() {
  if (playerBank.total >= 100) {
    playerBet.total += 100;
    playerBank.total -= 100;
    bet.textContent = playerBet.total;
    bank.textContent = playerBank.total;
  }
}

function preventAddingMoreChips() {
  if (playerBank.total === 0 || playerBank.total < 0) {
    chipContainer.classList.add('hidden');
  }
}

function payout() {
  if (playerPointsTotal === 21) {
    winnings.total = playerBet.total * 2.5;
    playerBank.total += winnings.total;
    bank.textContent = playerBank.total;
  } else if (playerPointsTotal === dealerPointsTotal) {
    winnings.total = playerBet.total;
    playerBank.total += winnings.total;
    bank.textContent = playerBank.total;
  } else {
    winnings.total = playerBet.total * 2;
    playerBank.total += winnings.total;
    bank.textContent = playerBank.total;
  }
}

function resetBet() {
  playerBet.total = 0;
  bet.textContent = '';
}

function checkForBankBust() {
  if (playerBank.total <= 0) {
    dealerPoints.textContent = 'GAME OVER!!!';
    setTimeout(() => {
      hideButtons();
      clearTable();
      playerBank.total = 1000;
      bank.textContent = playerBank.total;
    }, 2000);
  }
}

function createHitCard() {
  const img = document.createElement('img');
  img.src = createRandomCard();
  playerCards.appendChild(img);
  let audio = new Audio('mouse-click.mp3');
  audio.play();
  img.classList.add('cards');
  if (card.cardNumber === 'A' && playerAceCount >= 1) {
    card.points = 1;
  } else {
    card.points = card.points;
  }
  playerPointsTotal += card.points;
  playerPoints.textContent = playerPointsTotal + ' POINTS ';
  if (card.cardNumber === 'A') {
    playerAceCount++;
  }

  checkForPlayerBlackjack();
  checkForPlayerBust();
}

function addToDealersCards() {
  if (!hasBeenReduced) {
    reduceAceDealer();
  }

  if (dealerPointsTotal < 21) {
    const img = document.createElement('img');
    img.src = createRandomCard();
    dealerCards.appendChild(img);
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    img.classList.add('cards');

    if (card.cardNumber === 'A' && dealerAceCount >= 1) {
      card.points = 1;
    } else {
      card.points = card.points;
    }
    dealerPointsTotal += card.points;
    dealerPoints.textContent = dealerPointsTotal + ' POINTS ';
    if (card.cardNumber === 'A') {
      dealerAceCount++;
    }

    checkForDealerBlackjack();
    checkForDealerBust();
    if (dealerPointsTotal > playerPointsTotal && dealerPointsTotal < 21) {
      dealerPoints.textContent = `${dealerPointsTotal} POINTS DEALER WINS!!!`;

      resetBet();
      checkForBankBust();
      setTimeout(() => {
        hideButtons();
        chipContainer.classList.remove('hidden');
        clearTable();
      }, 1000);
    } else if (dealerPointsTotal === playerPointsTotal) {
      dealerPoints.textContent = 'TIE!!!';
      payout();
      resetBet();

      setTimeout(() => {
        hideButtons();
        chipContainer.classList.remove('hidden');
        clearTable();
      }, 1000);
    }
  }
}

function checkForPlayerBlackjack() {
  if (playerPointsTotal === 21) {
    playerPoints.textContent = 'BLACKJACK!!! YOU WIN!!!';
    hideButtons();
    payout();

    resetBet();

    setTimeout(() => {
      chipContainer.classList.remove('hidden');
      clearTable();
    }, 1000);
  }
}

function checkForDealerBlackjack() {
  if (dealerPointsTotal === 21) {
    clearInterval(intervalId);
    dealerPoints.textContent = 'BLACKJACK!!! DEALER WINS!!!';

    resetBet();
    checkForBankBust();
    setTimeout(() => {
      hideButtons();
      chipContainer.classList.remove('hidden');
      clearTable();
    }, 1000);
  }
}

function reduceAcePlayer() {
  if (playerAceCount >= 1 && playerPointsTotal > 21) {
    hasBeenReduced = true;
    playerPointsTotal = playerPointsTotal - 10;
    playerPoints.textContent = `${playerPointsTotal} POINTS`;
  }
}

function reduceAceDealer() {
  if (dealerAceCount >= 1 && dealerPointsTotal > 21) {
    hasBeenReduced = true;
    dealerPointsTotal = dealerPointsTotal - 10;
    dealerPoints.textContent = `${dealerPointsTotal} POINTS`;
  }
}

function checkForPlayerBust() {
  if (!hasBeenReduced) {
    reduceAcePlayer();
  }

  if (playerPointsTotal > 21) {
    playerPoints.textContent = 'BUSTED!!! YOU LOSE!!!';

    resetBet();
    checkForBankBust();
    setTimeout(() => {
      hideButtons();
      chipContainer.classList.remove('hidden');
      clearTable();
    }, 1000);
  }
}

function checkForDealerBust() {
  if (!hasBeenReduced) {
    reduceAceDealer();
  }

  if (dealerPointsTotal > 21) {
    dealerPoints.textContent = 'BUSTED!!! DEALER LOSES!!!';

    payout();

    resetBet();

    setTimeout(() => {
      hideButtons();
      chipContainer.classList.remove('hidden');
      clearTable();
    }, 1000);
  }
}

function checkForTie() {
  if (dealerPointsTotal === playerPointsTotal) {
    dealerPoints.textContent = 'TIE!!!';
    payout();
    resetBet();

    setTimeout(() => {
      hideButtons();
      chipContainer.classList.remove('hidden');
      clearTable();
    }, 1000);
  }
}

function clearTable() {
  clearInterval(intervalId);
  playerPointsTotal = 0;
  playerCards.textContent = '';
  playerPoints.textContent = '';
  dealerPointsTotal = 0;
  dealerCards.textContent = '';
  dealerPoints.textContent = '';
  dealerAceCount = 0;
  playerAceCount = 0;
  canBet = true;
  canHit = true;
  canStay = true;
}

placeBet.addEventListener('click', () => {
  if (playerBet.total > 0 && canBet === true) {
    clearTable();
    chipContainer.classList.add('hidden');
    startGame();
    canBet = false;
  }
});

twentyFive.addEventListener('click', () => {
  placeBet25();
  preventAddingMoreChips();
});

fifty.addEventListener('click', () => {
  placeBet50();
  preventAddingMoreChips();
});

hundred.addEventListener('click', () => {
  placeBet100();
  preventAddingMoreChips();
});

hit.addEventListener('click', () => {
  if (canHit === true) {
    createHitCard();
  }
});

stay.addEventListener('click', () => {
  canHit = false;
  if (canStay === true) {
    img1.src = dealerImage1;
    let audio = new Audio('mouse-click.mp3');
    audio.play();
    dealerPoints.textContent = dealerPointsTotal + ' POINTS';
    checkForTie();
    checkForDealerBlackjack();

    if (dealerPointsTotal < 21 && dealerPointsTotal < playerPointsTotal) {
      intervalId = setInterval(() => {
        addToDealersCards();
      }, 2000);
    } else if (
      dealerPointsTotal > playerPointsTotal &&
      dealerPointsTotal < 21
    ) {
      dealerPoints.textContent = 'DEALER WINS!!!';

      resetBet();
      checkForBankBust();
      setTimeout(() => {
        hideButtons();
        chipContainer.classList.remove('hidden');
        clearTable();
      }, 1000);
    }
    canStay = false;
  }
});
