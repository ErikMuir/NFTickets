// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Event {
  // types
  struct PricingTemplate {
    uint256 ticketPrice;
    uint256 venueFlatFee;
    uint256 entertainerFlatFee;
    uint8 venuePercentage;
    uint8 entertainerPercentage;
  }

  struct OpenSection {
    string pricingTemplate;
    uint16 maxCapacity;
    uint16 remainingCapacity;
  }

  // constants

  // properties
  address owner;
  address venue;
  address entertainer;
  bool venueSigned;
  bool entertainerSigned;
  bool ticketSalesEnabled;
  uint eventDateTime;
  mapping(string => PricingTemplate) pricingTemplates;
  mapping(string => OpenSection) openSections;
  mapping(string => uint16) reservedSeats;
  mapping(string => string) reservedSeatPricing;
  string tokenId;

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

  modifier resetAfter() {
    _;
    venueSigned = false;
    entertainerSigned = false;
  }

  // event functions

  // public getters
  function getSeatPrice(string calldata _section, string calldata _row, string calldata _seat) public returns (uint256 price) {
    if (openSections[_section].pricingTemplate.length > 0) {
      return pricingTemplates[openSections[_section].pricingTemplate].ticketPrice;
    }
    string memory seatId = string(abi.encodePacked(_section, ":", _row, ":", _seat));
    string memory rowId = string(abi.encodePacked(_section, ":", _row));
    if (reservedSeatPricing[seatId].length > 0) {
      return pricingTemplates[reservedSeatPricing[seatId]].ticketPrice;
    }
    if (reservedSeatPricing[rowId].length > 0) {
      return pricingTemplates[reservedSeatPricing[rowId]].ticketPrice;
    }
    if (reservedSeatPricing[_section].length > 0) {
      return pricingTemplates[reservedSeatPricing[_section]].ticketPrice;
    }
    return 0;
  }

  // admin functions
  function venueSign() external onlyVenue notFinalized {
    venueSigned = true;
  }

  function entertainerSign() external onlyEntertainer notFinalized {
    entertainerSigned = true;
  }

  function enableTicketSales() external onlyAdmin finalized {
    ticketSalesEnabled = true;
  }

  function disableTicketSales() external onlyAdmin finalized {
    ticketSalesEnabled = false;
  }

  function setEventDateTime(uint _eventDateTime) external onlyAdmin notFinalized resetAfter {
    eventDateTime = _eventDateTime;
  }

  function setPricingTemplate(string calldata name, PricingTemplate calldata _pricingTemplate) external onlyAdmin notFinalized resetAfter {
    pricingTemplates[name] = _pricingTemplate;
  }

  function setReservedSeatPricing(string calldata _id, string calldata _pricingTemplate) external onlyAdmin notFinalized resetAfter {
    reservedSeatPricing[_id] = _pricingTemplate;
  }

  // internal functions
}
