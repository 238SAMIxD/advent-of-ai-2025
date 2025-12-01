const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

let position = 50;
let zeroCount = 0;

for (const instruction of input) {
  const direction = instruction[0];
  const distance = parseInt(instruction.slice(1), 10);

  if (direction === "R") {
    position = (position + distance) % 100;
  } else if (direction === "L") {
    position = (((position - distance) % 100) + 100) % 100;
  }

  if (position === 0) {
    zeroCount++;
  }
}

console.log(zeroCount);
