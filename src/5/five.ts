var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const lines: string[] = data.split("\r\n");

const seeds = lines[0].split(":")[1].trim();

const getMaps = () => {
  const maps: string[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const currentStart = lines[i].split("")[0];
    if (currentStart && isNaN(parseInt(currentStart))) {
      let lineIndex = i + 1;
      const map: string[] = [];
      while (
        lines[lineIndex] &&
        !isNaN(parseInt(lines[lineIndex].split("")[0]))
      ) {
        map.push(lines[lineIndex]);
        lineIndex++;
      }
      if (map.length) {
        maps.push(map);
      }
    }
  }
  return maps;
};

const maps = getMaps();

const resultMapping: number[] = [];
for (const seedStr of seeds.split(" ").slice(0)) {
  seedStr;
  let seed = parseInt(seedStr);
  for (let i = 0; i < maps.length; i++) {
    let foundMapping = false;
    for (let j = 0; j < maps[i].length && !foundMapping; j++) {
      const [destinantion, source, range] = maps[i][j]
        .split(" ")
        .map((el) => parseInt(el));

      if (seed >= source && seed <= source + range - 1) {
        seed = destinantion + (seed - source);

        foundMapping = true;
      }
    }
  }
  resultMapping.push(seed);
}
console.log(`Result: ${Math.min(...resultMapping)}`);
