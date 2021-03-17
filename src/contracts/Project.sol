pragma solidity ^0.7.0;

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

    function donate(uint256 amount) payable external {
        require(msg.value >= 0, "Not enough tokens");
        require(state == State.Started, "Project not started or already funded");

        // Transfer the amount.
        donations[msg.sender] += msg.value;
        donators.push(msg.sender);

        currentAmount += msg.value;

    }

    function totalDonated() external view returns (uint256) {
        return currentAmount;
    }

    function getNumberOfDonors() external view returns (uint256) {
        return donators.length;
    }
}

