const fs = require("fs");

function solveSafeCombination() {
  // Read the input file
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const rotations = input.split("\n");

  let currentPosition = 50; // Start at 50
  let zeroCount = 0;

  for (const rotation of rotations) {
    if (rotation.trim() === "") continue; // Skip empty lines

    const direction = rotation[0]; // 'L' or 'R'
    const distance = parseInt(rotation.slice(1), 10);

    if (direction === "L") {
      // Rotate left (decrease)
      currentPosition = (currentPosition - distance) % 100;
    } else if (direction === "R") {
      // Rotate right (increase)
      currentPosition = (currentPosition + distance) % 100;
    }

    // Handle negative results (wrap-around when going left from 0)
    if (currentPosition < 0) {
      currentPosition += 100;
    }

    // Check if we're at 0
    if (currentPosition === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

// Solve the puzzle
const password = solveSafeCombination();
console.log(`The password is: ${password}`);
