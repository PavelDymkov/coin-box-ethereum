const Web3 = require('web3');
const ganache = require("ganache-core");


const ganacheProvider = ganache.provider();
ganacheProvider.send = ganacheProvider.sendAsync; // fix

module.exports = new Web3(ganacheProvider);
