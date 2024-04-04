document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restart-btn');
    const resultText = document.getElementById('result-text');

    let currentPlayer = 'X';
    let cells = [];

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
            cells.push('');
        }
    }

    function handleCellClick(index) {
        if (cells[index] === '' && !checkWinner()) {
            cells[index] = currentPlayer;
            render();
            if (checkWinner()) {
                resultText.textContent = `Player ${currentPlayer} wins!`;
            } else if (cells.every(cell => cell !== '')) {
                resultText.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function render() {
        cells.forEach((value, index) => {
            const cell = document.getElementById(index);
            cell.textContent = value;
        });
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c];
        });
    }

    function restartGame() {
        cells = [];
        currentPlayer = 'X';
        resultText.textContent = 'Tic Tac Toe';
        board.innerHTML = '';
        createBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    createBoard();
});
