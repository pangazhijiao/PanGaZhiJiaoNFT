import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { generateMerkleProofs } from "../utils/mintlist";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const endTime = Math.ceil(+new Date() / 1000) + 1000 * 3600 * 5;

async function setupContract(root: string) {
  const nftFactory = await ethers.getContractFactory("PanGaZhiJiaoNFT");
  const nft = await nftFactory.deploy(root);
  await nft.deployed();

  return nft;
}

describe("PanGaZhiJiaoNFT", function () {
  let tree: {
    root: string
    proofs: { [wallet: string]: { tier: number, proofs: string[] } },
  };

  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let charlie: SignerWithAddress;
  let david: SignerWithAddress;
  let eric: SignerWithAddress;

  before(async function () {
    [owner, alice, bob, charlie, david, eric] = await ethers.getSigners();

    const mintList = [
      { wallet: alice.address, tier: 0 },
      { wallet: bob.address, tier: 0 },
      { wallet: charlie.address, tier: 1 },
      { wallet: david.address, tier: 1 },
      { wallet: eric.address, tier: 1 },
    ];

    tree = generateMerkleProofs(mintList);
  });

  describe("Constrcutor & Default Settings", () => {
    it("Constructor", async function () {
      const merkleRoot = tree.root;
      const nft = await setupContract(merkleRoot);
    });
  });

  describe("Mint Presale", () => {
    it("Invalid proof", async function test() {
      const nft = await setupContract(tree.root);
      await nft.togglePresaleActive();
      const minterInfo = tree.proofs[alice.address];
      await expect(nft.connect(alice).mintPresale(1, 0, ["0x636661383339613930663361353138616235666433393039612312313123abcd"], { value: ethers.utils.parseEther("0.02")}))
        .to.be.revertedWith("INVALID_WHITELIST_PROOF");
    });

    it("exceed max OG mint", async function test() {
        const nft = await setupContract(tree.root);
        await nft.togglePresaleActive();
        const minterInfo = tree.proofs[alice.address];
        await expect(nft.connect(alice).mintPresale(4, 0, minterInfo.proofs, { value: ethers.utils.parseEther("0.02")}))
          .to.be.revertedWith("EXCEEDS_MAX_OG_MINT");
    });

    it("exceed max presale mint", async function test() {
      const nft = await setupContract(tree.root);
      await nft.togglePresaleActive();
      const minterInfo = tree.proofs[eric.address];
      await expect(nft.connect(eric).mintPresale(3, 1, minterInfo.proofs, { value: ethers.utils.parseEther("0.04")}))
        .to.be.revertedWith("EXCEEDS_MAX_PRESALE_MINT");
    });

    it("presale mint not active", async function test() {
        const nft = await setupContract(tree.root);
        const minterInfo = tree.proofs[alice.address];
        await expect(nft.connect(alice).mintPresale(1, 0, minterInfo.proofs, { value: ethers.utils.parseEther("0.04")}))
          .to.be.revertedWith("PRESALE_MINT_IS_NOT_YET_ACTIVE");
    });

    it("wrong amount", async function test() {
        const nft = await setupContract(tree.root);
        await nft.togglePresaleActive();
        const minterInfo = tree.proofs[eric.address];
        await expect(nft.connect(eric).mintPresale(1, 1, minterInfo.proofs, { value: ethers.utils.parseEther("0.03")}))
          .to.be.revertedWith("INSUFFICIENT_PRESALE_PAYMENT");
    });

    it("presale pass case", async function test() {
        const nft = await setupContract(tree.root);
        await nft.togglePresaleActive();
        const minterInfo = tree.proofs[eric.address];
        await nft.connect(eric).mintPresale(2, 1, minterInfo.proofs, { value: ethers.utils.parseEther("0.08")});
    });

    it("OG pass case", async function test() {
      const nft = await setupContract(tree.root);
      await nft.togglePresaleActive();
      const minterInfo = tree.proofs[alice.address];
      await nft.connect(alice).mintPresale(3, 0, minterInfo.proofs, { value: ethers.utils.parseEther("0.06")});
    });
  });

  describe("Mint public", () => {
    it("public mint not active", async function test() {
      const nft = await setupContract(tree.root);
      const minterInfo = tree.proofs[alice.address];
      await expect(nft.connect(alice).mintPublicSale(1, { value: ethers.utils.parseEther("0.04")}))
        .to.be.revertedWith("PUBLIC_SALE_MINT_IS_NOT_YET_ACTIVE");
    });

    it("pass case", async function test() {
      const nft = await setupContract(tree.root);
      await nft.togglePublicSaleActive();
      const minterInfo = tree.proofs[eric.address];
      await nft.connect(eric).mintPublicSale(1, { value: ethers.utils.parseEther("0.04")});
    });
  });

  describe("Mint Free", () => {
    it("Free mint not active", async function test() {
      const nft = await setupContract(tree.root);
      const minterInfo = tree.proofs[alice.address];
      await expect(nft.connect(alice).mintFreeSale(1, { value: ethers.utils.parseEther("0.04")}))
        .to.be.revertedWith("FREE_SALE_MINT_IS_NOT_YET_ACTIVE");
    });

    it("pass case", async function test() {
      const nft = await setupContract(tree.root);
      await nft.toggleFreeMintActive();
      const minterInfo = tree.proofs[eric.address];
      await nft.connect(eric).mintFreeSale(1, { value: ethers.utils.parseEther("0")});
    });
  });

});
