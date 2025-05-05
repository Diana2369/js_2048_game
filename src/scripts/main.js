import Game from '../modules/Game.class.js';

const game = new Game();

document.querySelector('.start').addEventListener('click', () => {
  game.start();
});

const cells = document.querySelectorAll('.field-cell');
const startButton = document.querySelector('.button');
const scoreElement = document.querySelector('.game-score');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');
const startMessage = document.querySelector('.message-start');

const startBtn = document.querySelector('.start');

startBtn.addEventListener('click', () => {
  game.start();
  updateUI();
});

function updateUI() {
  const board = game.getState();

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const value = board[row][col];

    cell.textContent = value === 0 ? '' : value;
    cell.className = 'field-cell';

    if (value) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  scoreElement.textContent = game.getScore();

  if (game.getStatus() === 'win') {
    winMessage.classList.remove('hidden');
  } else {
    winMessage.classList.add('hidden');
  }

  if (game.getStatus() === 'lose') {
    loseMessage.classList.remove('hidden');
  } else {
    loseMessage.classList.add('hidden');
  }
}

function startGame() {
  game.start();
  startMessage.classList.add('hidden');
  startButton.textContent = 'Restart';
  startButton.classList.remove('start');
  startButton.classList.add('restart');
  updateUI();
}

function restartGame() {
  game.restart();
  startMessage.classList.add('hidden');
  winMessage.classList.add('hidden');
  loseMessage.classList.add('hidden');
  updateUI();
}

startButton.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    startGame();
  } else {
    restartGame();
  }
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const prevState = JSON.stringify(game.getState());

  switch (key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  if (JSON.stringify(game.getState()) !== prevState) {
    updateUI();
  }
});
