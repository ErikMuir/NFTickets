// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct NFTicket {
  string section;
  string row;
  string seat;
  int256 ticketPrice;
  address originalBuyer;
  bool ticketScanned;
}

struct NFTicketMap {
  int64[] keys;
  mapping(int64 key => NFTicket) values;
  mapping(int64 key => uint256) indexOf;
  mapping(int64 key => bool) inserted;
}

library NFTicketIterableMapping {
  function get(NFTicketMap storage self, int64 key) public view returns (NFTicket storage) {
    return self.values[key];
  }

  function getKeyAtIndex(NFTicketMap storage self, uint256 index) public view returns (int64) {
    return self.keys[index];
  }

  function size(NFTicketMap storage self) public view returns (uint256) {
    return self.keys.length;
  }

  function set(NFTicketMap storage self, int64 key, NFTicket memory val) public {
    if (self.inserted[key]) {
      self.values[key] = val;
    } else {
      self.inserted[key] = true;
      self.values[key] = val;
      self.indexOf[key] = self.keys.length;
      self.keys.push(key);
    }
  }

  function remove(NFTicketMap storage self, int64 key) public {
    if (!self.inserted[key]) {
      return;
    }

    delete self.inserted[key];
    delete self.values[key];

    uint index = self.indexOf[key];
    int64 lastKey = self.keys[self.keys.length - 1];

    self.indexOf[lastKey] = index;
    delete self.indexOf[key];

    self.keys[index] = lastKey;
    self.keys.pop();
  }
}
