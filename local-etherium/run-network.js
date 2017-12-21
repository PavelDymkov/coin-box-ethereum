const { spawn, spawnSync } = require("child_process");
const { join } = require("path");
const readJSON = require("../lib/read-json.js");


const genesisJSON = readJSON("local-etherium/genesis.json");
const config = readJSON("local-etherium/config.json");


exeCommand("rm", { "-rf": "temp" });
exeCommand("mkdir", null, "temp");

exeCommand("geth", { "--datadir": "./temp" }, "init genesis.json");
exeCommand("geth", { "--datadir": "./temp" }, "js prepare-network.js");

exeCommand("geth", {
    "--datadir": "./temp",

    "--identity": "LocalTestNetwork",
    "--networkid": genesisJSON.config.chainId,
    "--nodiscover": null,
    "--maxpeers": "0",
    "--ipcdisable": null,
    "--mine": null,

    "--rpc": null,
    "--rpcport": String(config.rpcport),
    "--rpccorsdomain": '"*"',
    "--rpcapi": '"admin,db,eth,debug,miner,net,shh,txpool,personal,web3"',

    "--ws": null,
    "--wsport": String(config.wsport),
    "--wsorigins": '"*"',
    "--wsapi": '"admin,db,eth,debug,miner,net,shh,txpool,personal,web3"'
});


function exeCommand(command, options, args) {
    args = typeof args == "string" ? args.split(/\s+/) : [];

    for (let key in options) if (options.hasOwnProperty(key)) {
        if (options[key]) args.unshift(options[key]);

        args.unshift(key);
    }

    // console.log("execute:\n", `${command} ${args.join(" ")}`, "\n");

    let result = spawnSync(command, args, {
        cwd: __dirname
    });

    if (result.status != 0) {
        if (Array.isArray(result.output)) {
            result.output.forEach(source => source && console.log(source.toString()));
        }

        process.exit(0);
    }
}
