# NFTicket

This project aims to create a standard for a ledger-based ticketing system for live events built in the Hedera ecosystem using HCS (Hedera Consensus Service) and HTS (Hedera Token Service).

>This project is team **solar-garlic**'s submission for the [Beyond Blockchain: Hashgraph Hackathon](https://go.beyondblockchain.dev/pg-homepage) in 2023.

### Project Goals
- Bring transparency to live event ticketing
- Disrupt primary and secondary ticket marketplaces, who are regularly accused of unfair business practices
- Enable artists, musicians, sports teams, and others to create a unique connection with their audience

### Terminology
- **Attraction** - Entertainers, performers, artists, bands, sports teams, etc.
- **Venue** - A building or property that hosts live events
- **Event** - An in-person gathering of people for a shared live experience
- **Attendee** - An individual who buys a ticket and uses it to gain entry to a live event

### Overview
1. **Attractions** connect to the dApp and create a profile with name, attraction type, image, etc.
2. **Venues** connect to the dApp and create a profile with name, address, sections, tiers, seats, etc.
3. **Venues** create an **event**, assigning an **attraction**, date, time, and desired fee structure
4. **Attractions** create an NFT collection tied to an **event**, providing base image(s) and metadata
5. **Attendees** connect to the dApp, filter events by **attraction** name, **attraction** type, and/or date range, and mint an NFTicket
6. NFTickets can be bought, sold, and traded second-hand prior to the **event** (similar to StubHub), or after the **event** as collectibles
7. At the time of the **event**, **attendees** will pull up the NFTicket on their mobile device's wallet and the **venue** will scan it to grant entry, which will mark the NFTicket as "fulfilled"
8. Once an NFTicket is marked as "fulfilled" it cannot be used again to gain entry to the **venue**
