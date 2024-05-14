## Idea: EventFactory

Revenue is generated for the dApp via an Event Factory through an assortment of fees:

- Venue Registration Fee
- Entertainer Registration Fee
- New Event Fee (paid by venue at event creation)
- New Collection Fee (paid by entertainer, locked in at event creation)
- Service Fee (percentage of ticket sales, locked in at event creation)

The dApp will also be able to interact with the Event Factory in order to:

- register a provider directly (waiving the fee)
- remove a provider (does not interfere with existing events)
- withdraw from balance
- enable/disable event creation

Question:

- Should the event factory hold a list of all created events in its state?

## Idea: Grouped setter functions

_Is this even possible/practical?_

- Examples:
  - Set Event Info:
    - uint256 eventDateTime
    - uint256 ticketSalesStartDateTime
    - uint256 ticketSalesEndDateTime
    - int256  defaultTicketPrice
    - uint256 venueFeeBasePoints
  - Set Sections:
    - SectionMap sections

## Idea: NFT Royalties

- Allow entertainers to configure royalty fees upon collection creation

## Idea: Provider Contracts

- Make smart contracts for venues and entertainers
