fetch("CoinBox.json")
    .then(response => {
        debugger
        return response.json()
    })
    .then(contract => {
        debugger
        return contract;
    });
