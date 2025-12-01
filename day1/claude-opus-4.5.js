const fs = require("fs");

// Read the input file
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Parse the rotations
const rotations = input.map((line) => {
  const direction = line[0];
  const distance = parseInt(line.slice(1));
  return { direction, distance };
});

// Start at position 50
let position = 50;
let zeroCount = 0;

// Process each rotation
for (const { direction, distance } of rotations) {
  if (direction === "L") {
    // Left means toward lower numbers
    position = (position - (distance % 100) + 100) % 100;
  } else {
    // Right means toward higher numbers
    position = (position + distance) % 100;
  }

  // Check if we're at 0
  if (position === 0) {
    zeroCount++;
  }
}

console.log("The password is:", zeroCount);
