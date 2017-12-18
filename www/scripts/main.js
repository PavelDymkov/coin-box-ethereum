(async function() {
    const CoinBox = await getJson("CoinBox.json");
    const testNetwork = await getJson("test-network.json");


}());


async function getJson(url) {
    return fetch(url).then(response => response.json());
}

