pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Project {

    string public charityName;
    string public description;

    //How much the project want's to raise
    uint public goal;

    address payable public charityAddress;

    mapping (address => uint) public donations;
    address[] public donators;

    mapping (address => bool) public approvals;
    uint public numberOfApprovals;

    uint public currentAmount;

    bool public isFunded;

    modifier onlyDonor() {
        bool isDonor = false; 
        for(uint i = 0; i < donators.length && !isDonor; i++) {
            if (msg.sender == donators[i]) {
                isDonor = true;
            }
        }
        require(isDonor, "Only donors can call this method");
        _;
    }

    constructor(uint _goal, string memory _charityName, string memory _description) {

        charityName = _charityName;
        description = _description;
        charityAddress = msg.sender;
        isFunded = false;
        goal = _goal;

    }

    function setProject(uint _goal, string memory _charityName, string memory _description) public {
        goal = _goal;
        charityName = _charityName;
        description = _description;
    }

    function donate() payable external {
        require(msg.value >= 0, "Not enough tokens");
        require(msg.sender != charityAddress, "The charity can't donate to it's own project");
        require(isFunded != true, "Project is already funded");

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

    function balanceOfProject() view public returns (uint256) {
        return address(this).balance;
    }

    function approve() public onlyDonor {
        //donor only approves once, only approves the project
        if(!approvals[msg.sender]){
            approvals[msg.sender] = true;
            numberOfApprovals += 1;
        }

        console.log("Approved, release?");
        //once the project has achieved the goal AND  everyone has approved funds will be released to the charity
        if(currentAmount >= goal && numberOfApprovals == donators.length) {
            console.log("Releasing funds conditions met");
            releaseFunds();
        }
    }

    function releaseFunds() private {
        charityAddress.transfer(currentAmount);
        isFunded = true;
    }
}
