// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

///////////---> Generic <---///////////
error Unauthorized();
error DuplicateKey();
error KeyNotFound();
error Disabled();
error NotConfigured();
error InsufficientPaymentAmount();
///////////---> Event Factory <---///////////
error EntertainerNotRegistered();
error EntertainerAlreadyRegistered();
error EntertainerNotEnabled();
error VenueNotRegistered();
error VenueAlreadyRegistered();
error VenueNotEnabled();
error FactoryNotEnabled();
///////////---> Events <---///////////
error VenueAndEntertainerAreRequired();
error VenueFeeTooHigh();
error ContractNotReadyToSign();
error ContractAlreadySigned();
error ContractNotSigned();
error ContractNotFinalized();
error ContractAlreadyFinalized();
error CollectionCreationFailed();
error SalesNotActive();
error SalesStillActive();
error SectionNotFound();
error SectionAlreadyExists();
error SectionFull();
error TicketMintFailed();
error TicketNotFound();
error TicketAlreadyScanned();
error PayoutAlreadyCollected();
error TransferFailed();

