var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const lines: string[] = data.split("\r\n");

const isPointSeen = (seen: number[][], point: number[]) => {
  const [yTarget, xTarget] = point;
  return !!seen.find((point) => {
    const [yPoint, xPoint] = point;

    return yPoint === yTarget && xTarget == xPoint;
  });
};

let queue: number[][] = [];
let seen: number[][] = [];
const grid = lines.map((line) => line.split(""));

for (let y = 0; y < lines.length; y++) {
  let xvalues = lines[y].split("");
  for (let x = 0; x < xvalues.length; x++) {
    if (lines[y][x] === "S") {
      queue.push([y, x]);
      seen.push([y, x]);
    }
  }
}

while (queue.length) {
  const curr = queue.shift()!;

  const [y, x] = curr!;

  const currentNode = grid[y][x];

  // go up
  if (
    y > 0 &&
    ["S", "|", "J", "L"].includes(currentNode) &&
    ["|", "7", "F"].includes(grid[y - 1][x]) &&
    !isPointSeen(seen, [y - 1, x])
  ) {
    queue.push([y - 1, x]);
    seen.push([y - 1, x]);
  }

  // go down
  if (
    y < grid.length - 1 &&
    ["S", "|", "7", "F"].includes(currentNode) &&
    ["|", "J", "L"].includes(grid[y + 1][x]) &&
    !isPointSeen(seen, [y + 1, x])
  ) {
    queue.push([y + 1, x]);
    seen.push([y + 1, x]);
  }

  // go left
  if (
    x > 0 &&
    ["S", "-", "J", "7"].includes(currentNode) &&
    ["-", "L", "F"].includes(grid[y][x - 1]) &&
    !isPointSeen(seen, [y, x - 1])
  ) {
    queue.push([y, x - 1]);
    seen.push([y, x - 1]);
  }

  // go right
  if (
    x < grid[y].length - 1 &&
    ["S", "-", "F", "L"].includes(currentNode) &&
    ["-", "J", "7"].includes(grid[y][x + 1]) &&
    !isPointSeen(seen, [y, x + 1])
  ) {
    queue.push([y, x + 1]);
    seen.push([y, x + 1]);
  }
}

console.log(`Result: ${seen.length / 2}`);
