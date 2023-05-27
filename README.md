# NFTicket

This project aims to create a standard for a ledger-based ticketing system for live events built in the Hedera ecosystem using Hedera's Token, Consensus, and Smart Contract services.

> This project is team **solar-garlic**'s submission for the [Beyond Blockchain: Hashgraph Hackathon](https://go.beyondblockchain.dev/pg-homepage) in 2023.

## solar-garlic Team Members

- Erik Muir (RobotJones)
  - erikdmuir@gmail.com
  - https://github.com/ErikMuir

## Project Goals

- Bring transparency to live event ticketing
- Disrupt primary and secondary ticket marketplaces, who are regularly accused of unfair business practices
- Enable artists, musicians, sports teams, and others to create a unique connection with their audiences

## Overview

1. [Attractions](#glossary) connect to the dApp and create a profile with name, attraction type, image, etc.
1. [Venues](#glossary) connect to the dApp and create a profile with name, address, sections, tiers, seats, etc.
1. Venues create an [Event](#glossary), assigning an attraction, date, time, and desired fee structure
1. Attractions, if they agree to the terms of the event as set by the venue, can then create an NFT collection tied to the event, providing base image(s) and metadata
1. [Attendees](#glossary) connect to the dApp, filter events by attraction name, attraction type, and/or date range, and mint an NFTicket
1. NFTickets can be bought, sold, and traded second-hand prior to the event (similar to StubHub), or after the event as collectibles
1. At the time of the event, attendees will pull up the NFTicket on their mobile device's wallet and the venue will scan it to grant entry, which will mark the NFTicket as "fulfilled"
1. Once an NFTicket is marked as "fulfilled" it cannot be used again to gain entry to the venue

## Technical Implementation

- Each attraction and venue is assigned their own HCS Topic when they first setup their profile, and each time they save or update their profile information, the data is submitted in an HCS message to their topic.
- An event is actually just a smart contract under the hood. The smart contract is responsible for creating, minting, and distributing the NFTickets. The attraction and venue both have a certain level of administrative permissions to update the contract.

## Technical Limitations

This can't really ever achieve widespread adoption until Hedera gets its act together and implements zero-downtime deployments. Could you imagine what a mess it would be if Hedera decided to do an upgrade right as thousands of people were simultaneously trying to enter a venue for a concert?

## Revenue Model

Revenue can be collected by the dApp in the following three ways:

1. Charge a fee to **venues** each time a new **event** is created
1. Charge a fee to **attractions** each time a new NFT collection is created
1. Collect a royalty fee from each sale of an NFTicket

### Glossary

|              |                                                                           |
| :----------- | :------------------------------------------------------------------------ |
| _Attraction_ | Entertainers, performers, artists, bands, sports teams, etc.              |
| _Venue_      | A building, room, or property that hosts live events                      |
| _Event_      | An in-person gathering of people for a shared live experience             |
| _Attendee_   | An individual who buys a ticket and uses it to gain entry to a live event |
