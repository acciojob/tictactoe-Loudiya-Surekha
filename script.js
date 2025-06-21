let currentPlayer = "X";
let player1 = "";
let player2 = "";
let board = Array(9).fill(null);
let gameActive = true;

function ticTocToe() {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  const container = document.getElementById("main-container");
  container.innerHTML = ""; // Clear input form

  // Heading
  const title = document.createElement("h1");
  title.innerText = "Tic Tac Toe";
  container.appendChild(title);

  // Message area
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.id = "message";
  messageDiv.innerText = `${player1}, you're up!`;
  container.appendChild(messageDiv);

  // Board
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
  const index = cell.id;

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    document.getElementById("message").innerText = `${winner}, congratulations you won!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("message").innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextPlayer = currentPlayer === "X" ? player1 : player2;
  document.getElementById("message").innerText = `${nextPlayer}, you're up!`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
