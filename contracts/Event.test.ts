import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumberish, Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

const toEther = (val: number): BigNumberish =>
  ethers.utils.parseEther(`${val}`);

async function deployContract() {
  const serviceFeeBasePoints = toEther(300);
  const [owner, venue, entertainer] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("Event");
  const contract = await factory.deploy(
    venue.address,
    entertainer.address,
    serviceFeeBasePoints
  );
  await contract.deployed();
  return { serviceFeeBasePoints, owner, venue, entertainer, factory, contract };
}

describe("Event", () => {
  let serviceFeeBasePoints: BigNumberish;
  let owner: SignerWithAddress;
  let venue: SignerWithAddress;
  let entertainer: SignerWithAddress;
  let factory: ContractFactory;
  let contract: Contract;

  beforeEach(async () => {
    ({ serviceFeeBasePoints, venue, entertainer, contract, factory, owner } =
      await loadFixture(deployContract));
  });

  describe("constructor", () => {
    it("should initialize owner", async () => {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("should set venue", async () => {
      expect(await contract.venue()).to.equal(venue.address);
    });

    it("should set entertainer", async () => {
      expect(await contract.entertainer()).to.equal(entertainer.address);
    });

    it("should set serviceFeeBasePoints", async () => {
      expect(await contract.serviceFeeBasePoints()).to.equal(
        serviceFeeBasePoints
      );
    });

    it("should initialize venueSigned to false", async () => {
      expect(await contract.venueSigned()).to.equal(false);
    });

    it("should initialize entertainerSigned to false", async () => {
      expect(await contract.entertainerSigned()).to.equal(false);
    });

    it("should revert if no venue provided", async () => {
      await expect(
        factory.deploy(
          ethers.constants.AddressZero,
          entertainer.address,
          serviceFeeBasePoints
        )
      ).to.be.revertedWith("Venue and entertainer are required");
    });

    it("should revert if no entertainer provided", async () => {
      await expect(
        factory.deploy(
          venue.address,
          ethers.constants.AddressZero,
          serviceFeeBasePoints
        )
      ).to.be.revertedWith("Venue and entertainer are required");
    });
  });

  describe("terms", () => {
    describe("open sections", () => {
      describe("setOpenSection", () => {
        it("should set the open section", async () => {
          await contract
            .connect(venue)
            .setOpenSection("foobar", ethers.constants.One, ethers.constants.Two);
          const actual = await contract.getOpenSection("foobar");
          expect(actual.ticketPrice).to.equal(ethers.constants.One);
          expect(actual.maxCapacity).to.equal(ethers.constants.Two);
          expect(actual.remainingCapacity).to.equal(ethers.constants.Two);
        });
      });
    });

    describe("getOpenSectionKeys", () => {
      it("should return openSection keys", async () => {
        await contract
          .connect(venue)
          .setOpenSection("foo", ethers.constants.One, ethers.constants.Two);
        await contract
          .connect(venue)
          .setOpenSection("bar", ethers.constants.One, ethers.constants.Two);
        expect(await contract.getOpenSectionKeys()).to.deep.equal([
          "foo",
          "bar",
        ]);
      });
    });

    describe("getOpenSection", () => {
      it("should return an openSection", async () => {
        await contract
          .connect(venue)
          .setOpenSection("foobar", ethers.constants.One, ethers.constants.Two);
        const actual = await contract.getOpenSection("foobar");
        expect(actual.ticketPrice).to.equal(ethers.constants.One);
        expect(actual.maxCapacity).to.equal(ethers.constants.Two);
        expect(actual.remainingCapacity).to.equal(ethers.constants.Two);
      });

      it("should return an empty openSection", async () => {
        const actual = await contract.getOpenSection("foobar");
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
        expect(actual.maxCapacity).to.equal(ethers.constants.Zero);
        expect(actual.remainingCapacity).to.equal(ethers.constants.Zero);
      });
    });

    describe("getReservedSectionKeys", () => {
      it("should return reservedSection keys", async () => {
        await contract
          .connect(venue)
          .setReservedSection("foobar", ethers.constants.One);
        expect(await contract.getReservedSectionKeys()).to.deep.equal([
          "foobar",
        ]);
      });
    });

    describe("getReservedSection", () => {
      it("should return a reservedSection", async () => {
        await contract
          .connect(venue)
          .setReservedSection("foobar", ethers.constants.One);
        const actual = await contract.getReservedSection("foobar");
        expect(actual.ticketPrice).to.equal(ethers.constants.One);
      });

      it("should return an empty reservedSection", async () => {
        const actual = await contract.getOpenSection("foobar");
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
      });
    });
  });

  describe("pre-sales", () => {
    it("", () => {});
  });

  describe("sales", () => {
    describe("getNFTicket", () => {
      it("should return an NFTicket", async () => {
        // await contract.connect(venue)
      });

      it("should return an empty NFTicket", async () => {
        const actual = await contract.getNFTicket(1);
        expect(actual.seatKey).to.equal("");
        expect(actual.price).to.equal(ethers.constants.Zero);
        expect(actual.buyer).to.equal(ethers.constants.AddressZero);
        expect(actual.scanned).to.equal(false);
      });
    });
  });

  describe("post-sales", () => {
    it("", () => {});
  });

  describe("miscellaneous", () => {
    describe("getBalance", () => {
      it("should return contract's balance", async () => {
        const tx = await owner.sendTransaction({
          to: contract.address,
          value: ethers.constants.Two,
        });
        await tx.wait();
        expect(await contract.getBalance()).to.equal(ethers.constants.Two);
      });
    });
  });
});
