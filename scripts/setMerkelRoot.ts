import { ethers } from "hardhat";

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const nft = nftFactory.attach(process.env.CONTRACT_ADDRESS as any);

  console.log("Current merkle root: %s", await nft.presaleMerkleRoot());

  const tx = await nft.setPresaleMerkleRoot("0x8e5539b598230329dc8a2af5eba1124bf44fe7b542db97a40d7932a26f9029c7");
  console.log("Tx: %s", tx.hash);

  await tx.wait();
  console.log("Merkle root is set to: %s", await nft.presaleMerkleRoot());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
