const fs = require("fs");

// Proper modulo that handles negative numbers (returns 0-99)
function mod(n, m) {
  return ((n % m) + m) % m;
}

// Read and process input
const input = fs.readFileSync("input.txt", "utf8").trim();
let position = 50;
let zeroCount = 0;

for (const line of input.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed) continue; // Skip empty lines

  const direction = trimmed[0];
  const distance = parseInt(trimmed.slice(1), 10);

  // Apply rotation: L subtracts, R adds
  position = mod(position + (direction === "L" ? -distance : distance), 100);

  // Count if we landed on 0
  if (position === 0) {
    zeroCount++;
  }
}

console.log(zeroCount);
