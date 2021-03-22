pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Project {

    string public charityName;
    string public description;

    //How much the project want's to raise
    uint public goal;

    address payable public charityAdress;

    mapping (address => uint) public donations;
    address[] public donators;

    uint public currentAmount;

    enum State { Created, Started, Funded, Inactive }

    State public state;

    constructor() {

        charityAdress = msg.sender;
        state = State.Started;

    }

    function donate() payable external {
        console.log("amount %s", msg.value);
        console.log("sender address  %s", msg.sender);
       // console.log("state %s vs %s", state, State.Started);
        require(msg.value >= 0, "Not enough tokens");
        require(state == State.Started, "Project not started or already funded");

        // Transfer the amount.
        donations[msg.sender] += msg.value;
        donators.push(msg.sender);
        console.log("numero de donadores %s", donators.length);

        currentAmount += msg.value;

    }

    function totalDonated() external view returns (uint256) {
        return currentAmount;
    }

    function getNumberOfDonors() external view returns (uint256) {
        return donators.length;
    }
}

