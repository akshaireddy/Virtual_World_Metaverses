const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const VirtualWorld = await ethers.getContractFactory("VirtualWorld");
  
  // Deploying the proxy and calling the initialize function
  const virtualWorld = await upgrades.deployProxy(
    VirtualWorld,
    [],  // No constructor arguments in this example
    { initializer: "initialize" }
  );

  await virtualWorld.deployed();

  console.log("VirtualWorld deployed to:", virtualWorld.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
