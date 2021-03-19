const { expect } = require("chai");

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

        hardhatProject = await Project.deploy();
    });


    describe("Deployment", function () {
        it("Should set the charity as the first owner", async function () {
            expect(await hardhatProject.charityAdress()).to.equal(charity.address);
        });

        it("Project should start with 0 in donations", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
        });
    });

    describe("Donations", function () {
        it("Should transfer tokens to the smart contract", async function () {
            await hardhatProject.connect(donor1).donate(50);
            expect(await hardhatProject.totalDonated()).to.equal(50);
        });

        it("Project should start with 0 in donations", async function () {
            expect(await hardhatProject.totalDonated()).to.equal(0);
        });
    });

});
