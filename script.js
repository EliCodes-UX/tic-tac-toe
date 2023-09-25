// create Dom elements
const cells = document.querySelectorAll('.cell');
const gameText = document.querySelector('#text');
const restartBtn = document.querySelector('#restart');
const toWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

// make the gamePlay
gamePlay();

function gamePlay() {
  cells.forEach(cell => cell.addEventListener('click', clickedCell));
  restartBtn.addEventListener('click', restartGame);
  gameText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function clickedCell() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] != '' || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < toWin.length; i++) {
    const condition = toWin[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameText.textContent = `${currentPlayer} Wins!!`;
    running = false;
  } else if (!options.includes('')) {
    gameText.textContent = 'Draw';
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  gameText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
  running = true;
}
