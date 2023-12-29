var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const lines: string[] = data.split("\r\n");

let finalValues: number[] = [];

for (const currLine of lines) {
  const line = currLine.split(" ").map(Number);

  let resultSequences: number[][] = [line];

  const generateSequence = (sequence: number[]) => {
    let currentSequence: number[] = [];
    for (let i = 0; i < sequence.length - 1; i++) {
      currentSequence.push(sequence[i + 1] - sequence[i]);
    }

    if (!currentSequence.every((seq) => seq === 0)) {
      resultSequences.push(currentSequence);
      generateSequence(currentSequence);
    }

    return currentSequence;
  };

  generateSequence(line);

  resultSequences.push(
    [
      ...Array(resultSequences[resultSequences.length - 1].length - 1).keys(),
    ].map(() => 0)
  );

  resultSequences.reverse();

  let extrapolatedValues: number[] = [];

  for (let i = 0; i < resultSequences.length - 1; i++) {
    const nextIndex = resultSequences[i].length;
    const lastValue = extrapolatedValues[extrapolatedValues.length - 1];
    const value = (lastValue ?? 0) + resultSequences[i + 1][nextIndex];

    extrapolatedValues.push(value);
  }
  finalValues.push(extrapolatedValues.pop()!);
}

console.log(`Result: ${finalValues.reduce((prev, curr) => prev + curr)}`);
