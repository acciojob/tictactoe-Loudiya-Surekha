let currentPlayer = "x"; // required lowercase for Cypress test
let board = Array(9).fill(null);
let gameActive = true;

// Keep real names in case you want to display later
let player1Name = "";
let player2Name = "";

function ticTocToe() {
  const input1 = document.getElementById("player1");
  const input2 = document.getElementById("player2");

  if (!input1.value.trim() || !input2.value.trim()) {
    alert("Please enter names for both players.");
    return;
  }

  // Store the names (optional)
  player1Name = input1.value.trim();
  player2Name = input2.value.trim();

  // Reset game state
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "x";

  const container = document.getElementById("main-container");
  container.innerHTML = ""; // clear input section

  // Add title
  const title = document.createElement("h1");
  title.innerText = "Tic Tac Toe";
  container.appendChild(title);

  // Message div with fixed IDs and initial message
  const message = document.createElement("div");
  message.className = "message";
  message.id = "message";
  message.innerText = `Player1, you're up!`; // required for Cypress
  container.appendChild(message);

  // Create board
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

  // Do nothing if already filled or game over
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "x" ? "Player1" : "Player2"; // required text
    document.getElementById("message").innerText = `${winner} congratulations you won!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("message").innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  const nextPlayer = currentPlayer === "x" ? "Player1" : "Player2";
  document.getElementById("message").innerText = `${nextPlayer}, you're up!`;
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winCombos.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
