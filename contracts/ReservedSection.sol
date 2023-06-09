// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct ReservedSection {
  int256 ticketPrice;
}

struct ReservedSectionMap {
  string[] keys;
  mapping(string key => ReservedSection) values;
  mapping(string key => uint) indexOf;
  mapping(string key => bool) inserted;
}

library ReservedSectionIterableMapping {
  function get(ReservedSectionMap storage self, string memory key) public view returns (ReservedSection storage) {
    return self.values[key];
  }

  function getKeyAtIndex(ReservedSectionMap storage self, uint256 index) public view returns (string storage) {
    return self.keys[index];
  }

  function size(ReservedSectionMap storage self) public view returns (uint256) {
    return self.keys.length;
  }

  function set(ReservedSectionMap storage self, string memory key, ReservedSection memory val) public {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(ReservedSectionMap storage self, string memory key) public {
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
