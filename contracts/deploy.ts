import "@nomiclabs/hardhat-ethers";
import { ethers, network } from "hardhat";
import { getOptionalWithDefault } from "../common/env";

const isAddress = (address: string) => address.length === 42 && address.startsWith("0x");

function parseArgs() {
  const validationErrors: string[] = [];

  const venue = getOptionalWithDefault("VENUE_ADDRESS", "0x...");
  const entertainer = getOptionalWithDefault("ENTERTAINER_ADDRESS", "0x...");
  const serviceFee = getOptionalWithDefault("SERVICE_FEE", "3.5");

  if (!venue) {
    validationErrors.push("Venue address is required");
  } else if (!isAddress(venue)) {
    validationErrors.push("Venue address is invalid");
  }

  if (!entertainer) {
    validationErrors.push("Entertainer address is required");
  } else if (!isAddress(entertainer)) {
    validationErrors.push("Entertainer address is invalid");
  }

  const parsedServiceFee = parseInt(serviceFee, 10);
  if (!serviceFee) {
    validationErrors.push("Service fee is required");
  } else if (Number.isNaN(parsedServiceFee) || parsedServiceFee < 0 || parsedServiceFee > 100) {
    validationErrors.push("Service fee is invalid");
  }

  if (validationErrors.length) {
    validationErrors.forEach(console.warn);
    process.exit(1);
  }

  const serviceFeeBasePoints = Math.trunc(parsedServiceFee * 100);

  return { venue, entertainer, serviceFeeBasePoints };
}

async function main() {
  const { venue, entertainer, serviceFeeBasePoints } = parseArgs();
  const factory = await ethers.getContractFactory("Event");
  const contract = await factory.deploy(
    venue,
    entertainer,
    serviceFeeBasePoints
  );
  await contract.deployed();
  console.info(
    `Deployed "Event" to the ${network.name} network. Address: ${contract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
