pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


library Date {
    enum type {
        SECOND, MINUTE, HOUR,
        DAY, WEEK, YEAR
    }

    function convert(uint source, type from, type to) {
        if (from == type.DAY && to == type.SECOND) {
            return source * 1 days;
        }
    }
}

contract CoinBox is Ownable {
    using Date for uint;

    struct Purpose {
        string title;
        uint timeLimit;
        uint balance;
    }

    uint8 purposeCounter;
    mapping(uint8 => Purpose) purposes;

    function addPurpose(string title, uint period_in_days) public {
        Purpose newPurpose;

        newPurpose.title = title;
        newPurpose.timeLimit = now + period_in_days.convert(type.DAY, type.SECOND);
    }
}