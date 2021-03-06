pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Project {

    string public charityName;
    string public description;
    string public update;

    //How much the project want's to raise
    uint public goal;

    address payable public charityAddress;

    mapping (address => uint) public donations;
    address[] public donators;

    mapping (address => bool) public approvals;
    uint public numberOfApprovals;

    uint public currentAmount;

    bool public isFunded;
    bool public isClosed;

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

    function setUpdate(string memory _update) public {
        update = _update;
    }

    function donate() payable external {
        require(msg.value >= 0, "Not enough tokens");
        require(msg.sender != charityAddress, "The charity can't donate to it's own project");
        require(isFunded != true, "Project is already funded");

        // Transfer the amount.
        donations[msg.sender] += msg.value;
        donators.push(msg.sender);

        currentAmount += msg.value;
        if(currentAmount >= goal) {
            console.log("Releasing first 50% funds");
            releaseFunds();
        }
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
        //donador solo puede aprobar una vez
        if(!approvals[msg.sender]){
            approvals[msg.sender] = true;
            numberOfApprovals += 1;
        }

        //Una vez el proyecto ha sido aprobado por todos los donantes se liberan el resto de los fondos.
        if(isFunded && numberOfApprovals == donators.length) {
            console.log("Releasing next 50% funds everyone has approved");
            releaseFunds();
        }
    }

    function releaseFunds() private {
        charityAddress.transfer(currentAmount/2);
        if(isFunded){
            isClosed = true;
        }
        isFunded = true;
    }
}
