// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import {
  Unauthorized,
  DuplicateKey,
  KeyNotFound
} from "../Errors.sol";
import { VenueDisabled } from "./VenueErrors.sol";
import "./EventMap.sol";
import "./SeatingMap.sol";

contract Venue {
  using EventIterableMapping for EventMap;
  using SeatingIterableMapping for SeatingMap;

  EventMap events;
  SeatingMap seating;
  address public owner;
  string public name;
  string public description;
  string public location;
  bool public enabled;

  constructor() {
    owner = msg.sender;
  }

  // access modifiers
  modifier onlyOwner() {
    if (msg.sender != owner) revert Unauthorized();
    _;
  }

  modifier isEnabled() {
    if (!enabled) revert VenueDisabled();
    _;
  }

  // public view functions
  function getEventKeys() public view returns (address[] memory) {
    return events.keys;
  }

  function getEventCreation(address _key) public view returns (uint) {
    return events.get(_key);
  }

  function getSeatingKeys() public view returns (string[] memory) {
    return seating.keys;
  }

  function getSeatingCapacity(string calldata _key) public view returns (uint) {
    return seating.get(_key);
  }

  // external owner functions
  function setName(string calldata _name) external onlyOwner {
    name = _name;
  }

  function setDescription(string calldata _description) external onlyOwner {
    description = _description;
  }

  function setLocation(string calldata _location) external onlyOwner {
    location = _location;
  }

  function addEvent(address _key) external onlyOwner isEnabled  {
    if (events.get(_key) > 0) revert DuplicateKey();
    events.set(_key);
  }

  function addSeating(
    string calldata _key,
    uint _capacity
  ) external onlyOwner  {
    if (seating.exists(_key)) revert DuplicateKey();
    seating.set(_key, _capacity);
  }

  function updateSeating(
    string calldata _key,
    uint _capacity
  ) external onlyOwner {
    if (!seating.exists(_key)) revert KeyNotFound();
    seating.set(_key, _capacity);
  }

  function removeSeating(string calldata _key) external onlyOwner {
    if (!seating.exists(_key)) revert KeyNotFound();
    seating.remove(_key);
  }

  function enable() external onlyOwner {
    enabled = true;
  }

  function disable() external onlyOwner {
    enabled = false;
  }
}
