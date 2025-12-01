const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputPath, "utf8").trim().split("\n");

let currentPos = 50;
let zeroCount = 0;

for (const line of input) {
  const trimmedLine = line.trim();
  if (!trimmedLine) continue;

  const direction = trimmedLine[0];
  const amount = parseInt(trimmedLine.substring(1), 10);

  if (direction === "L") {
    currentPos = (currentPos - amount) % 100;
    if (currentPos < 0) currentPos += 100;
  } else if (direction === "R") {
    currentPos = (currentPos + amount) % 100;
  }

  if (currentPos === 0) {
    zeroCount++;
  }
}

console.log(`Password: ${zeroCount}`);
