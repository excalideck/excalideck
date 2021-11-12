const { cpSync, mkdirSync } = require("fs");
const { join } = require("path");

mkdirSync(join(__dirname, "../build/assets/"), { recursive: true });
cpSync(
    join(__dirname, "../src/assets/misc"),
    join(__dirname, "../build/assets/misc/"),
    { recursive: true }
);
