const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let scoreDisplay = document.getElementById("scoreDisplay");

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for wall collision
  if (
    head.x < 0 ||
    head.x >= canvas.width / 20 ||
    head.y < 0 ||
    head.y >= canvas.height / 20
  ) {
    gameOver();
    return; // Add this line to prevent further updates
  }

  snake.unshift(head); // Add new head

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } else {
    snake.pop(); // Remove the last segment
  }
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

document.addEventListener("keydown", changeDirection);

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = { x: 15, y: 15 };
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameLoop();
}

function gameOver() {
  alert("Game Over! You hit the wall."); // Show alert message
  location.reload(); // Reload the page
}

function gameLoop() {
  draw();
  update();
  setTimeout(gameLoop, 120); // Changed from 100 to 120
}

gameLoop();
