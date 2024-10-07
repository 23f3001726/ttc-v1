let currentPlayer = 'X';
let gameOver = false; // Track game state
const music = document.getElementById('backgroundMusic');
music.volume = 0.2; // Set initial volume to 50%

let playerWins = 0;
let aiWins = 0;

function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = ''; // Clear the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, i));
        board.appendChild(cell);
    }
}

function handleCellClick(cell, index) {
    if (gameOver || cell.innerText) return; // Disable clicking if game is over or cell is filled

    cell.innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
        playerWins++;
        endGame(`${currentPlayer} wins!`);
        return;
    }
    if (isBoardFull()) {
        endGame("It's a draw!");
        return;
    }
    
    // Switch to AI
    currentPlayer = 'O'; 
    setTimeout(aiMove, 500); // Allow a brief pause before AI's move
}

function aiMove() {
    if (gameOver) return; // Ensure game is not over

    const cells = document.querySelectorAll('.cell');

    // AI tries to win
    for (let i = 0; i < 9; i++) {
        if (!cells[i].innerText) {
            cells[i].innerText = currentPlayer;
            if (checkWin(currentPlayer)) {
                aiWins++;
                endGame(`${currentPlayer} wins!`);
                return; // End game if AI wins
            }
            cells[i].innerText = ''; // Undo the move
        }
    }
    
    // AI tries to block the player
    currentPlayer = 'X'; // Switch to player to check their win
    for (let i = 0; i < 9; i++) {
        if (!cells[i].innerText) {
            cells[i].innerText = currentPlayer;
            if (checkWin(currentPlayer)) {
                cells[i].innerText = 'O'; // Block player
                currentPlayer = 'X'; // Switch back to player
                return; // End the move after blocking
            }
            cells[i].innerText = ''; // Undo the move
        }
    }

    // Make a random move based on skill level
    currentPlayer = 'O'; // Switch back to AI
    let availableCells = Array.from(cells).filter(cell => !cell.innerText);
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.innerText = currentPlayer;

        if (checkWin(currentPlayer)) {
            aiWins++;
            endGame(`${currentPlayer} wins!`);
            return;
        }
        if (isBoardFull()) {
            endGame("It's a draw!");
            return;
        }
    }

    // Switch back to the player for the next turn
    currentPlayer = 'X'; 
}

function endGame(message) {
    document.getElementById('gameBoard').classList.add('hidden'); // Hide the game board
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.innerText = message;
    winnerMessage.style.display = 'block'; // Show the winner message
    document.getElementById('restartBtn').classList.remove('hidden'); // Show restart button
    gameOver = true; // Set gameOver to true
}

function checkWin(player) {
    const cells = document.querySelectorAll('.cell');
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => cells[index].innerText === player)
    );
}

function isBoardFull() {
    const cells = document.querySelectorAll('.cell');
    return [...cells].every(cell => cell.innerText);
}

function restartGame() {
    currentPlayer = 'X';
    gameOver = false; // Reset gameOver flag
    document.getElementById('winnerMessage').style.display = 'none'; // Hide winner message
    document.getElementById('restartBtn').classList.add('hidden'); // Hide restart button
    createBoard();
    document.getElementById('gameBoard').classList.remove('hidden'); // Show the game board
}

// Add event listeners for buttons
document.getElementById('soloBtn').addEventListener('click', startGame);
document.getElementById('duoBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);

function startGame() {
    document.getElementById('gameMode').classList.add('hidden');
    document.getElementById('soloBtn').classList.add('hidden');
    document.getElementById('duoBtn').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    document.getElementById('message').classList.add('hidden'); // Hide the welcome message
    createBoard();

    // Attempt to play the background music
    music.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}
