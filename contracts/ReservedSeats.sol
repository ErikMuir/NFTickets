// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct ReservedSeatsMap {
  string[] keys;
  mapping(string key => uint) values;
  mapping(string key => uint) indexOf;
  mapping(string key => bool) inserted;
}

library ReservedSeatsIterableMapping {
  function get(ReservedSeatsMap storage self, string memory key) public view returns (uint) {
    return self.values[key];
  }

  function getKeyAtIndex(ReservedSeatsMap storage self, uint index) public view returns (string storage) {
    return self.keys[index];
  }

  function size(ReservedSeatsMap storage self) public view returns (uint) {
    return self.keys.length;
  }

  function set(ReservedSeatsMap storage self, string memory key, uint val) public {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(ReservedSeatsMap storage self, string memory key) public {
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
