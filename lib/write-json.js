const fs = require("fs");
const { join } = require("path");


module.exports = function writeJSON(path, value) {
    path = join(process.cwd(), path);

    fs.writeFileSync(path, JSON.stringify(value, null, "    "));
};
