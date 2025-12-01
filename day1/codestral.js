// Read the input file
const fs = require("fs");
const input = fs.readFileSync("day1/input.txt", "utf8").split("\n");

// Initialize the dial position
let position = 50;
let zeroCount = 0;

// Process each rotation
input.forEach((rotation) => {
  const direction = rotation[0];
  const steps = parseInt(rotation.slice(1));

  if (direction === "R") {
    position = (position + steps) % 100;
  } else if (direction === "L") {
    position = (position - steps + 100) % 100;
  }

  // Check if the dial points to 0
  if (position === 0) {
    zeroCount++;
  }
});

// Output the password
console.log(zeroCount);
