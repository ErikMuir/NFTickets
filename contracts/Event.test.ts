import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const toEther = (val: number): BigNumber => ethers.utils.parseEther(`${val}`);
const toTimestamp = (dt = new Date()): BigNumber =>
  toEther(dt.getTime() / 1_000);
const ticketPrice = toEther(75);
const timestamp = toTimestamp();
const serviceFeeBasePoints = 300;
const sectionKey = "foobar";
const capacity = 500;

async function newContract() {
  const [owner, venue, entertainer, attendee] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("Event");
  const contract = await factory.deploy(
    venue.address,
    entertainer.address,
    serviceFeeBasePoints
  );
  await contract.deployed();
  return {
    owner,
    venue,
    entertainer,
    attendee,
    factory,
    contract,
  };
}

async function readyToSignContract() {
  const { owner, venue, entertainer, attendee, factory, contract } =
    await loadFixture(newContract);
  await contract.connect(entertainer).setEventDateTime(timestamp);
  await contract.connect(entertainer).setTicketSalesStartDateTime(timestamp);
  await contract.connect(entertainer).setTicketSalesEndDateTime(timestamp);
  await contract.connect(entertainer).setDefaultTicketPrice(ticketPrice);
  return {
    owner,
    venue,
    entertainer,
    attendee,
    factory,
    contract,
  };
}

async function finalizedContract() {
  const { owner, venue, entertainer, attendee, factory, contract } =
    await loadFixture(readyToSignContract);
  await contract.connect(entertainer).signContract();
  await contract.connect(venue).signContract();
  return {
    owner,
    venue,
    entertainer,
    attendee,
    factory,
    contract,
  };
}

