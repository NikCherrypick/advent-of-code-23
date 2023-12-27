import * as fs from "fs";

export const readFile = (path: string = "/input.txt"): string[] => {
  const data = fs.readFileSync(__dirname + path, "utf8");

  return data.split("\r\n");
};

const lines = readFile();

// 12 red cubes, 13 green cubes, and 14 blue cubes?
const MAX_COUNT = {
  red: 12,
  green: 13,
  blue: 14,
};

const getValueByColor = (line: string, colorKey: string) => {
  const lineEl = line.split(",").map((el) => el.trim());
  const colorEl = lineEl.find((el) => el.includes(colorKey));
  const val = colorEl ? colorEl.match(/\d+/g)![0] : "0";

  return parseInt(val);
};

let gameId = 1;
const validGames: number[] = [];

export const partOne = (lines: string[]) => {
  for (const line of lines) {
    const startIndex = line.indexOf(":") + 1;
    const sliceLine = line.slice(startIndex);
    const lineArr = sliceLine.split(";");

    if (
      lineArr.every((lineGroup) =>
        Object.entries(MAX_COUNT).every(
          ([key, value]) => getValueByColor(lineGroup, key) <= value
        )
      )
    ) {
      validGames.push(gameId);
    }
    gameId++;
  }
  return validGames.reduce((prev, curr) => prev + curr);
};

console.log(`Result: ${partOne(lines)}`);
