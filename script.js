const characters = ['Brady', 'Ronaldo', 'Phelps', 'Otani', 'Jordan', 'Jon Jones', 'Faker', 'Messi'];

const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const modal = document.getElementById('modal');
const winnerModal = document.getElementById('winnerModal');
const closeModal = document.getElementById('closeModal');
const closeWinnerModal = document.getElementById('closeWinnerModal');
const restartGame = document.getElementById('restartGame');
const restartGameWinner = document.getElementById('restartGameWinner');
const closeGame = document.getElementById('closeGame');
const closeGameWinner = document.getElementById('closeGameWinner');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;

function createBoard() {
    const characterPairs = characters.concat(characters);
    characterPairs.sort(() => 0.5 - Math.random());

    characterPairs.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;

        const frontFace = document.createElement('img');
        frontFace.src = `images/${character}.jpg`;
        card.appendChild(frontFace);

        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
        if (timeRemaining === 0) {
            clearInterval(timer);
            showGameOverModal();
        }
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.character === card2.dataset.character) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === characters.length) {
            clearInterval(timer);
            showWinnerModal();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showGameOverModal() {
    modal.style.display = 'flex';

    
    const gifImage = document.createElement('img');
    gifImage.src = 'images/Gameover.gif';  
    gifImage.alt = 'GIF de Game Over';  
    gifImage.classList.add('game-over-gif');  

    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.appendChild(gifImage);
}

function showWinnerModal() {
    winnerModal.style.display = 'flex';

    
    const gifImage = document.createElement('img');
    gifImage.src = 'images/celebration.gif';  
    gifImage.alt = 'GIF de celebración';  
    gifImage.classList.add('gif-image'); 

    
    const modalContent = winnerModal.querySelector('.modal-content');
    modalContent.appendChild(gifImage);
}

closeModal.onclick = function() {
    modal.style.display = 'none';
    removeGifFromModal(); 
}

closeWinnerModal.onclick = function() {
    winnerModal.style.display = 'none';
    removeGifFromWinnerModal(); 
}

restartGame.onclick = function() {
    location.reload();
}

restartGameWinner.onclick = function() {
    location.reload();
}

closeGame.onclick = function() {
    window.close();
}

closeGameWinner.onclick = function() {
    window.close();
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        removeGifFromModal(); 
    } else if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
        removeGifFromWinnerModal();
    }
}

function removeGifFromModal() {
    const modalContent = modal.querySelector('.modal-content');
    const gifImage = modalContent.querySelector('.game-over-gif');
    if (gifImage) {
        modalContent.removeChild(gifImage);
    }
}

function removeGifFromWinnerModal() {
    const modalContent = winnerModal.querySelector('.modal-content');
    const gifImage = modalContent.querySelector('.gif-image');
    if (gifImage) {
        modalContent.removeChild(gifImage);
    }
}

createBoard();
