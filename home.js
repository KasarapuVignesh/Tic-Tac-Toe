document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.getElementById("status");
  const winnerCard = document.getElementById("winnerCard");
  const winnerText = document.getElementById("winnerText");
  const restartBtn = document.getElementById("restartbtn");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  let xMoves = [];
  let oMoves = [];

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute("data-index"));

    if (board[index] !== "" || !gameActive) return;

    if (currentPlayer === "X") {
      if (xMoves.length === 3) {
        const old = xMoves.shift();
        board[old] = "";
        cells[old].textContent = "";
      }
      xMoves.push(index);
    } else {
      if (oMoves.length === 3) {
        const old = oMoves.shift();
        board[old] = "";
        cells[old].textContent = "";
      }
      oMoves.push(index);
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
  }

  function checkResult() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false;
        winnerText.textContent = `🎉 Player ${currentPlayer} wins!`;
        winnerCard.classList.add("show");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        return;
      }
    }

    if (!board.includes("")) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }

  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    xMoves = [];
    oMoves = [];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    winnerCard.classList.remove("show");
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);

  // Initial status
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
});
