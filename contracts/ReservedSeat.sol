// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct ReservedSeat {
  string section;
  string row;
  string seat;
  int64 serial;
}

struct ReservedSeatMap {
  string[] keys;
  mapping(string key => ReservedSeat) values;
  mapping(string key => uint256) indexOf;
  mapping(string key => bool) inserted;
}

library ReservedSeatIterableMapping {
  function get(ReservedSeatMap storage self, string memory key) public view returns (ReservedSeat storage) {
    return self.values[key];
  }

  function getKeyAtIndex(ReservedSeatMap storage self, uint256 index) public view returns (string storage) {
    return self.keys[index];
  }

  function size(ReservedSeatMap storage self) public view returns (uint256) {
    return self.keys.length;
  }

  function set(ReservedSeatMap storage self, string memory key, ReservedSeat memory val) public {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(ReservedSeatMap storage self, string memory key) public {
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
