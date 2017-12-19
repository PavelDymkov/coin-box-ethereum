pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract CoinBox is Ownable {
    using SafeMath for uint;

    uint balance;
    uint lockedTo;

    event CoinsSend(address sender);

    function CoinBox(uint periodInDays) public payable {
        require(periodInDays > 0);

        balance = msg.value;
        lockedTo = now.add(periodInDays.mul(1 days));
    }

    function putCoins() public payable {
        balance += msg.value;

        CoinsSend(msg.sender);
    }

    function getCoins() public onlyOwner {
        require(now > lockedTo);

        selfdestruct(owner);
    }
    
    function getBalance() public view onlyOwner returns(uint) {
        return balance;
    }
}
