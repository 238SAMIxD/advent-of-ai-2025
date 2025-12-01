// Read the input file
const fs = require("fs");
const input = fs.readFileSync("day1/bonus/input.txt", "utf8").split("\n");

// Initialize the dial position
let position = 50;
let zeroCount = 0;

// Process each rotation
input.forEach((rotation) => {
  const direction = rotation[0];
  const steps = parseInt(rotation.slice(1));

  if (direction === "R") {
    for (let i = 0; i < steps; i++) {
      position = (position + 1) % 100;
      if (position === 0) zeroCount++;
    }
  } else if (direction === "L") {
    for (let i = 0; i < steps; i++) {
      position = (position - 1 + 100) % 100;
      if (position === 0) zeroCount++;
    }
  }
});

// Output the password
console.log(zeroCount);
