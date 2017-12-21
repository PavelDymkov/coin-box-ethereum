const Web3 = require("web3");
const readJSON = require("../lib/read-json.js");


const CoinBox = readJSON("build/contracts/CoinBox.json");
const config = readJSON("local-etherium/config.json");
const deployInfo = readJSON("local-etherium/deployed-info.json");
const web3 = new Web3(`http://localhost:${config.rpcport}`);
// const web3 = new Web3(`ws://localhost:${config.wsport}`); // not work

(async function () {
    const constract = new web3.eth.Contract(CoinBox.abi, deployInfo.address);

    constract.events.allEvents(function (error) {
        if (error) return console.log(error.message);
    });

    await constract.methods.putCoins().send({ from: deployInfo.owner, value: 10 });

    let balance = await constract.methods.getBalance().call({ from: deployInfo.owner });

    console.log("balance", balance);
} ());
