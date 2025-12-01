const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");
let position = 50;
let countAtZero = 0;
input.forEach((line) => {
  if (line.trim() === "") return;
  const direction = line.trim()[0];
  const distance = parseInt(line.trim().slice(1));
  if (direction === "L") position = (position - distance) % 100;
  else if (direction === "R") position = (position + distance) % 100;
  if (position < 0) position += 100;
  if (position === 0) countAtZero++;
});
console.log("Password:", countAtZero);
