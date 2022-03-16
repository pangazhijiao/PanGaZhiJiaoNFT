import { ethers } from "hardhat";

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const nft = nftFactory.attach(process.env.CONTRACT_ADDRESS as any);

  console.log("Current presale max supply: %s", await nft.maxPresaleSupply());

  const tx = await nft.setMaxPresaleMintSupply(2222);
  console.log("Tx: %s", tx.hash);

  await tx.wait();
  console.log("Presale supply is set to: %s", await nft.maxPresaleSupply());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});