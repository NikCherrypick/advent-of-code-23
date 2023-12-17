import * as fs from "fs";

export const readFile = (path: string = "/input.txt"): string[] => {
  const data = fs.readFileSync(__dirname + path, "utf8");

  return data.split("\r\n");
};

const lines = readFile();

const getFirstDigit = (arr: string[]): string | undefined => {
  return arr.find((char) => !isNaN(parseInt(char)));
};

const getLastDigit = (arr: string[]) => {
  const reArr = arr.reverse();

  return getFirstDigit(reArr);
};

const sum = (arr: number[]): number => {
  return arr.reduce((prev, curr) => prev + curr);
};

export const partOne = (lines: string[]) => {
  let sums: number[] = [];
  for (const line of lines) {
    const lineSum: number = sum([
      parseInt(getFirstDigit(line.split(""))!),
      parseInt(getLastDigit(line.split(""))!),
    ]);
    sums.push(lineSum);
  }

  return sum(sums);
};

console.log(`Part 1: ${partOne(lines)}`);
