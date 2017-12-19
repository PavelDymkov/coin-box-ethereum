const Web3 = require('web3');
const readJSON = require("./lib/read-json.js");


const config = require("./truffle.js");
const testNetwork = config.networks.test;

const web3 = new Web3(new Web3.providers.HttpProvider(`http://${testNetwork.host}:${testNetwork.port}`));

const CoinBox = readJSON("./build/contracts/CoinBox.json");
const deployedInfo = readJSON("./deployed-info.json");

(async () => {
    const coinBox = new web3.eth.Contract(CoinBox.abi, deployedInfo.address, { from: deployedInfo.owner });

    coinBox.events.CoinsSend({ fromBlock: 0, toBlock: 'latest' }, (error, event) => {
        if (error) console.log(error.message);
        else console.log("event:", event);
    });
    coinBox.events.allEvents((error, event) => {
        if (error) console.log(error.message);
        else console.log("event:", event);
    });

    await coinBox.methods.putCoins().send({ from: deployedInfo.owner, value: 5 });

    let balance = await coinBox.methods.getBalance().call({ from: deployedInfo.owner });

    debugger
    //freezeProccess();
})();

function freezeProccess() {
    setTimeout(freezeProccess, 10000);
}
