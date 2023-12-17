import * as fs from "fs";

export const readFile = (path: string = "/input.txt"): string[] => {
  const data = fs.readFileSync(__dirname + path, "utf8");

  return data.split("\r\n");
};

const lines = readFile();

lines;
$ git remote add origin git@github.com:Nikcherrypick/advent-of-code
