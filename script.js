let currentPlayer = 'X';
let gameOver = false; // Track game state

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
        document.getElementById('gameBoard').classList.add('hidden'); // Hide the game board
        const winnerMessage = document.getElementById('winnerMessage');
        winnerMessage.innerText = `${currentPlayer} wins!`;
        winnerMessage.style.display = 'block'; // Show the winner message
        winnerMessage.classList.add('animate'); // Trigger animation class
        document.getElementById('restartBtn').classList.remove('hidden'); // Show restart button
        gameOver = true; // Set gameOver to true
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    if (isBoardFull()) {
        document.getElementById('gameBoard').classList.add('hidden'); // Hide the game board
        const winnerMessage = document.getElementById('winnerMessage');
        winnerMessage.innerText = "It's a draw!";
        winnerMessage.style.display = 'block'; // Show the draw message
        winnerMessage.classList.add('animate'); // Trigger animation class
        document.getElementById('restartBtn').classList.remove('hidden'); // Show restart button
        gameOver = true; // Set gameOver to true
    }
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
document.getElementById('soloBtn').addEventListener('click', () => {
    startGame();
    // Any additional logic for solo mode
});

document.getElementById('duoBtn').addEventListener('click', () => {
    startGame();
    // Any additional logic for duo mode
});

document.getElementById('restartBtn').addEventListener('click', restartGame);

function startGame() {
    document.getElementById('gameMode').classList.add('hidden');
    document.getElementById('soloBtn').classList.add('hidden');
    document.getElementById('duoBtn').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    document.getElementById('message').classList.add('hidden'); // Hide the welcome message
    createBoard();
}
