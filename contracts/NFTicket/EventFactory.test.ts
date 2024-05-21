import { randomUUID } from "crypto";

import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const toEther = (val: number): BigNumber => ethers.utils.parseEther(`${val}`);
const emptyAddress = "0x0000000000000000000000000000000000000000";
const venueRegistrationFee = 1_000;
const entertainerRegistrationFee = 100;
const eventFee = 100;
const collectionFee = 100;
const serviceFeeBasePoints = 1_000;

async function newEventFactory() {
  const [owner, venue, entertainer, unknownAccount] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("EventFactory");
  const contract = await factory.deploy();
  await contract.deployed();
  return {
    contract,
    owner,
    venue,
    entertainer,
    unknownAccount,
  };
}

async function configuredEventFactory() {
  const { contract, owner, venue, entertainer, unknownAccount } =
    await loadFixture(newEventFactory);
  await contract.setVenueRegistrationFee(venueRegistrationFee);
  await contract
    .connect(owner)
    .setEntertainerRegistrationFee(entertainerRegistrationFee);
  await contract.connect(owner).setEventFee(eventFee);
  await contract.connect(owner).setCollectionFee(collectionFee);
  await contract.connect(owner).setServiceFeeBasePoints(serviceFeeBasePoints);
  await contract.connect(owner).enableFactory();
  await contract.connect(venue).registerVenue({
    value: ethers.utils.parseUnits(`${venueRegistrationFee}`, "ether"),
  });
  await contract.connect(entertainer).registerEntertainer({
    value: ethers.utils.parseUnits(`${entertainerRegistrationFee}`, "ether"),
  });
  return {
    contract,
    owner,
    venue,
    entertainer,
    unknownAccount,
  };
}

describe("EventFactory", () => {
  describe("constructor", () => {
    it("should set owner", async () => {
      const { contract, owner } = await loadFixture(newEventFactory);
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("admin functions", () => {
    describe("enableFactory", () => {
      it("should enable the event factory", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).disableFactory();
        await contract.connect(owner).enableFactory();
        expect(await contract.enabled()).to.equal(true);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).enableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).enableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).enableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("disableFactory", () => {
      it("should disable the event factory", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).enableFactory();
        await contract.connect(owner).disableFactory();
        expect(await contract.enabled()).to.equal(false);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).disableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).disableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).disableFactory()
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("setVenueRegistrationFee", () => {
      it("should set the venue registration fee", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).setVenueRegistrationFee(venueRegistrationFee);
        expect(await contract.venueRegistrationFee()).to.equal(venueRegistrationFee);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).setVenueRegistrationFee(venueRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).setVenueRegistrationFee(venueRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).setVenueRegistrationFee(venueRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("setEntertainerRegistrationFee", () => {
      it("should set the entertainer registration fee", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).setEntertainerRegistrationFee(entertainerRegistrationFee);
        expect(await contract.entertainerRegistrationFee()).to.equal(entertainerRegistrationFee);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).setEntertainerRegistrationFee(entertainerRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).setEntertainerRegistrationFee(entertainerRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).setEntertainerRegistrationFee(entertainerRegistrationFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("setEventFee", () => {
      it("should set the event fee", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).setEventFee(eventFee);
        expect(await contract.eventFee()).to.equal(eventFee);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).setEventFee(eventFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).setEventFee(eventFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).setEventFee(eventFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("setCollectionFee", () => {
      it("should set the collection fee", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).setCollectionFee(collectionFee);
        expect(await contract.collectionFee()).to.equal(collectionFee);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).setCollectionFee(collectionFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).setCollectionFee(collectionFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).setCollectionFee(collectionFee)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("setServiceFeeBasePoints", () => {
      it("should set the service fee base points", async () => {
        const { contract, owner } = await loadFixture(newEventFactory);
        await contract.connect(owner).setServiceFeeBasePoints(serviceFeeBasePoints);
        expect(await contract.serviceFeeBasePoints()).to.equal(serviceFeeBasePoints);
      });

      it("should revert when called by a venue", async () => {
        const { contract, venue } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(venue).setServiceFeeBasePoints(serviceFeeBasePoints)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by a entertainer", async () => {
        const { contract, entertainer } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(entertainer).setServiceFeeBasePoints(serviceFeeBasePoints)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });

      it("should revert when called by an unknown account", async () => {
        const { contract, unknownAccount } = await loadFixture(configuredEventFactory);
        await expect(
          contract.connect(unknownAccount).setServiceFeeBasePoints(serviceFeeBasePoints)
        ).to.be.revertedWithCustomError(contract, "Unauthorized");
      });
    });

    describe("adminRegisterVenue", () => {});

    describe("adminRegisterEntertainer", () => {});

    describe("adminUpdateVenue", () => {});

    describe("adminUpdateEntertainer", () => {});
  });

  describe("entertainer functions", () => {
    describe("registerEntertainer", () => {});

    describe("enableEntertainer", () => {});

    describe("disableEntertainer", () => {});
  });

  describe("venue functions", () => {
    describe("registerVenue", () => {});

    describe("enableVenue", () => {});

    describe("disableVenue", () => {});

    describe("createEvent", () => {});
  });
});
