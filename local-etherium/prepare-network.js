const Web3 = require('web3');
const readJSON = require("../lib/read-json.js");


const config = readJSON("local-etherium/config.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://localhost:${config.wsport}`));

(async () => {
    debugger
    let r1 = await web3.eth.personal.newAccount('!@superpassword');
    debugger
})();
