module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        test: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        test_network: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        local_etherium: {
            host: "localhost",
            port: 8545,
            network_id: 15
        }
    }
};
