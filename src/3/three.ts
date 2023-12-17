const symbols = ["*", "$", "#", "+", "/"];

const hasTrailing = (startIndex: number, endIndex: number, line: string) => {
  let hasPrefix = false;
  let hasSuffix = false;
  let hasInRange = false;
  console.log(line[endIndex + 1]);
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
  const numbersOfLine: any[] = [...line.matchAll(/\d+/g)];
  numbersOfLine;
  if (!numbersOfLine?.length) {
    lineIndex++;
    continue;
  }
  for (const regexRes of numbersOfLine) {
    const number = regexRes[0];
    let numberStartIndex = regexRes.index;

    const numberEndIndex = numberStartIndex + number?.toString().length - 1;

    numbersOfLine;
    console.log(line);
    const hasAdjacent = hasTrailing(numberStartIndex, numberEndIndex, line);

    const hasAdjacentInPrevious =
      lineIndex >= 1
        ? hasTrailing(numberStartIndex, numberEndIndex, line[lineIndex - 1])
        : false;

    const hasAdjacentInNext =
      lineIndex + 1 < line.length
        ? hasTrailing(numberStartIndex, numberEndIndex, line[lineIndex + 1])
        : false;

    if (hasAdjacent || hasAdjacentInNext || hasAdjacentInPrevious) {
      validNums.push(parseInt(number));
    }
  }

  lineIndex++;
}
const result = validNums.reduce((prev, curr) => prev + curr);
console.log(result);
