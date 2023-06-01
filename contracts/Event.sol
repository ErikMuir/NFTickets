// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import { PricingTemplate, PricingTemplateMap, PricingTemplateIterableMapping } from "./PricingTemplate.sol";
import { OpenSection, OpenSectionMap, OpenSectionIterableMapping } from "./OpenSection.sol";
import { ReservedSeatPricingMap, ReservedSeatPricingIterableMapping } from "./ReservedSeatPricing.sol";
import { ReservedSeatsMap, ReservedSeatsIterableMapping } from "./ReservedSeats.sol";

contract Event {
  // usings
  using PricingTemplateIterableMapping for PricingTemplateMap;
  using OpenSectionIterableMapping for OpenSectionMap;
  using ReservedSeatPricingIterableMapping for ReservedSeatPricingMap;
  using ReservedSeatsIterableMapping for ReservedSeatsMap;

  // types

  // constants

  // properties
  address public owner;
  address public venue;
  address public entertainer;
  bool public venueSigned;
  bool public entertainerSigned;
  bool public ticketSalesEnabled;
  uint public eventDateTime;
  string public defaultPricingTemplateKey;
  string public tokenId;
  PricingTemplateMap pricingTemplates;
  OpenSectionMap openSections;
  ReservedSeatPricingMap reservedSeatPricing;
  ReservedSeatsMap reservedSeats;

  // constructor
  constructor(address _venue, address _entertainer) {
    owner = msg.sender;
    venue = _venue;
    entertainer = _entertainer;
    venueSigned = false;
    entertainerSigned = false;
    ticketSalesEnabled = false;
  }

  // access modifiers
  modifier onlyOwner() {
    require(msg.sender == owner, "Unauthorized");
    _;
  }

  modifier onlyVenue() {
    require(msg.sender == venue, "Unauthorized");
    _;
  }

  modifier onlyEntertainer() {
    require(msg.sender == entertainer, "Unauthorized");
    _;
  }

  modifier onlyAdmin() {
    require(msg.sender == venue || msg.sender == entertainer, "Unauthorized");
    _;
  }

  modifier finalized() {
    require(venueSigned && entertainerSigned, "This action requires a finalized contract");
    _;
  }

  modifier notFinalized() {
    require(!venueSigned || !entertainerSigned, "This action requires a non-finalized contract");
    _;
  }

  modifier readyToSign() {
    bool defaultPricingTemplateKeySet = keccak256(abi.encode(defaultPricingTemplateKey)) != keccak256(abi.encode(""));
    require(eventDateTime > 0 && defaultPricingTemplateKeySet, "Contract not ready to sign");
    _;
  }

  modifier resetSignatures() {
    _;
    venueSigned = false;
    entertainerSigned = false;
  }

  // event functions

  // public getters
  function getPricingTemplateKeys() public view returns (string[] memory pricingTemplateKeys) {
    return pricingTemplates.keys;
  }

  function getPricingTemplate(string calldata _pricingTemplateKey) public view returns (PricingTemplate memory pricingTemplate) {
    return pricingTemplates.get(_pricingTemplateKey);
  }

  function getOpenSectionKeys() public view returns (string[] memory openSectionKeys) {
    return openSections.keys;
  }

  function getOpenSection(string calldata _openSectionKey) public view returns (OpenSection memory openSection) {
    return openSections.get(_openSectionKey);
  }

  function getReservedSeatPricingKeys() public view returns (string[] memory reservedSeatPricingKeys) {
    return reservedSeatPricing.keys;
  }

  function getReservedSeatPricing(string calldata _key) public view returns (PricingTemplate memory pricingTemplate) {
    string memory pricingTemplateKey = reservedSeatPricing.get(_key);
    return pricingTemplates.get(pricingTemplateKey);
  }

  function getReservedSeat(string calldata _key) public view returns (uint serial) {
    return reservedSeats.get(_key);
  }

  function getSeatTicketPrice(string calldata _section, string calldata _row, string calldata _seat) public view returns (uint ticketPrice) {
    ticketPrice = getOpenSectionTicketPrice(_section);
    if (ticketPrice > 0) {
      return ticketPrice;
    }

    ticketPrice = getReservedSeatTicketPrice(buildSeatKey(_section, _row, _seat));
    if (ticketPrice > 0) {
      return ticketPrice;
    }

    ticketPrice = getReservedSeatTicketPrice(buildRowKey(_section, _row));
    if (ticketPrice > 0) {
      return ticketPrice;
    }

    ticketPrice = getReservedSeatTicketPrice(_section);
    if (ticketPrice > 0) {
      return ticketPrice;
    }

    return ticketPrice;
  }

  // admin functions
  function venueSign() external onlyVenue notFinalized readyToSign {
    venueSigned = true;
  }

  function entertainerSign() external onlyEntertainer notFinalized readyToSign {
    entertainerSigned = true;
  }

  function enableTicketSales() external onlyAdmin finalized {
    ticketSalesEnabled = true;
  }

  function disableTicketSales() external onlyAdmin finalized {
    ticketSalesEnabled = false;
  }

  function setEventDateTime(uint _eventDateTime) external onlyAdmin notFinalized resetSignatures {
    eventDateTime = _eventDateTime;
  }

  function setPricingTemplate(string calldata _key, PricingTemplate calldata _pricingTemplate) external onlyAdmin notFinalized resetSignatures {
    pricingTemplates.set(_key, _pricingTemplate);
  }

  function setOpenSection(string calldata _key, OpenSection calldata _openSection) external onlyAdmin notFinalized resetSignatures {
    openSections.set(_key, _openSection);
  }

  function setReservedSeatPricing(string calldata _key, string calldata _pricingTemplateKey) external onlyAdmin notFinalized resetSignatures {
    reservedSeatPricing.set(_key, _pricingTemplateKey);
  }

  function setDefaultPricingTemplateKey(string calldata _pricingTemplateKey) external onlyAdmin notFinalized resetSignatures {
    require(pricingTemplates.get(_pricingTemplateKey).ticketPrice > 0, "Unknown pricing template");
    defaultPricingTemplateKey = _pricingTemplateKey;
  }

  // internal functions
  function buildSeatKey(string calldata _section, string calldata _row, string calldata _seat) internal pure returns (string memory seatId) {
    return string(abi.encodePacked(_section, ":", _row, ":", _seat));
  }

  function buildRowKey(string calldata _section, string calldata _row) internal pure returns (string memory rowId) {
    return string(abi.encodePacked(_section, ":", _row));
  }

  function getOpenSectionTicketPrice(string memory _openSectionKey) internal view returns (uint price) {
    string memory pricingTemplateKey = openSections.get(_openSectionKey).pricingTemplateKey;
    return pricingTemplates.get(pricingTemplateKey).ticketPrice;
  }

  function getReservedSeatTicketPrice(string memory _reservedSeatKey) internal view returns (uint price) {
    string memory pricingTemplateKey = reservedSeatPricing.get(_reservedSeatKey);
    return pricingTemplates.get(pricingTemplateKey).ticketPrice;
  }
}
