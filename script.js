const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

board.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
  const index = e.target.dataset.index;
  if(boardState[index] !== '' || gameOver) return;

  boardState[index] = currentPlayer;
  e.target.innerHTML = currentPlayer === 'X' ? '<i class="fas fa-times"></i>' : '<i class="far fa-circle"></i>';
  e.target.style.color = currentPlayer === 'X' ? '#ef4444' : '#2563eb';

  if(checkWin()) {
    message.textContent = `Player ${currentPlayer} Wins! 🎉`;
    updateScore();
    gameOver = true;
  } else if(boardState.every(cell => cell !== '')) {
    message.textContent = `It's a Draw! 🤝`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  return winningCombinations.some(comb => comb.every(index => boardState[index] === currentPlayer));
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  board.forEach(cell => cell.innerHTML = '');
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScore() {
  if(currentPlayer === 'X') scoreX++;
  else scoreO++;
  scoreXEl.textContent = scoreX;
  scoreOEl.textContent = scoreO;
}

message.textContent = `Player ${currentPlayer}'s Turn`;
