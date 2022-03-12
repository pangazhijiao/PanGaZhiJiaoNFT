import { ethers } from "hardhat";

async function main() {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  console.log(process.env.CONTRACT_ADDRESS);
  const nft = await nftFactory.attach(process.env.CONTRACT_ADDRESS as any);
  const tx = await nft.mintPresale(
    1 /* total to buy*/,
    1 /* tier */,
    [
        "0x188c0524324a67b3659fe763f7df0204c5d96ff3ddd314bd79af201b3fe9a293",
        "0x9c8a098c70eb326fe8c2d75b8ba0a7c3bb31c5a5641dd615abb6529629892d66"
    ] /*proof*/, 
    { value: ethers.utils.parseEther("0.04")}
    );
  console.log("Tx: %s", tx.hash);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
