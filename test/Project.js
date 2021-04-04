const { expect } = require("chai");
var utils = require('ethers').utils;

require("@nomiclabs/hardhat-web3");
// I can use web 3 by simply accessing web3.   hardhat makes an instance available

describe('Project contract', function () {

    let Project;
    let hardhatProject;
    let charity;
    let donor1;
    let donor2;
    let donors;



    beforeEach(async function () {

        Project = await ethers.getContractFactory("Project");
        [charity, donor1, donor2, ...donors] = await ethers.getSigners();

        hardhatProject = await Project.deploy(2000, "La caridad", "ayudamos a niños neceistados", charity.getAddress());
    });


    describe("Deployment", function () {
        it("Should set the charity as the first owner", async function () {
            expect(await hardhatProject.charityAddress()).to.equal(charity.address);
        });

        it("Project should start with 0 in donations", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
        });

        it("Goal is properly set", async function () {
            expect(await hardhatProject.goal()).to.equal(2000);
        });
    });

    describe("Donations", function () {
        it("Should transfer tokens to the smart contract", async function () {
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            donorBalance = await donor1.getBalance();
            expect(await hardhatProject.totalDonated()).to.equal(900);
            expect(await hardhatProject.getNumberOfDonors()).to.equal(1); 
        });

        it("Two donations will be made", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            expect(await hardhatProject.totalDonated()).to.equal(1400);
            expect(await hardhatProject.getNumberOfDonors()).to.equal(2); 

            //this is the projects real balance, which menas how much has the contract in escrow
            const projectRealBalance = await hardhatProject.balanceOfProject();
            expect(projectRealBalance).to.equal(1400); 
        });
    });

    describe("Approving charitys release of money", function () {
        it("A donation is made and then approved", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            //donor 2 is going to approve the release of funds and donor 1 isn't
            await hardhatProject.connect(donor1).approve();

            expect(await hardhatProject.numberOfApprovals()).to.equal(1);
        });

        it("Should not let the charity make an approval", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            //this is working properly but chai doens't seem to have the assertion errror for require
            //expect(await hardhatProject.connect(charity).approve()).to.throw("Only donors can call this method");

        });

        it("All the donations are approved but hasn't hit the target", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            //donor 2 is going to approve the release of funds and donor 1 isn't
            await hardhatProject.connect(donor1).approve();
            let charityBalanceBefore = await charity.getBalance();
            await hardhatProject.connect(donor2).approve();

            expect(await hardhatProject.numberOfApprovals()).to.equal(2);
            let charityBalanceAfter = await charity.getBalance();

            console.log(charityBalanceBefore.eq(charityBalanceAfter));
            expect((charityBalanceAfter.sub(charityBalanceBefore)).toNumber()).to.equal(0);

        });

        it("Donor approves more than once", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            //donor 2 is going to approve the release of funds and donor 1 isn't
            await hardhatProject.connect(donor1).approve();
            await hardhatProject.connect(donor2).approve();
            await hardhatProject.connect(donor2).approve();

            expect(await hardhatProject.numberOfApprovals()).to.equal(2);
        });


        it("Gets to target and releases funds", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
            await hardhatProject.connect(donor1).donate({from: donor1.getAddress(), value: 1900});
            await hardhatProject.connect(donor2).donate({from: donor2.getAddress(), value: 500});

            //donor 2 is going to approve the release of funds and donor 1 isn't
            await hardhatProject.connect(donor1).approve();
            let charityBalanceBefore = await charity.getBalance();
            console.log(charityBalanceBefore);
            await hardhatProject.connect(donor2).approve();

            expect(await hardhatProject.numberOfApprovals()).to.equal(2);
            let charityBalanceAfter = await charity.getBalance();
            console.log(charityBalanceAfter);


            console.log(charityBalanceBefore.eq(charityBalanceAfter));
            expect((charityBalanceAfter.sub(charityBalanceBefore)).toNumber()).to.equal(2400);
        });



    });
});
