// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import { DuplicateKey } from "../Errors.sol";

struct EventMap {
  address[] keys;
  mapping(address => uint) values;
}

library EventIterableMapping {
  function get(EventMap storage self, address key) internal view returns (uint) {
    return self.values[key];
  }

  function set(EventMap storage self, address key) internal {
    if (self.values[key] > 0) revert DuplicateKey();
    self.values[key] = block.timestamp;
    self.keys.push(key);
  }
}
