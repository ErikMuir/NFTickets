// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct OpenSection {
  int256 ticketPrice;
  uint256 maxCapacity;
  uint256 remainingCapacity;
}

struct OpenSectionMap {
  string[] keys;
  mapping(string => OpenSection) values;
  mapping(string => uint256) indexOf;
  mapping(string => bool) inserted;
}

library OpenSectionIterableMapping {
  function exists(OpenSectionMap storage self, string memory key) internal view returns (bool) {
    return self.inserted[key];
  }

  function get(OpenSectionMap storage self, string memory key) internal view returns (OpenSection storage) {
    return self.values[key];
  }

  function getKeyAtIndex(OpenSectionMap storage self, uint256 index) internal view returns (string storage) {
    return self.keys[index];
  }

  function size(OpenSectionMap storage self) internal view returns (uint256) {
    return self.keys.length;
  }

  function set(OpenSectionMap storage self, string memory key, OpenSection memory val) internal {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(OpenSectionMap storage self, string memory key) internal {
    if (!self.inserted[key]) {
      return;
    }

    delete self.inserted[key];
    delete self.values[key];

    uint256 index = self.indexOf[key];
    string memory lastKey = self.keys[self.keys.length - 1];

    self.indexOf[lastKey] = index;
    delete self.indexOf[key];

    self.keys[index] = lastKey;
    self.keys.pop();
  }
}
