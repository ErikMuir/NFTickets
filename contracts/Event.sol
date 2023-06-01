// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// struct PricingTemplate {
//   uint ticketPrice;
//   uint venueFlatFee;
//   uint entertainerFlatFee;
//   uint8 venuePercentage;
//   uint8 entertainerPercentage;
// }

// struct PricingTemplateMap {
//   string[] keys;
//   mapping(string key => PricingTemplate) values;
//   mapping(string key => uint) indexOf;
//   mapping(string key => bool) inserted;
// }

// library PricingTemplateIterableMapping {
//   function get(PricingTemplateMap storage self, string memory key) public view returns (PricingTemplate storage) {
//     return self.values[key];
//   }

//   function getKeyAtIndex(PricingTemplateMap storage self, uint index) public view returns (string storage) {
//     return self.keys[index];
//   }

//   function size(PricingTemplateMap storage self) public view returns (uint) {
//     return self.keys.length;
//   }

//   function set(PricingTemplateMap storage self, string memory key, PricingTemplate memory val) public {
//     if (self.inserted[key]) {
//       self.values[key] = val;
//     } else {
//       self.inserted[key] = true;
//       self.values[key] = val;
//       self.indexOf[key] = self.keys.length;
//       self.keys.push(key);
//     }
//   }

//   function remove(PricingTemplateMap storage self, string memory key) public {
//     if (!self.inserted[key]) {
//       return;
//     }

//     delete self.inserted[key];
//     delete self.values[key];

//     uint index = self.indexOf[key];
//     string memory lastKey = self.keys[self.keys.length - 1];

//     self.indexOf[lastKey] = index;
//     delete self.indexOf[key];

//     self.keys[index] = lastKey;
//     self.keys.pop();
//   }
// }

// struct OpenSection {
//   string pricingTemplateKey;
//   uint maxCapacity;
//   uint remainingCapacity;
// }

// struct OpenSectionMap {
//   string[] keys;
//   mapping(string key => OpenSection) values;
//   mapping(string key => uint) indexOf;
//   mapping(string key => bool) inserted;
// }

// library OpenSectionIterableMapping {
//   function get(OpenSectionMap storage self, string memory key) public view returns (OpenSection storage) {
//     return self.values[key];
//   }

//   function getKeyAtIndex(OpenSectionMap storage self, uint index) public view returns (string storage) {
//     return self.keys[index];
//   }

//   function size(OpenSectionMap storage self) public view returns (uint) {
//     return self.keys.length;
//   }

//   function set(OpenSectionMap storage self, string memory key, OpenSection memory val) public {
//     if (self.inserted[key]) {
//       self.values[key] = val;
//     } else {
//       self.inserted[key] = true;
//       self.values[key] = val;
//       self.indexOf[key] = self.keys.length;
//       self.keys.push(key);
//     }
//   }

//   function remove(OpenSectionMap storage self, string memory key) public {
//     if (!self.inserted[key]) {
//       return;
//     }

//     delete self.inserted[key];
//     delete self.values[key];

//     uint index = self.indexOf[key];
//     string memory lastKey = self.keys[self.keys.length - 1];

//     self.indexOf[lastKey] = index;
//     delete self.indexOf[key];

//     self.keys[index] = lastKey;
//     self.keys.pop();
//   }
// }

// struct ReservedSeatPricingMap {
//   string[] keys;
//   mapping(string key => string) values;
//   mapping(string key => uint) indexOf;
//   mapping(string key => bool) inserted;
// }

// library ReservedSeatPricingIterableMapping {
//   function get(ReservedSeatPricingMap storage self, string memory key) public view returns (string storage) {
//     return self.values[key];
//   }

//   function getKeyAtIndex(ReservedSeatPricingMap storage self, uint index) public view returns (string storage) {
//     return self.keys[index];
//   }

//   function size(ReservedSeatPricingMap storage self) public view returns (uint) {
//     return self.keys.length;
//   }

//   function set(ReservedSeatPricingMap storage self, string memory key, string memory val) public {
//     if (self.inserted[key]) {
//       self.values[key] = val;
//     } else {
//       self.inserted[key] = true;
//       self.values[key] = val;
//       self.indexOf[key] = self.keys.length;
//       self.keys.push(key);
//     }
//   }

//   function remove(ReservedSeatPricingMap storage self, string memory key) public {
//     if (!self.inserted[key]) {
//       return;
//     }

//     delete self.inserted[key];
//     delete self.values[key];

//     uint index = self.indexOf[key];
//     string memory lastKey = self.keys[self.keys.length - 1];

//     self.indexOf[lastKey] = index;
//     delete self.indexOf[key];

//     self.keys[index] = lastKey;
//     self.keys.pop();
//   }
// }

// struct ReservedSeatsMap {
//   string[] keys;
//   mapping(string key => uint) values;
//   mapping(string key => uint) indexOf;
//   mapping(string key => bool) inserted;
// }

// library ReservedSeatsIterableMapping {
//   function get(ReservedSeatsMap storage self, string memory key) public view returns (uint) {
//     return self.values[key];
//   }

//   function getKeyAtIndex(ReservedSeatsMap storage self, uint index) public view returns (string storage) {
//     return self.keys[index];
//   }

//   function size(ReservedSeatsMap storage self) public view returns (uint) {
//     return self.keys.length;
//   }

//   function set(ReservedSeatsMap storage self, string memory key, uint val) public {
//     if (self.inserted[key]) {
//       self.values[key] = val;
//     } else {
//       self.inserted[key] = true;
//       self.values[key] = val;
//       self.indexOf[key] = self.keys.length;
//       self.keys.push(key);
//     }
//   }

//   function remove(ReservedSeatsMap storage self, string memory key) public {
//     if (!self.inserted[key]) {
//       return;
//     }

//     delete self.inserted[key];
//     delete self.values[key];

//     uint index = self.indexOf[key];
//     string memory lastKey = self.keys[self.keys.length - 1];

//     self.indexOf[lastKey] = index;
//     delete self.indexOf[key];

//     self.keys[index] = lastKey;
//     self.keys.pop();
//   }
// }

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
  address owner;
  address venue;
  address entertainer;
  bool venueSigned;
  bool entertainerSigned;
  bool ticketSalesEnabled;
  uint eventDateTime;
  PricingTemplateMap pricingTemplates;
  OpenSectionMap openSections;
  ReservedSeatPricingMap reservedSeatPricing;
  ReservedSeatsMap reservedSeats;
  string defaultPricingTemplateKey;
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
