import { run } from "hardhat"

async function main() {
  const merkleRoot = "0xac7bed30976a9e81a333313a62bf9fc12c479b9250fc39f0fa061bf5fc2e0383";

  await run("verify:verify", {
    address: "0x7CcAd161335Aa709864f1F0d33C6d465486C4cD8",
    constructorArguments: [
      merkleRoot,
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
