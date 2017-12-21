const Migrations = artifacts.require("./Migrations.sol");
const CoinBox = artifacts.require("./CoinBox.sol");

const Web3 = require('web3');
const writeJSON = require("../lib/write-json.js");


module.exports = function(deployer, network, accounts) {
    if (network == "test") {
        deployer.deploy(Migrations);
    }

    if (network == "test_network") {
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

    if (network == "local_etherium") {
        const web3 = new Web3(`http://localhost:8545`);

        const owner = accounts[0];
        const periodInDays = 30;

        (async function () {
            await web3.eth.personal.unlockAccount(owner, "password123", 86400);

            deployer.deploy(CoinBox, periodInDays, { from: owner }).then(() => {
                let deployedInfo = {
                    name: CoinBox.contractName,
                    address: CoinBox.address,
                    owner, periodInDays
                };

                console.log(deployedInfo);
            });
        } ());
    }
};
