# NFTickets

## Summary

This project aims to create a standard for a ledger-based ticketing system for live events built in the Hedera ecosystem using Hedera's Token, Consensus, and Smart Contract services.

## Problem Statement

Live event promotors and ticket marketplaces (e.g. Live Nation, TicketMaster, StubHub) are regularly accused of unfair and opaque business practices due to their monopolization and centralization of the live event industry.

## Project Goals

- Disrupt the live event industry by bringing transparency to ticketing and eliminating the need for a promotor as a middleman between entertainers and venues
- Enable artists, musicians, sports teams, and others to create a unique connection with their audiences using NFT assets as keepsakes and collectibles

## Overview

1. Entertainers connect to the dApp and create a profile with name, attraction type, image, etc.
1. Venues connect to the dApp and create a profile with name, address, sections, tiers, seats, etc.
1. Venues create an event, assigning an entertainer, date, time, and desired fee structure
1. Entertainers, if they agree to the terms of the event as set by the venue, can then create an NFT collection tied to the event, providing base image(s) and metadata
1. Attendees connect to the dApp, filter events by entertainer, attraction type, and/or date range, and mint an NFTicket
1. NFTickets can be bought, sold, and traded second-hand prior to the event, or after the event as collectibles
1. At the time of the event, attendees will pull up the NFTicket on their mobile device's wallet and the venue will scan it to grant entry
1. Once an NFTicket is scanned it cannot be used again to gain entry to the venue (preventing someone from getting into the venue and then sending it to a friend still waiting in line)

## Leveraging Hedera Technology

- Each entertainer and venue is assigned their own HCS Topic when they first setup their profile. Each time they save or update their profile information, rather than inserting it into a centralized database the data is submitted in an HCS message to their topic.
- Each event is its own smart contract under the hood. The smart contract is responsible for creating, minting, and distributing the NFTickets via HTS.

## Tech Stack

- Client Side
  - Frontend Framework: Next.js
- Server Side
  - Backend Framework: Next.js
  - Host: Vercel
- Integrations
  - Hedera Token Service
  - Hedera Consensus Service
  - Hedera Smart Contract Service
- Programming Languages
  - TypeScript
  - Solidity
- Notable Libraries
  - Hedera JavaScript SDK
  - HashConnect

## Technical Limitations

This can't really ever achieve widespread adoption until Hedera gets its act together and implements zero-downtime deployments. Could you imagine what a mess it would be if Hedera decided to do an upgrade right as thousands of people were simultaneously trying to enter a venue for a concert?

## Revenue Model

Revenue can be collected by the dApp through one or more of these methods:

- Registration Fees
  - **Venue Registration Fee** - a one-time fee for registering as a Venue
  - **Entertainer Registration Fee** - a one-time fee for registering as an Entertainer
- Event Fees
  - **Venue Event Fee** - a fee when a Venue creates a new Event
  - **Entertainer Event Fee** - a fee when an Entertainer creates a new NFT collection
- Rotalties
  - collect a royalty fee from each sale of an NFTicket

## solar-garlic team members

- Erik Muir (RobotJones)
  - erikdmuir@gmail.com
  - https://github.com/ErikMuir
