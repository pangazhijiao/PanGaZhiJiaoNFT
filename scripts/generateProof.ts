import { Log } from "@ethersproject/abstract-provider";
import { BigNumber, ethers, providers } from "ethers";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { generateMerkleProofs } from "../utils/mintlist";

interface Whitelist {
  address: string;
  tier: number;
}

async function main() {
  let whitelists: Whitelist[] = JSON.parse(readFileSync("/tmp/input.json").toString());
  const mintList = [];
  for (const item of whitelists) {
    mintList.push({ wallet: item.address, tier: item.tier });
  }
  console.log(mintList);
  const tree = generateMerkleProofs(mintList);
  writeFileSync("/tmp/output.json", JSON.stringify(tree, null, "  "));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
