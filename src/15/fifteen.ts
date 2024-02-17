var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const sequences = data.split(",");

function hash(input: string): number {
  const chars = input.split("");

  const result = chars.reduce((prev, curr) => {
    const charCode = curr.charCodeAt(0);

    return ((prev + charCode) * 17) % 256;
  }, 0);

  return result;
}

console.log(
  `Result: ${sequences.reduce((prev, curr) => prev + hash(curr), 0)}`
);
