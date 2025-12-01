const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "input.txt");
const DIAL_SIZE = 100;
const START_POSITION = 50;

const rawInput = fs.readFileSync(INPUT_PATH, "utf8").trim();

function parseInstructions(raw) {
  if (!raw) {
    return [];
  }

  return raw
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const direction = line[0];
      const distance = Number(line.slice(1));

      if (!["L", "R"].includes(direction) || Number.isNaN(distance)) {
        throw new Error(`Invalid instruction: ${line}`);
      }

      return { direction, distance };
    });
}

function countZeroStops(instructions, start = START_POSITION) {
  let position = ((start % DIAL_SIZE) + DIAL_SIZE) % DIAL_SIZE;
  let zeroHits = 0;

  for (const { direction, distance } of instructions) {
    const delta = distance % DIAL_SIZE;

    if (direction === "L") {
      position = (position - delta + DIAL_SIZE) % DIAL_SIZE;
    } else {
      position = (position + delta) % DIAL_SIZE;
    }

    if (position === 0) {
      zeroHits += 1;
    }
  }

  return zeroHits;
}

const instructions = parseInstructions(rawInput);
const password = countZeroStops(instructions);

console.log(password);
