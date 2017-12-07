const CoinBox = artifacts.require("CoinBox");


contract("MetaCoin", accounts => {
    describe(`getBalance testing`, () => {
        let coinBox;

        const initialPayment = 10000;
        const periodInDays = 1;
        const owner = accounts[0];

        beforeEach(async () => {
            coinBox = await CoinBox.new(periodInDays, {
                from: owner,
                value: "0x" + initialPayment.toString(16)
            });
        });

        it(`should return initial send balance`, async () => {
            const balance = await coinBox.getBalance({ from: owner });

            assert.equal(balance, initialPayment);
        });

        it(`should return sum of initial balance and added coins`, async () => {
            const addCoins = 5000;

            await coinBox.putCoins({
                from: owner,
                value: "0x" + addCoins.toString(16)
            });

            const balance = await coinBox.getBalance({ from: owner });
            const excepted = initialPayment + addCoins;

            assert.equal(balance, excepted);
        });
    });
});
