import { ethers } from "hardhat";
import { run } from "hardhat"

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const merkleRoot = "0xac7bed30976a9e81a333313a62bf9fc12c479b9250fc39f0fa061bf5fc2e0383";

  const nft = await nftFactory.deploy(
    merkleRoot);
  console.log("Deploy at tx %s", nft.deployTransaction.hash);

  await nft.deployed();
  console.log("Deploy to address %s", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
