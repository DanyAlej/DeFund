module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Project", {
    from: deployer,
    // gas: 4000000,
    args: [3400, "Dany's foundation", "We help kids in thirld world countries get access to science and technology education"],
  });
};
