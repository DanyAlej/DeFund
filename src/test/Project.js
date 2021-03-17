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
  });
});
