const { cpSync, mkdirSync } = require("fs");
const { join } = require("path");

mkdirSync(join(__dirname, "../build/assets/"), { recursive: true });
cpSync(
    join(__dirname, "../src/assets/other"),
    join(__dirname, "../build/assets/other/"),
    { recursive: true }
);
