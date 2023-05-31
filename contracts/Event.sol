// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct PricingTemplate {
  uint256 ticketPrice;
  uint256 venueFlatFee;
  uint256 entertainerFlatFee;
  uint8 venuePercentage;
  uint8 entertainerPercentage;
}

struct PricingTemplateMap {
  string[] keys;
  mapping(string => PricingTemplate) values;
  mapping(string => uint) indexOf;
  mapping(string => bool) inserted;
}

library IterablePricingTemplateMapping {
  function get(PricingTemplateMap storage self, string memory key) public view returns (PricingTemplate storage) {
    return self.values[key];
  }

  function getKeyAtIndex(PricingTemplateMap storage self, uint index) public view returns (string storage) {
    return self.keys[index];
  }

  function size(PricingTemplateMap storage self) public view returns (uint) {
    return self.keys.length;
  }

  function set(PricingTemplateMap storage self, string memory key, PricingTemplate memory val) public {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(PricingTemplateMap storage self, string memory key) public {
    if (!self.inserted[key]) {
      return;
    }

    delete self.inserted[key];
    delete self.values[key];

    uint index = self.indexOf[key];
    string memory lastKey = self.keys[self.keys.length - 1];

    self.indexOf[lastKey] = index;
    delete self.indexOf[key];

    self.keys[index] = lastKey;
    self.keys.pop();
  }
}

contract Event {
  using IterablePricingTemplateMapping for PricingTemplateMap;

  // types
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
  PricingTemplateMap pricingTemplateMap;
  // mapping(string => PricingTemplate) pricingTemplates;
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

  modifier resetSignatures() {
    _;
    venueSigned = false;
    entertainerSigned = false;
  }

  // event functions

  // public getters
  function getSeatPrice(string calldata _section, string calldata _row, string calldata _seat) public view returns (uint256 price) {
    if (bytes(openSections[_section].pricingTemplate).length > 0) {
      return pricingTemplateMap.get(openSections[_section].pricingTemplate).ticketPrice;
    }
    string memory seatId = string(abi.encodePacked(_section, ":", _row, ":", _seat));
    if (bytes(reservedSeatPricing[seatId]).length > 0) {
      return pricingTemplateMap.get(reservedSeatPricing[seatId]).ticketPrice;
    }
    string memory rowId = string(abi.encodePacked(_section, ":", _row));
    if (bytes(reservedSeatPricing[rowId]).length > 0) {
      return pricingTemplateMap.get(reservedSeatPricing[rowId]).ticketPrice;
    }
    if (bytes(reservedSeatPricing[_section]).length > 0) {
      return pricingTemplateMap.get(reservedSeatPricing[_section]).ticketPrice;
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

  function setEventDateTime(uint _eventDateTime) external onlyAdmin notFinalized resetSignatures {
    eventDateTime = _eventDateTime;
  }

  function setPricingTemplate(string calldata name, PricingTemplate calldata _pricingTemplate) external onlyAdmin notFinalized resetSignatures {
    pricingTemplateMap.set(name, _pricingTemplate);
  }

  function setReservedSeatPricing(string calldata _id, string calldata _pricingTemplate) external onlyAdmin notFinalized resetSignatures {
    reservedSeatPricing[_id] = _pricingTemplate;
  }

  // internal functions
}
