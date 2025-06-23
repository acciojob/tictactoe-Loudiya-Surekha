let currentPlayer = "x";
let board = Array(9).fill(null);
let gameActive = true;

let player1Name = "";
let player2Name = "";

function ticTocToe() {
  const input1 = document.getElementById("player1");
  const input2 = document.getElementById("player2");

  if (!input1.value.trim() || !input2.value.trim()) {
    alert("Please enter names for both players.");
    return;
  }

  player1Name = input1.value.trim();
  player2Name = input2.value.trim();

  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "x";

  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const title = document.createElement("h1");
  title.innerText = "Tic Tac Toe";
  container.appendChild(title);

  const message = document.createElement("div");
  message.className = "message";
  message.id = "message";
  message.innerText = `Player1, you're up!`;
  container.appendChild(message);

  const boardDiv = document.createElement("div");
  boardDiv.className = "board";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    cell.addEventListener("click", handleCellClick);
    boardDiv.appendChild(cell);
  }

  container.appendChild(boardDiv);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.id);

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    const winnerLabel = currentPlayer === "x" ? "Player1" : "Player2";
    const winMessage = `${winnerLabel} congratulations you won!`;
    document.getElementById("message").innerText = winMessage;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("message").innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  const nextPlayerLabel = currentPlayer === "x" ? "Player1" : "Player2";
  document.getElementById("message").innerText = `${nextPlayerLabel}, you're up!`;
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winCombos.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}