describe("Event contract", () => {
  describe("constructor", () => {
    it("should initialize owner", async () => {
      const { owner, contract } = await loadFixture(newContract);
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("should set venue", async () => {
      const { venue, contract } = await loadFixture(newContract);
      expect(await contract.venue()).to.equal(venue.address);
    });

    it("should set entertainer", async () => {
      const { entertainer, contract } = await loadFixture(newContract);
      expect(await contract.entertainer()).to.equal(entertainer.address);
    });

    it("should set serviceFeeBasePoints", async () => {
      const { contract } = await loadFixture(newContract);
      expect(await contract.serviceFeeBasePoints()).to.equal(
        serviceFeeBasePoints
      );
    });

    it("should initialize venueSigned to false", async () => {
      const { contract } = await loadFixture(newContract);
      expect(await contract.venueSigned()).to.equal(false);
    });

    it("should initialize entertainerSigned to false", async () => {
      const { contract } = await loadFixture(newContract);
      expect(await contract.entertainerSigned()).to.equal(false);
    });

    it("should revert if no venue provided", async () => {
      const { entertainer, factory } = await loadFixture(newContract);
      await expect(
        factory.deploy(
          ethers.constants.AddressZero,
          entertainer.address,
          serviceFeeBasePoints
        )
      ).to.be.revertedWith("Venue and entertainer are required");
    });

    it("should revert if no entertainer provided", async () => {
      const { venue, factory } = await loadFixture(newContract);
      await expect(
        factory.deploy(
          venue.address,
          ethers.constants.AddressZero,
          serviceFeeBasePoints
        )
      ).to.be.revertedWith("Venue and entertainer are required");
    });
  });

  describe("terms & conditions", () => {
    describe("setEventDateTime function", () => {
      it("should set the event date time", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setEventDateTime(timestamp);
        expect(await contract.eventDateTime()).to.equal(timestamp);
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).setEventDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setEventDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).setEventDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setTicketSalesStartDateTime function", () => {
      it("should set the ticket sales start date time", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract
          .connect(entertainer)
          .setTicketSalesStartDateTime(timestamp);
        expect(await contract.ticketSalesStartDateTime()).to.equal(timestamp);
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).setTicketSalesStartDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setTicketSalesStartDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).setTicketSalesStartDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setTicketSalesEndDateTime function", () => {
      it("should set the ticket sales end date time", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract
          .connect(entertainer)
          .setTicketSalesEndDateTime(timestamp);
        expect(await contract.ticketSalesEndDateTime()).to.equal(timestamp);
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).setTicketSalesEndDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setTicketSalesEndDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).setTicketSalesEndDateTime(timestamp)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setVenueFeeBasePoints function", () => {
      it("should set the venue fee base points", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setVenueFeeBasePoints(1500);
        expect(await contract.venueFeeBasePoints()).to.equal(1500);
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).setVenueFeeBasePoints(1500)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setVenueFeeBasePoints(1500)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).setVenueFeeBasePoints(1500)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setDefaultTicketPrice function", () => {
      it("should set the default ticket price when greater than 0", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setDefaultTicketPrice(ticketPrice);
        expect(await contract.defaultTicketPrice()).to.equal(ticketPrice);
      });

      it("should set the default ticket price to -1 when free", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await contract
          .connect(entertainer)
          .setDefaultTicketPrice(ethers.constants.Zero);
        expect(await contract.defaultTicketPrice()).to.equal(-1);
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).setDefaultTicketPrice(ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setDefaultTicketPrice(ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).setDefaultTicketPrice(ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("addOpenSection function", () => {
      it("should add the open section", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        const actual = await contract.getOpenSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
        expect(actual.maxCapacity).to.equal(capacity);
        expect(actual.remainingCapacity).to.equal(capacity);
      });

      it("should revert if the section already exists", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract.connect(venue).addOpenSection(sectionKey, capacity)
        ).to.be.revertedWith("Open section already exists");
      });

      it("should revert when called by owner", async () => {
        const { owner, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(owner).addOpenSection(sectionKey, capacity)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by entertainer", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(entertainer).addOpenSection(sectionKey, capacity)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { attendee, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(attendee).addOpenSection(sectionKey, capacity)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setOpenSectionTicketPrice function", () => {
      it("should set the ticket price", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract
          .connect(entertainer)
          .setOpenSectionTicketPrice(sectionKey, ticketPrice);
        const actual = await contract.getOpenSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ticketPrice);
      });

      it("should revert when section not found", async () => {
        const { entertainer, contract } = await loadFixture(newContract);
        await expect(
          contract
            .connect(entertainer)
            .setOpenSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Open section not found");
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(owner)
            .setOpenSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(venue)
            .setOpenSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(attendee)
            .setOpenSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setOpenSectionCapacity function", () => {
      const newCapacity = toEther(250);

      it("should set the capacity", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract
          .connect(venue)
          .setOpenSectionCapacity(sectionKey, newCapacity);
        const actual = await contract.getOpenSection(sectionKey);
        expect(actual.maxCapacity).to.equal(newCapacity);
        expect(actual.remainingCapacity).to.equal(newCapacity);
      });

      it("should revert when section not found", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(
          contract.connect(venue).setOpenSectionCapacity("baz", newCapacity)
        ).to.be.revertedWith("Open section not found");
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(owner)
            .setOpenSectionCapacity(sectionKey, newCapacity)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by entertainer", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(entertainer)
            .setOpenSectionCapacity(sectionKey, newCapacity)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract
            .connect(attendee)
            .setOpenSectionCapacity(sectionKey, newCapacity)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("removeOpenSection function", () => {
      it("should remove the section", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract.connect(venue).removeOpenSection(sectionKey);
        const actualKeys = await contract.getOpenSectionKeys();
        expect(actualKeys.includes(sectionKey)).to.equal(false);
        const actual = await contract.getOpenSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
        expect(actual.maxCapacity).to.equal(ethers.constants.Zero);
        expect(actual.remainingCapacity).to.equal(ethers.constants.Zero);
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract.connect(owner).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by entertainer", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract.connect(entertainer).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await expect(
          contract.connect(attendee).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("addReservedSection function", () => {
      it("should add the reserved section", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        const actual = await contract.getOpenSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
      });

      it("should revert if the section already exists", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(venue).addReservedSection(sectionKey)
        ).to.be.revertedWith("Reserved section already exists");
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(owner).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by entertainer", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(entertainer).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(attendee).removeOpenSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("setReservedSectionTicketPrice function", () => {
      it("should set the ticket price", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await contract
          .connect(entertainer)
          .setReservedSectionTicketPrice(sectionKey, ticketPrice);
        const actual = await contract.getReservedSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ticketPrice);
      });

      it("should revert when section not found", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract
            .connect(entertainer)
            .setReservedSectionTicketPrice("baz", ticketPrice)
        ).to.be.revertedWith("Reserved section not found");
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract
            .connect(owner)
            .setReservedSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by venue", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract
            .connect(venue)
            .setReservedSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract
            .connect(attendee)
            .setReservedSectionTicketPrice(sectionKey, ticketPrice)
        ).to.be.revertedWith("Unauthorized");
      });
    });

    describe("removeReservedSection function", () => {
      it("should remove the section", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await contract.connect(venue).removeReservedSection(sectionKey);
        const actualKeys = await contract.getReservedSectionKeys();
        expect(actualKeys.includes(sectionKey)).to.equal(false);
        const actual = await contract.getReservedSection(sectionKey);
        expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
      });

      it("should revert when called by owner", async () => {
        const { venue, owner, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(owner).removeReservedSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by entertainer", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(entertainer).removeReservedSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });

      it("should revert when called by attendee", async () => {
        const { venue, attendee, contract } = await loadFixture(newContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await expect(
          contract.connect(attendee).removeReservedSection(sectionKey)
        ).to.be.revertedWith("Unauthorized");
      });
    });
  });

  describe("finalization", () => {
    describe("resetSignatures modifier", () => {
      it("should reset signatures when eventDateTime is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setEventDateTime(timestamp); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when ticketSalesStartDateTime is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setTicketSalesStartDateTime(timestamp); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when ticketSalesEndDateTime is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setTicketSalesEndDateTime(timestamp); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when defaultTicketPrice is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setDefaultTicketPrice(toEther(1000)); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when venueFeeBasePoints is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setVenueFeeBasePoints(100); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when open section is added", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
        await contract.connect(venue).addOpenSection(sectionKey, capacity); // TODO change
        expect(await contract.entertainerSigned()).to.equal(false);
      });

      it("should reset signatures when open section ticket price is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setOpenSectionTicketPrice(sectionKey, ticketPrice);
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when open section capacity is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
        await contract.connect(venue).setOpenSectionCapacity(sectionKey, 1001); // TODO change
        expect(await contract.entertainerSigned()).to.equal(false);
      });

      it("should reset signatures when open section is removed", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).addOpenSection(sectionKey, capacity);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
        await contract.connect(venue).removeOpenSection(sectionKey); // TODO change
        expect(await contract.entertainerSigned()).to.equal(false);
      });

      it("should reset signatures when reserved section is added", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
        await contract.connect(venue).addReservedSection(sectionKey); // TODO change
        expect(await contract.entertainerSigned()).to.equal(false);
      });

      it("should reset signatures when reserved section ticket price is updated", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
        await contract.connect(entertainer).setReservedSectionTicketPrice(sectionKey, toEther(1001)); // TODO change
        expect(await contract.venueSigned()).to.equal(false);
      });

      it("should reset signatures when reserved section is removed", async () => {
        const { venue, entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).addReservedSection(sectionKey);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
        await contract.connect(venue).removeReservedSection(sectionKey); // TODO change
        expect(await contract.entertainerSigned()).to.equal(false);
      });
    });

    describe("readyToSign modifier", () => {
      it("should revert signContract if eventDateTime not set", async () => {
        const { venue, contract } = await loadFixture(newContract);
        await expect(contract.connect(venue).signContract()).to.be.revertedWith(
          "Event date time not set"
        );
      });

      it("should revert signContract if ticketSalesStartDateTime not set", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setEventDateTime(timestamp);
        await expect(contract.connect(venue).signContract()).to.be.revertedWith(
          "Ticket sales start date time not set"
        );
      });

      it("should revert signContract if ticketSalesEndDateTime not set", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setEventDateTime(timestamp);
        await contract
          .connect(entertainer)
          .setTicketSalesStartDateTime(timestamp);
        await expect(contract.connect(venue).signContract()).to.be.revertedWith(
          "Ticket sales end date time not set"
        );
      });

      it("should revert signContract if defaultTicketPrice not set", async () => {
        const { venue, entertainer, contract } = await loadFixture(newContract);
        await contract.connect(entertainer).setEventDateTime(timestamp);
        await contract
          .connect(entertainer)
          .setTicketSalesStartDateTime(timestamp);
        await contract
          .connect(entertainer)
          .setTicketSalesEndDateTime(timestamp);
        await expect(contract.connect(venue).signContract()).to.be.revertedWith(
          "Default ticket price not set"
        );
      });
    });

    describe("signContract function", () => {
      it("should sign contract for venue", async () => {
        const { venue, contract } = await loadFixture(readyToSignContract);
        await contract.connect(venue).signContract();
        expect(await contract.venueSigned()).to.equal(true);
      });

      it("should sign contract for entertainer", async () => {
        const { entertainer, contract } = await loadFixture(readyToSignContract);
        await contract.connect(entertainer).signContract();
        expect(await contract.entertainerSigned()).to.equal(true);
      });

      it("should revert if called by owner", async () => {
        const { owner, contract } = await loadFixture(readyToSignContract);
        await expect(contract.connect(owner).signContract()).to.be.revertedWith("Unauthorized");
      });

      it("should revert if called by attendee", async () => {
        const { attendee, contract } = await loadFixture(readyToSignContract);
        await expect(contract.connect(attendee).signContract()).to.be.revertedWith("Unauthorized");
      });

      it("should revert if both parties already signed", async () => {
        const { venue, contract } = await loadFixture(finalizedContract);
        await expect(contract.connect(venue).signContract()).to.be.revertedWith(
          "Contract already finalized"
        );
      });
    });
  });

  describe("sales", () => {
    describe("createNft function", () => {
      it("should return created token ID", async () => {
        // TODO
      });

      it("should revert if contract not finalized", async () => {
        const { entertainer, contract } = await loadFixture(readyToSignContract);
        await expect(
          contract.connect(entertainer).createNft("foo", "FOO", "memo", 70_000, 100_000)
        ).to.be.revertedWith("Contract not yet finalized");
      });

      it("should revert if called by owner", async () => {
        // TODO
      });

      it("should revert if called by venue", async () => {
        // TODO
      });

      it("should revert if called by attendee", async () => {
        // TODO
      });
    });

    describe("mintAndTransfer function", () => {
      it("", async () => {
        // TODO
      });
    });
  });

  describe("event", () => {
    describe("scanTicket function", () => {
      it("should mark ticket as scanned", async () => {
        // TODO
      });

      it("should revert if ticket not found", async () => {
        // TODO
      });

      it("should revert if ticket already scanned", async () => {
        // TODO
      });
    });
  });

  describe("post-event", () => {
    describe("collectServiceFee function", () => {
      it("should transfer fee amount to owner", async () => {
        // TODO
      });
      
      it("should revert if called before sales ended", async () => {
        // TODO
      });
      
      it("should revert if called by venue", async () => {
        // TODO
      });
      
      it("should revert if called by entertainer", async () => {
        // TODO
      });
      
      it("should revert if called by attendee", async () => {
        // TODO
      });
    });

    describe("collectVenueFee function", () => {
      it("should transfer fee amount to venue", async () => {
        // TODO
      });
      
      it("should revert if called before sales ended", async () => {
        // TODO
      });
      
      it("should revert if called by owner", async () => {
        // TODO
      });
      
      it("should revert if called by entertainer", async () => {
        // TODO
      });
      
      it("should revert if called by attendee", async () => {
        // TODO
      });
    });

    describe("collectEntertainerProceeds function", () => {
      it("should transfer proceeds amount to entertainer", async () => {
        // TODO
      });
      
      it("should revert if called before sales ended", async () => {
        // TODO
      });
      
      it("should revert if called by owner", async () => {
        // TODO
      });
      
      it("should revert if called by venue", async () => {
        // TODO
      });
      
      it("should revert if called by attendee", async () => {
        // TODO
      });
    });
  });

  describe("miscellaneous", () => {
    describe("getBalance function", () => {
      it("should return contract's balance", async () => {
        const { owner, contract } = await loadFixture(newContract);
        const depositAmount = toEther(123);
        const tx = await owner.sendTransaction({
          to: contract.address,
          value: depositAmount,
        });
        await tx.wait();
        expect(await contract.getBalance()).to.equal(depositAmount);
      });
    });
  });
});
