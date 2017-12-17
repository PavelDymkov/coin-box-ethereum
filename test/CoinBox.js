const CoinBox = artifacts.require("CoinBox");

const config = require("../truffle.js");
const RPCProvider = require("../lib/rpc-provider.js");
const exception = require("../lib/test-exceptions.js");
const DateTime = require("../lib/date-time.js");


const rpcProvider = new RPCProvider(config.networks.test);

contract("CoinBox", accounts => {
    let coinBox;

    const initialPayment = 10000;
    const periodInDays = 30;
    const owner = accounts[0];


    beforeEach(async () => {
        coinBox = await CoinBox.new(periodInDays, {
            from: owner,
            value: "0x" + initialPayment.toString(16)
        });
    });


    describe(`.getCoins()`, () => {
        it(`should failed to get coins before locked period hasn't been expired`, async () => {
            const errorMessage = "Exception while processing transaction: revert";
            const tester = async () => {
                await coinBox.getCoins({ from: owner });
            };

            const transactionReverted = await exception.catched(tester, errorMessage);

            assert.isTrue(transactionReverted);
        });

        it(`should get coins after locked period has been expired`, async () => {
            let timeShift = (new DateTime).addDays(periodInDays).addSeconds(1).valueOf();

            rpcProvider.send("evm_increaseTime", timeShift);
            rpcProvider.send("evm_mine");
            
            let transaction = await coinBox.getCoins({ from: owner });

            assert.isTrue(transaction.receipt.status == 1);
        });
    });

    describe(`.getBalance()`, () => {
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

    describe(`.putCoins()`, () => {
        it(`should puts coins from owner`, async () => {
            const addCoins = 7500;

            await coinBox.putCoins({
                from: owner,
                value: "0x" + addCoins.toString(16)
            });

            const balance = await coinBox.getBalance({ from: owner });
            const excepted = initialPayment + addCoins;

            assert.equal(balance, excepted);
        });

        it(`should puts coins from another account`, async () => {
            const addCoins = 4500;

            await coinBox.putCoins({
                from: accounts[1],
                value: "0x" + addCoins.toString(16)
            });

            const balance = await coinBox.getBalance({ from: owner });
            const excepted = initialPayment + addCoins;

            assert.equal(balance, excepted);
        });

        it(`should puts coins from owner and another account`, async () => {
            const coinsFromOwner = 3000;
            const coinsFromAnotherAccount = 5000;

            await coinBox.putCoins({
                from: owner,
                value: "0x" + coinsFromOwner.toString(16)
            });

            await coinBox.putCoins({
                from: accounts[1],
                value: "0x" + coinsFromAnotherAccount.toString(16)
            });

            const balance = await coinBox.getBalance({ from: owner });
            const excepted = initialPayment + coinsFromOwner + coinsFromAnotherAccount;

            assert.equal(balance, excepted);
        });
    });
});
