(async function() {
    const eth = new Eth(web3.currentProvider);

    const CoinBox = await getJson("CoinBox.json");
    const testNetwork = await getJson("test-network.json");

    debugger
}());


async function getJson(url) {
    return fetch(url).then(response => response.json());
}
