// read the whole file, split into lines, ignore empty lines
const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n").filter((l) => l.trim());

let pos = 50; // current dial position
let zeroCount = 0; // how many times we end on 0

for (const line of lines) {
  const dir = line[0]; // 'L' or 'R'
  const dist = parseInt(line.slice(1)); // numeric part

  if (dir === "R") {
    pos = (pos + dist) % 100;
  } else {
    // 'L'
    pos = (pos - dist) % 100;
    if (pos < 0) pos += 100; // wrap around
  }

  if (pos === 0) zeroCount++;
}

console.log("Password:", zeroCount);
