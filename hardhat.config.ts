require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("hardhat-deploy");
require("@symfoni/hardhat-react");
require("hardhat-typechain");
require("@typechain/ethers-v5");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.7.3",
    paths: {
        sources: "./contracts",
        tests: "./test"
    },
    react: {
      providerPriority: ["web3modal", "hardhat"],
    },
    networks: {
      hardhat: {
        inject: false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
        accounts: {
          mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
        },
      },
    },
};
