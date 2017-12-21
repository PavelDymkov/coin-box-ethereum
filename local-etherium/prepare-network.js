const Web3 = require('web3');
const readJSON = require("../lib/read-json.js");


const config = readJSON("local-etherium/config.json");
const web3 = new Web3(`http://localhost:${config.rpcport}`);

const accountsNumber = 5;
const day = 86400;

(async () => {
    for (let counter = 0; counter < accountsNumber; counter++) {
        let password = "password123";
        let address = await web3.eth.personal.newAccount(password);

        await web3.eth.personal.unlockAccount(address, password, day);
    }
})();
