const Web3 = require("web");
const readJSON = require("lib/read-json.js");


const CoinBox = readJSON("build/contracts/CoinBox.json");
const config = readJSON("local-etherium/config.json");
const deployInfo = readJSON("local-etherium/deployed-info.json");
const web3 = new Web3(`http://localhost:${config.rpcport}`);

(async function () {
    // const constract = new web3.eth.Contract(CoinBox.abi, CoinBox.address);
} ());
