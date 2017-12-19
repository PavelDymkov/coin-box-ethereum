const Migrations = artifacts.require("./Migrations.sol");
const CoinBox = artifacts.require("./CoinBox.sol");

const writeJSON = require("../lib/write-json.js");


module.exports = function(deployer, network, accounts) {
    if (network == "test") {
        deployer.deploy(Migrations);
    }

    if (network == "development") {
        const owner = accounts[0];
        const periodInDays = 30;

        deployer.deploy(CoinBox, periodInDays, { from: owner }).then(() => {
            let deployedInfo = {
                name: CoinBox.contractName,
                address: CoinBox.address,
                owner, periodInDays
            };

            writeJSON("./deployed-info.json", deployedInfo);
            console.log(`deployed-info.json created`);

            writeJSON("./www/deployed-info.json", deployedInfo);
            console.log(`www/deployed-info.json created`);
        });
    }
};
