// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

///////////---> Generic <---///////////
error Unauthorized();
error DuplicateKey();
error KeyNotFound();
error Disabled();
error NotConfigured();
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
error InsufficientPaymentAmount();
error TicketMintFailed();
error TicketNotFound();
error TicketAlreadyScanned();
error PayoutAlreadyCollected();
error TransferFailed();
