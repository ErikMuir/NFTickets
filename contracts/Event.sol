// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Event {
  // types

  // constants

  // properties
  address venue;
  address entertainer;
  uint datetime;
  bool disabled;

  // constructor
  constructor(address _entertainer, uint _datetime) {
    venue = msg.sender;
    entertainer = _entertainer;
    datetime = _datetime;
    disabled = false;
  }

  // access modifiers
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

  modifier enabled() {
    require(!disabled, "This event is currently disabled.");
    _;
  }

  // event functions

  // public getters

  // admin functions
  function disable() public onlyAdmin {
    disabled = true;
  }

  function enable() public onlyAdmin {
    disabled = false;
  }

  // internal functions
}
