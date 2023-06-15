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
  const [owner, venue, entertainer, attendee] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("Event");
  const contract = await factory.deploy(
    venue.address,
    entertainer.address,
    serviceFeeBasePoints
  );
  await contract.deployed();
  return {
    serviceFeeBasePoints,
    owner,
    venue,
    entertainer,
    attendee,
    factory,
    contract,
  };
}

describe("Event", () => {
  let serviceFeeBasePoints: BigNumberish;
  let owner: SignerWithAddress;
  let venue: SignerWithAddress;
  let entertainer: SignerWithAddress;
  let attendee: SignerWithAddress;
  let factory: ContractFactory;
  let contract: Contract;

  beforeEach(async () => {
    ({
      serviceFeeBasePoints,
      venue,
      entertainer,
      attendee,
      contract,
      factory,
      owner,
    } = await loadFixture(deployContract));
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

  describe("terms phase", () => {
    describe("dates and times", () => {
      const dt = toEther(Date.now() / 1_000);

      describe("setEventDateTime", () => {
        it("should set the event date time", async () => {
          await contract.connect(venue).setEventDateTime(dt);
          expect(await contract.eventDateTime()).to.equal(dt);
        });
  
        [owner, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-admin", async () => {
            contract.connect(signer);
            await expect(
              contract.setEventDateTime(dt)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("setTicketSalesStartDateTime", () => {
        it("should set the ticket sales start date time", async () => {
          await contract.connect(venue).setTicketSalesStartDateTime(dt);
          expect(await contract.ticketSalesStartDateTime()).to.equal(dt);
        });

        [owner, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-admin", async () => {
            contract.connect(signer);
            await expect(
              contract.setTicketSalesStartDateTime(dt)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("setTicketSalesEndDateTime", () => {
        it("should set the ticket sales end date time", async () => {
          await contract.connect(venue).setTicketSalesEndDateTime(dt);
          expect(await contract.ticketSalesEndDateTime()).to.equal(dt);
        });

        [owner, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-admin", async () => {
            contract.connect(signer);
            await expect(
              contract.setTicketSalesEndDateTime(dt)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });
    });

    describe("setVenueFeeBasePoints", () => {
      const basePoints = toEther(300);

      it("should set the venue fee base points", async () => {
        await contract.connect(venue).setVenueFeeBasePoints(basePoints);
        expect(await contract.venueFeeBasePoints()).to.equal(basePoints);
      });

      [owner, attendee].forEach((signer: SignerWithAddress) => {
        it("should revert when called by non-admin", async () => {
          contract.connect(signer);
          await expect(
            contract.setVenueFeeBasePoints(basePoints)
          ).to.be.revertedWith("Unauthorized");
        });
      });
    });

    describe("setDefaultTicketPrice", () => {
      const ticketPrice = toEther(50);

      it("should set the default ticket price when greater than 0", async () => {
        await contract.connect(venue).setDefaultTicketPrice(ticketPrice);
        expect(await contract.defaultTicketPrice()).to.equal(ticketPrice);
      });

      it("should set the default ticket price to -1 when free", async () => {
        await contract.connect(venue).setDefaultTicketPrice(ethers.constants.Zero);
        expect(await contract.defaultTicketPrice()).to.equal(-1);
      });

      [owner, attendee].forEach((signer: SignerWithAddress) => {
        it("should revert when called by non-admin", async () => {
          contract.connect(signer);
          await expect(
            contract.setDefaultTicketPrice(ticketPrice)
          ).to.be.revertedWith("Unauthorized");
        });
      });
    });

    describe("open sections", () => {
      const key = "foobar";
      const capacity = toEther(500);

      beforeEach(async () => {
        await contract.connect(venue).addOpenSection(key, capacity);
      });

      describe("addOpenSection", () => {
        it("should add the open section", async () => {
          const actual = await contract.getOpenSection(key);
          expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
          expect(actual.maxCapacity).to.equal(capacity);
          expect(actual.remainingCapacity).to.equal(capacity);
        });

        it("should revert if the section already exists", async () => {
          await expect(
            contract.connect(venue).addOpenSection(key, capacity)
          ).to.be.revertedWith("Open section already exists");
        });

        [owner, entertainer, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-venue", async () => {
            contract.connect(signer);
            await expect(
              contract.addOpenSection("baz", capacity)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("setOpenSectionTicketPrice", () => {
        const ticketPrice = toEther(75);

        it("should set the ticket price", async () => {
          await contract
            .connect(entertainer)
            .setOpenSectionTicketPrice(key, ticketPrice);
          const actual = await contract.getOpenSection(key);
          expect(actual.ticketPrice).to.equal(ticketPrice);
        });

        it("should revert when section not found", async () => {
          await expect(
            contract
              .connect(entertainer)
              .setOpenSectionTicketPrice("baz", ticketPrice)
          ).to.be.revertedWith("Open section not found");
        });

        [owner, venue, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-entertainer", async () => {
            contract.connect(signer);
            await expect(
              contract.setOpenSectionTicketPrice(key, ticketPrice)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("setOpenSectionCapacity", () => {
        const newCapacity = toEther(250);

        it("should set the capacity", async () => {
          await contract
            .connect(venue)
            .setOpenSectionCapacity(key, newCapacity);
          const actual = await contract.getOpenSection(key);
          expect(actual.maxCapacity).to.equal(newCapacity);
          expect(actual.remainingCapacity).to.equal(newCapacity);
        });

        it("should revert when section not found", async () => {
          await expect(
            contract.connect(venue).setOpenSectionCapacity("baz", newCapacity)
          ).to.be.revertedWith("Open section not found");
        });

        [owner, entertainer, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-entertainer", async () => {
            contract.connect(signer);
            await expect(
              contract.setOpenSectionCapacity(key, newCapacity)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("removeOpenSection", () => {
        it("should remove the section", async () => {
          await contract.connect(venue).removeOpenSection(key);
          const actualKeys = await contract.getOpenSectionKeys();
          expect(actualKeys.includes(key)).to.equal(false);
          const actual = await contract.getOpenSection(key);
          expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
          expect(actual.maxCapacity).to.equal(ethers.constants.Zero);
          expect(actual.remainingCapacity).to.equal(ethers.constants.Zero);
        });

        [owner, entertainer, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-venue", async () => {
            contract.connect(signer);
            await expect(contract.removeOpenSection(key)).to.be.revertedWith(
              "Unauthorized"
            );
          });
        });
      });
    });

    describe("reserved sections", () => {
      const key = "foobar";

      beforeEach(async () => {
        await contract.connect(venue).addReservedSection(key);
      });

      describe("addReservedSection", () => {
        it("should add the reserved section", async () => {
          const actual = await contract.getOpenSection(key);
          expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
        });

        it("should revert if the section already exists", async () => {
          await expect(
            contract.connect(venue).addReservedSection(key)
          ).to.be.revertedWith("Reserved section already exists");
        });

        [owner, entertainer, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-venue", async () => {
            contract.connect(signer);
            await expect(contract.addReservedSection(key)).to.be.revertedWith(
              "Unauthorized"
            );
          });
        });
      });

      describe("setReservedSectionTicketPrice", () => {
        const ticketPrice = toEther(60);

        it("should set the ticket price", async () => {
          await contract
            .connect(entertainer)
            .setReservedSectionTicketPrice(key, ticketPrice);
          const actual = await contract.getReservedSection(key);
          expect(actual.ticketPrice).to.equal(ticketPrice);
        });

        it("should revert when section not found", async () => {
          await expect(
            contract
              .connect(entertainer)
              .setReservedSectionTicketPrice("baz", ticketPrice)
          ).to.be.revertedWith("Reserved section not found");
        });

        [owner, venue, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-entertainer", async () => {
            contract.connect(signer);
            await expect(
              contract.setReservedSectionTicketPrice(key, ticketPrice)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });

      describe("removeReservedSection", () => {
        it("should remove the section", async () => {
          await contract.connect(venue).removeReservedSection(key);
          const actualKeys = await contract.getReservedSectionKeys();
          expect(actualKeys.includes(key)).to.equal(false);
          const actual = await contract.getReservedSection(key);
          expect(actual.ticketPrice).to.equal(ethers.constants.Zero);
        });

        [owner, entertainer, attendee].forEach((signer: SignerWithAddress) => {
          it("should revert when called by non-venue", async () => {
            contract.connect(signer);
            await expect(
              contract.removeReservedSection(key)
            ).to.be.revertedWith("Unauthorized");
          });
        });
      });
    });
  });

  describe("pre-sales phase", () => {
    it("", () => {});
  });

  describe("sales phase", () => {
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

  describe("post-sales phase", () => {
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
