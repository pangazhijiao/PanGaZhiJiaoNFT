import { ethers } from "hardhat";
import { run } from "hardhat"

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  console.log(process.env.CONTRACT_ADDRESS);
  const nft = await nftFactory.attach(process.env.CONTRACT_ADDRESS as any);
  let url = await nft.tokenURI(0);
  console.log("tokenURI= %s", url);
  let baseurl = await nft.baseURI();
  console.log("baseurl= %s", baseurl);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
