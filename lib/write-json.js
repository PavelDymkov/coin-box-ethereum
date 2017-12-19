const fs = require("fs");
const path = require("path");


module.exports = function writeJSON(target, value) {
    let pathToFile = path.join(process.cwd(), target);

    fs.writeFileSync(pathToFile, JSON.stringify(value, null, "    "));
};
