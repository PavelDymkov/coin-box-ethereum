const Migrations = artifacts.require("./Migrations.sol");
const CoinBox = artifacts.require("./CoinBox.sol");

const Web3 = require('web3');
const writeJSON = require("../lib/write-json.js");
const truffleConfig = require("../truffle.js");


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
        });
    }

    if (network == "local_etherium") {
        const port = truffleConfig.networks.local_etherium.port;
        const web3 = new Web3(`http://localhost:${port}`);

        const owner = accounts[0];
        const periodInDays = 30;

        (async function () {
            let day = 60 * 60 * 24;

            await web3.eth.personal.unlockAccount(owner, "password123", day);

            // Error: insufficient funds for gas * price + value
            // Ошибка означает, что на аккаунт еще не намайнилось достаточно эфира
            await deployer.deploy(CoinBox, periodInDays, { from: owner });

            let deployedInfo = {
                name: CoinBox.contractName,
                address: CoinBox.address,
                owner, periodInDays
            };

            writeJSON("local-ethereum/deployed-info.json", deployedInfo);
            console.log(`deployed-info.json created`);
        } ());
    }
};
