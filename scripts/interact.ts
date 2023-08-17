import { ethers } from "hardhat";
// const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = process.env.CONTRACT_ADDRESS;

  const VirtualWorld = await ethers.getContractFactory("VirtualWorld");
  const virtualWorld = await VirtualWorld.attach("0x36eF388eE5A43f37Cf8F643A3975619e61E82672");

  // Interact with the contract here
  const tx = await virtualWorld.createAvatar("Alice", 10, 20);
  await tx.wait();

  const position = await virtualWorld.getAvatarPosition(deployer.address);
  console.log("Avatar position:", position);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
