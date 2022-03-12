import { ethers } from "hardhat";
import { run } from "hardhat"

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  console.log(process.env.CONTRACT_ADDRESS);
  const nft = await nftFactory.attach(process.env.CONTRACT_ADDRESS as any);

  let ispresale = await nft.isPresaleActive();
  console.log("isPresaleActive:%s", ispresale.toString());
  let ispublic = await nft.isPublicActive();
  console.log("isPublicActive:%s", ispublic.toString());
  let isfree = await nft.isFreeMintActive();
  console.log("isFreeMintActive:%s", isfree.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
