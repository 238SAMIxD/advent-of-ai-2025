// safe-password.js
const fs = require("fs");
const path = require("path");

function solve() {
  // Read the rotations from input.txt
  const data = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
  const lines = data.trim().split(/\r?\n/);

  let dial = 50; // starting position
  let zeroCount = 0; // how many times we land on 0 after a rotation

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue; // skip empty lines

    const dir = line.charAt(0);
    const distance = parseInt(line.slice(1), 10);

    // Apply rotation. Use modulo arithmetic with positive result.
    if (dir === "L") {
      dial = (dial - distance + 100) % 100;
    } else if (dir === "R") {
      dial = (dial + distance) % 100;
    } else {
      console.warn(`Unknown direction in line: "${line}"`);
      continue;
    }

    if (dial === 0) {
      zeroCount++;
    }
  }

  console.log(zeroCount);
}

solve();
