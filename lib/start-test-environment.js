const Ganache = require("ganache-core");


const config = require("../truffle.js");
const settings = require("../test-network-config.js");

const ganacheServer = Ganache.server(settings);

ganacheServer.listen(config.networks.test.port);
