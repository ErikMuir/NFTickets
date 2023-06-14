import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Event", () => {
  async function deployContract() {
    const serviceFeeBasePoints = ethers.utils.parseEther("300");
    const signers = await ethers.getSigners();
    const [owner, venue, entertainer] = signers;
    const EventFactory = await ethers.getContractFactory("Event");
    const contract = await EventFactory.deploy(venue.address, entertainer.address, serviceFeeBasePoints);
    return { contract, owner, venue, entertainer };
  }

  describe("constructor", () => {
    it("should initialize 'owner'", async () => {
      const { contract, owner } = await loadFixture(deployContract);
      const contractOwner = await contract.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("public getters", () => {
    it("", () => {});
  });

  describe("admin functions", () => {
    it("", () => {});
  });

  describe("public payable", () => {
    it("", () => {});
  });
});
