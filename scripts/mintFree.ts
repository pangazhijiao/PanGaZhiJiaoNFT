import { ethers } from "hardhat";

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  console.log(process.env.CONTRACT_ADDRESS);
  const nft = await nftFactory.attach(process.env.CONTRACT_ADDRESS as any);
  await nft.mintFreeSale(1,  { value: ethers.utils.parseEther("0")});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
