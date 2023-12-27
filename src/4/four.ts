import * as fs from "fs";

export const readFile = (path: string = "/input.txt"): string[] => {
  const data = fs.readFileSync(__dirname + path, "utf8");

  return data.split("\r\n");
};

const eliminateEmpty = (card: string) => {
  return card
    .split(" ")
    .filter((val) => val)
    .join(" ");
};

const getCards = (line: string) => {
  let cards = line.slice(line.indexOf(":") + 1).trim();
  let [hand, winningCards] = cards
    .split("|")
    .map((card) => eliminateEmpty(card.trim()));

  return [hand, winningCards];
};

const lines = readFile();

let resultAmounts: number[] = [];
for (const line of lines) {
  const [hand, winningCards] = getCards(line);

  const winningAmount = hand.split(" ").reduce((prev, curr) => {
    if (winningCards.split(" ").includes(curr)) {
      if (prev <= 0) {
        return prev + 1;
      } else {
        return prev * 2;
      }
    }
    return prev;
  }, 0);

  resultAmounts.push(winningAmount);
}

const result = resultAmounts.reduce((prev, curr) => prev + curr);

console.log(`Result: ${result}`);
