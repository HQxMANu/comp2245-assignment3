// tic-tac-toe.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board div"); // All divs in the game board
    const statusDisplay = document.getElementById("status"); // Status display for messages
    let turn = "X"; // Start with player "X"
    let gameState = ["", "", "", "", "", "", "", "", ""]; // Array to track the state of each square

    // Function to check if the game has been won
    function checkWin() {
        // Winning combinations based on indices
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        // Check each winning combination
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                statusDisplay.classList.add("you-won"); // Style winning message
                statusDisplay.textContent = `Congratulations! ${turn} is the Winner! 🎉`;
                return true;
            }
        }

    }

    // Function to handle clicks on each square
    function handleSquareClick(event) {
        const square = event.target;
        const index = Array.from(squares).indexOf(square); // Find index of clicked square

        if (!gameState[index]) { // If square is empty
            gameState[index] = turn; // Update game state array
            square.textContent = turn; // Display the current player's mark (X or O)
            square.classList.add(turn); // Style square with X or O color

            if (checkWin()) return; // Check for a win

            // Toggle turn between X and O
            turn = turn === "X" ? "O" : "X";
            statusDisplay.textContent = `Move your mouse over a square and click to play an X or an O.`;
        }
    }

    // Function to reset the game
    function resetGame() {
        gameState.fill(""); // Clear game state array
        squares.forEach(square => {
            square.textContent = ""; // Clear text
            square.classList.remove("X", "O"); // Remove styling classes
        });
        statusDisplay.classList.remove("you-won");
        statusDisplay.textContent = "Move your mouse over a square and click to play an X or an O.";
        turn = "X"; // Reset starting turn
    }

    // Event listeners for each square for hover and click effects
    squares.forEach(square => {
        square.classList.add("square"); // Add base class to each square

        // Add hover effect
        square.addEventListener("mouseover", function() {
            if (!gameState[Array.from(squares).indexOf(square)]) { // Only if square is empty
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", function() {
            square.classList.remove("hover");
        });

        // Add click event
        square.addEventListener("click", handleSquareClick);
    });

    // Reset game on "New Game" button click
    document.querySelector(".btn").addEventListener("click", resetGame);
});
