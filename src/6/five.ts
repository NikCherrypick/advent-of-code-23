var fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", "utf8");

const input = data.split("\r\n");
