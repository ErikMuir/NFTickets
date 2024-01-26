// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import { DuplicateKey } from "../Errors.sol";

struct SeatingMap {
  string[] keys;
  mapping(string => uint) values;
  mapping(string => uint) indexOf;
  mapping(string => bool) inserted;
}

library SeatingIterableMapping {
  function exists(SeatingMap storage self, string memory key) internal view returns (bool) {
    return self.inserted[key];
  }

  function get(SeatingMap storage self, string memory key) internal view returns (uint) {
    return self.values[key];
  }

  function size(SeatingMap storage self) internal view returns (uint) {
    return self.keys.length;
  }

  function set(SeatingMap storage self, string memory key, uint val) internal {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(SeatingMap storage self, string memory key) internal {
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
