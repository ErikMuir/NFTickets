// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import {Event as NFTicketEvent} from "./Event.sol";
import {
  Unauthorized,
  InsufficientPaymentAmount,
  EntertainerNotRegistered,
  EntertainerAlreadyRegistered,
  EntertainerNotEnabled,
  VenueNotRegistered,
  VenueAlreadyRegistered,
  VenueNotEnabled,
  FactoryNotEnabled
} from "./Errors.sol";

struct Provider {
    bool registered;
    bool enabled;
}

contract EventFactory {
    address payable public owner;
    mapping(address => Provider) public venues;
    mapping(address => Provider) public entertainers;
    bool public enabled;
    uint public venueRegistrationFee;
    uint public entertainerRegistrationFee;
    uint public eventFee;
    uint public collectionFee;
    uint public serviceFeeBasePoints;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    // access modifiers
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier notDisabled() {
        if (!enabled) revert FactoryNotEnabled();
        _;
    }

    // public getters
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function venueRegistered(address _venue) public view returns (bool) {
        return venues[_venue].registered;
    }

    function entertainerRegistered(
        address _entertainer
    ) public view returns (bool) {
        return entertainers[_entertainer].registered;
    }

    function venueEnabled(address _venue) public view returns (bool) {
        return venues[_venue].enabled;
    }

    function entertainerEnabled(
        address _entertainer
    ) public view returns (bool) {
        return entertainers[_entertainer].enabled;
    }

    // admin functions
    function withdraw(uint _amount) public onlyOwner {
        uint amount = _amount == 0 ? address(this).balance : _amount;
        payable(msg.sender).transfer(amount);
    }

    function enableFactory() public onlyOwner {
        enabled = true;
    }

    function disableFactory() public onlyOwner {
        enabled = false;
    }

    function setVenueRegistrationFee(
        uint _venueRegistrationFee
    ) public onlyOwner {
        venueRegistrationFee = _venueRegistrationFee;
    }

    function setEntertainerRegistrationFee(
        uint _entertainerRegistrationFee
    ) public onlyOwner {
        entertainerRegistrationFee = _entertainerRegistrationFee;
    }

    function setEventFee(uint _eventFee) public onlyOwner {
        eventFee = _eventFee;
    }

    function setCollectionFee(uint _collectionFee) public onlyOwner {
        collectionFee = _collectionFee;
    }

    function setServiceFeeBasePoints(
        uint _serviceFeeBasePoints
    ) public onlyOwner {
        serviceFeeBasePoints = _serviceFeeBasePoints;
    }

    function adminRegisterVenue(address _venue) public onlyOwner {
        Provider storage venue = venues[_venue];
        if (venue.registered) revert VenueAlreadyRegistered();
        venue.registered = true;
    }

    function adminRegisterEntertainer(address _entertainer) public onlyOwner {
        Provider storage entertainer = entertainers[_entertainer];
        if (entertainer.registered) revert EntertainerAlreadyRegistered();
        entertainer.registered = true;
    }

    function adminUpdateVenue(address _venue, bool _enabled) public onlyOwner {
        Provider storage venue = venues[_venue];
        if (!venue.registered) revert VenueNotRegistered();
        venue.enabled = _enabled;
    }

    function adminUpdateEntertainer(
        address _entertainer,
        bool _enabled
    ) public onlyOwner {
        Provider storage entertainer = entertainers[_entertainer];
        if (!entertainer.registered) revert EntertainerNotRegistered();
        entertainer.enabled = _enabled;
    }

    // entertainer functions
    function registerEntertainer() public payable notDisabled {
        Provider storage entertainer = entertainers[msg.sender];
        if (entertainer.registered) revert EntertainerAlreadyRegistered();
        if (msg.value < entertainerRegistrationFee)
            revert InsufficientPaymentAmount();
        entertainer.registered = true;
    }

    function enableEntertainer() public notDisabled {
        Provider storage entertainer = entertainers[msg.sender];
        if (!entertainer.registered) revert EntertainerNotRegistered();
        entertainer.enabled = true;
    }

    function disableEntertainer() public notDisabled {
        Provider storage entertainer = entertainers[msg.sender];
        if (!entertainer.registered) revert EntertainerNotRegistered();
        entertainer.enabled = false;
    }

    // venue functions
    function registerVenue() public payable notDisabled {
        Provider storage venue = venues[msg.sender];
        if (venue.registered) revert VenueAlreadyRegistered();
        if (msg.value < venueRegistrationFee)
            revert InsufficientPaymentAmount();
        venue.registered = true;
    }

    function enableVenue() public notDisabled {
        Provider storage venue = venues[msg.sender];
        if (!venue.registered) revert VenueNotRegistered();
        venue.enabled = true;
    }

    function disableVenue() public notDisabled {
        Provider storage venue = venues[msg.sender];
        if (!venue.registered) revert VenueNotRegistered();
        venue.enabled = false;
    }

    function createEvent(
        address _entertainer
    ) public payable notDisabled returns (address) {
        Provider storage venue = venues[msg.sender];
        if (!venue.registered) revert VenueNotRegistered();
        if (!venue.enabled) revert VenueNotEnabled();

        Provider memory entertainer = entertainers[_entertainer];
        if (!entertainer.registered) revert EntertainerNotRegistered();
        if (!entertainer.enabled) revert EntertainerNotEnabled();

        if (msg.value < eventFee) revert InsufficientPaymentAmount();

        NFTicketEvent newEvent = new NFTicketEvent(
            msg.sender,
            _entertainer,
            serviceFeeBasePoints,
            collectionFee
        );
        address eventAddress = address(newEvent);
        // events.set(
        //     eventAddress,
        //     EventMetadata(
        //         msg.sender,
        //         _entertainer,
        //         block.timestamp
        //     )
        // );
        return eventAddress;
    }
}
