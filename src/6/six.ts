var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const lines: string[] = data.split("\r\n");

const times: number[] = lines[0]
  .split(" ")
  .filter((el) => !isNaN(parseInt(el)))
  .map(Number);

const records = lines[1]
  .split(" ")
  .filter((el) => !isNaN(parseInt(el)))
  .map(Number);

const getDistancesForTimes = (maxTime: number): Map<number, number> => {
  const result = new Map<number, number>();

  const times = [...Array(maxTime + 1).keys()];

  for (const time of times) {
    result.set(time, time * (maxTime - time));
  }

  return result;
};

const validTimesCount: number[] = [];
for (let i = 0; i < times.length; i++) {
  const validTimes: number[] = [];
  const distancesForTimes = getDistancesForTimes(times[i]);
  const record = records[i];
  for (const [time, distance] of [...distancesForTimes.entries()]) {
    if (distance > record) {
      validTimes.push(time);
    }
  }
  validTimesCount.push(validTimes.length);
}

const result = validTimesCount.reduce((prev, curr) => prev * curr);
console.log(`Result: ${result}`);
