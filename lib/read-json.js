const fs = require("fs");
const { join } = require("path");


module.exports = function readJSON(path) {
    path = join(process.cwd(), path);

    return JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));
};
