export const readFile = (path: string = "/input.txt"): string[] => {
  const data = fs.readFileSync(__dirname + path, "utf8");

  return data.split("\r\n");
};

const lines = readFile();

const hasSymbolAdjacent = (
  startIndex: number,
  endIndex: number,
  line: string
) => {
  let hasPrefix = false;
  let hasSuffix = false;
  let hasInRange = false;

  if (startIndex - 1 >= 0) {
    hasPrefix =
      isNaN(parseInt(line[startIndex - 1])) && line[startIndex - 1] !== ".";
  }
  if (endIndex + 1 < line.length) {
    hasSuffix =
      isNaN(parseInt(line[endIndex + 1])) && line[endIndex + 1] !== ".";
  }
  for (let i = startIndex; i <= endIndex; i++) {
    hasInRange = isNaN(parseInt(line[i])) && line[i] !== ".";
    if (hasInRange) {
      break;
    }
  }

  return hasPrefix || hasSuffix || hasInRange;
};

let lineIndex = 0;
let validNums: number[] = [];
for (const line of lines) {
  const numbersOfLine = [...line.matchAll(/\d+/g)];
  if (!numbersOfLine?.length) {
    lineIndex++;
    continue;
  }
  for (const regexRes of numbersOfLine) {
    const number = regexRes[0];
    let numberStartIndex = regexRes.index!;

    const numberEndIndex = numberStartIndex + number?.toString().length - 1;

    const hasAdjacent = hasSymbolAdjacent(
      numberStartIndex,
      numberEndIndex,
      line
    );

    const hasAdjacentInPrevious =
      lineIndex >= 1
        ? hasSymbolAdjacent(
            numberStartIndex,
            numberEndIndex,
            line[lineIndex - 1]
          )
        : false;

    const hasAdjacentInNext =
      lineIndex + 1 < line.length
        ? hasSymbolAdjacent(
            numberStartIndex,
            numberEndIndex,
            line[lineIndex + 1]
          )
        : false;

    if (hasAdjacent || hasAdjacentInNext || hasAdjacentInPrevious) {
      validNums.push(parseInt(number));
    }
  }

  lineIndex++;
}
const result = validNums.reduce((prev, curr) => prev + curr);
console.log(`Result: ${result}`);
