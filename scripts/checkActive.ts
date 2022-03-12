import { ethers } from "hardhat";
import { run } from "hardhat"

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const nft = await nftFactory.attach("0x5438d86752152fD86073Df3FF880727f76CbB3Be");
  const merkleRoot = "0xac7bed30976a9e81a333313a62bf9fc12c479b9250fc39f0fa061bf5fc2e0383";
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
