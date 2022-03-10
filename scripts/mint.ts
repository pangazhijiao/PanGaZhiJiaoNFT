import { ethers } from "hardhat";
import { run } from "hardhat"

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const nft = await nftFactory.attach("0xBb0338353777FD167748E09b64E2D8cE36bffe09");
  const merkleRoot = "0xac7bed30976a9e81a333313a62bf9fc12c479b9250fc39f0fa061bf5fc2e0383";
  await nft.mintPublicSale(1,  { value: ethers.utils.parseEther("0.04")});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
