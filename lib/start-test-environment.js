const Ganache = require("ganache-core");
const writeJSON = require("./write-json.js");


const config = require("../truffle.js");
const testNetwork = config.networks.test;
const settings = require("../test-network-config.js");

const ganacheServer = Ganache.server(settings);

ganacheServer.listen(testNetwork.port, testNetwork.host, (error, result) => {
    if (error) return console.log(error);

    let state = result ? result : ganacheServer.provider.manager.state;
    let networkData = {
        mnemonic: state.mnemonic,
        accounts: []
    };

    let accounts = state.accounts;

    for (let address in accounts) {
        let account = accounts[address];

        networkData.accounts.push({
            address,
            publicKey: account.publicKey.toString("hex"),
            secretKey: account.secretKey.toString("hex"),
            locked: state.isUnlocked(address)
        });
    }

    writeJSON("./www/test-network.json", networkData);
});
