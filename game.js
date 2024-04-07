document.addEventListener('DOMContentLoaded', () => {
    const truck = document.getElementById('truck');
    let speed = 0;
    let position = 0;
    const initialAcceleration = 1; // For noticeable movement
    const friction = 0.98; // Increased friction for a quicker stop
    const bounceFactor = -0.6; // Bounce effect
    const gameAreaWidth = document.getElementById('gameArea').offsetWidth;
    const finishLinePosition = gameAreaWidth * 0.75;
    let gameInterval;
    let isSpacebarPressed = false;
    let gameHasStarted = false;

    function update() {
        if (isSpacebarPressed) {
            speed += initialAcceleration;
        }

        position += speed;

        // Implementing bounce without crash message
        if (position <= 0 || position + truck.offsetWidth >= gameAreaWidth) {
            speed *= bounceFactor; // Apply bounce
            position = Math.max(0, Math.min(position, gameAreaWidth - truck.offsetWidth)); // Keep within bounds
        }

        truck.style.left = `${position}px`;
        speed *= friction; // Apply friction to slow down

        // When the truck slows down significantly, evaluate the game outcome
        if (gameHasStarted && Math.abs(speed) < 1 && !isSpacebarPressed) {
            clearInterval(gameInterval);
            speed = 0; // Ensure truck stops
            evaluateGameOutcome();
        }
    }

    function evaluateGameOutcome() {
        // Adjusting win condition check to be more forgiving and accurate
        if (Math.abs((position + truck.offsetWidth / 2) - finishLinePosition) <= 10) {
            showMessage("YOU WIN!");
        } else {
            showMessage("Try Again!");
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            isSpacebarPressed = true;
            if (!gameHasStarted) gameHasStarted = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            isSpacebarPressed = false;
        }
    });

    function showMessage(message) {
        alert(message);
        resetGame();
    }

    function startGame() {
        position = 0;
        speed = 0;
        gameHasStarted = false;
        isSpacebarPressed = false;
        clearInterval(gameInterval);
        gameInterval = setInterval(update, 20); // Smoother animation
        truck.style.left = `${position}px`;
    }

    function resetGame() {
        startGame(); // Restart the game for a new attempt
    }

    startGame(); // Initial game start
});
