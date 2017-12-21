const { spawn, spawnSync } = require("child_process");
const { join } = require("path");
const readJSON = require("../lib/read-json.js");


const genesisJSON = readJSON("local-etherium/genesis.json");
const config = readJSON("local-etherium/config.json");


executeCommand(`rm -rf temp`);
executeCommand(`mkdir temp`);

executeCommand(`geth --datadir ./temp init genesis.json`);
executeCommand(`geth --datadir ./temp js prepare-network.js`);

console.log("geth has been ran");

executeCommand(`geth
    --datadir ./temp

    --networkid ${genesisJSON.config.chainId}
    --nodiscover
    --maxpeers 0
    --ipcdisable
    --mine

    --rpc
    --rpcport ${config.rpcport}
    --rpccorsdomain "*"
    --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"

    --ws
    --wsport ${config.wsport}
    --wsorigins "*"
    --wsapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"
`);


function executeCommand(command) {
    let args = command.split(/\s+/).filter(source => source);

    command = args.shift();

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
