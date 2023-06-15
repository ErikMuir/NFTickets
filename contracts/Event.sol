// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./HederaResponseCodes.sol";
import "./IHederaTokenService.sol";
import "./HederaTokenService.sol";
import "./ExpiryHelper.sol";
import "./KeyHelper.sol";
import "./NFTicket.sol";
import "./OpenSection.sol";
import "./ReservedSection.sol";

contract Event is ExpiryHelper, KeyHelper, HederaTokenService {
    using NFTicketIterableMapping for NFTicketMap;
    using OpenSectionIterableMapping for OpenSectionMap;
    using ReservedSectionIterableMapping for ReservedSectionMap;

    address public owner;
    address public venue;
    address public entertainer;
    address public tokenAddress;
    bool public venueSigned;
    bool public entertainerSigned;
    uint256 public eventDateTime;
    uint256 public ticketSalesStartDateTime;
    uint256 public ticketSalesEndDateTime;
    int256 public defaultTicketPrice;
    uint256 public serviceFeeBasePoints;
    uint256 public venueFeeBasePoints;
    uint256 public serviceFee;
    uint256 public venueFee;
    uint256 public entertainerProceeds;
    bool public serviceFeeCollected;
    bool public venueFeeCollected;
    bool public entertainerProceedsCollected;
    mapping(string => int64) reservedSeats;
    NFTicketMap nfTickets;
    OpenSectionMap openSections;
    ReservedSectionMap reservedSections;

    constructor(
        address _venue,
        address _entertainer,
        uint256 _serviceFeeBasePoints
    ) {
        require(
            _venue != address(0) && _entertainer != address(0),
            "Venue and entertainer are required"
        );
        owner = msg.sender;
        venue = _venue;
        entertainer = _entertainer;
        serviceFeeBasePoints = _serviceFeeBasePoints;
        venueSigned = false;
        entertainerSigned = false;
    }

    receive() external payable {}

    // access modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    modifier onlyVenue() {
        require(msg.sender == venue, "Unauthorized");
        _;
    }

    modifier onlyEntertainer() {
        require(msg.sender == entertainer, "Unauthorized");
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == venue || msg.sender == entertainer,
            "Unauthorized"
        );
        _;
    }

    modifier finalized() {
        require(venueSigned && entertainerSigned, "Contract not yet finalized");
        _;
    }

    modifier notFinalized() {
        require(
            !venueSigned || !entertainerSigned,
            "Contract already finalized"
        );
        _;
    }

    modifier readyToSign() {
        require(eventDateTime != 0, "Event date time not set");
        require(defaultTicketPrice != 0, "Default ticket price not set");
        require(
            ticketSalesStartDateTime != 0,
            "Ticket sales start date time not set"
        );
        require(
            ticketSalesEndDateTime != 0,
            "Ticket sales end date time not set"
        );
        require(
            serviceFeeBasePoints + venueFeeBasePoints < 10_000,
            "Fees are too high"
        );
        _;
    }

    modifier resetSignatures() {
        _;
        venueSigned = false;
        entertainerSigned = false;
    }

    modifier tokenCreated() {
        require(tokenAddress != address(0), "NFT Collection not yet created");
        _;
    }

    modifier salesEnabled() {
        bool ticketSalesHaveStarted = block.timestamp >=
            ticketSalesStartDateTime;
        bool ticketSalesHaveEnded = block.timestamp < ticketSalesEndDateTime;
        require(
            ticketSalesHaveStarted && !ticketSalesHaveEnded,
            "Ticket sales not enabled"
        );
        _;
    }

    modifier salesEnded() {
        require(
            block.timestamp >= ticketSalesEndDateTime,
            "Ticket sales are still active"
        );
        _;
    }

    // public getters
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getOpenSectionKeys() public view returns (string[] memory) {
        return openSections.keys;
    }

    function getOpenSection(
        string memory _key
    ) public view returns (OpenSection memory) {
        return openSections.get(_key);
    }

    function getReservedSectionKeys() public view returns (string[] memory) {
        return reservedSections.keys;
    }

    function getReservedSection(
        string memory _key
    ) public view returns (ReservedSection memory) {
        return reservedSections.get(_key);
    }

    function getNFTicket(int64 _serial) public view returns (NFTicket memory) {
        return nfTickets.get(_serial);
    }

    function getSeatTicketPrice(
        string calldata _section,
        string calldata _row,
        string calldata _seat
    ) public view returns (int256) {
        int256 ticketPrice = getOpenSectionTicketPrice(_section);
        if (ticketPrice != 0) {
            return ticketPrice;
        }

        ticketPrice = getReservedSectionTicketPrice(
            buildTicketKey(_section, _row, _seat)
        );
        if (ticketPrice != 0) {
            return ticketPrice;
        }

        ticketPrice = getReservedSectionTicketPrice(
            buildTicketKey(_section, _row, "")
        );
        if (ticketPrice != 0) {
            return ticketPrice;
        }

        ticketPrice = getReservedSectionTicketPrice(_section);
        if (ticketPrice != 0) {
            return ticketPrice;
        }

        return defaultTicketPrice;
    }

    // admin functions
    function setEventDateTime(
        uint256 _eventDateTime
    ) external onlyAdmin notFinalized resetSignatures {
        eventDateTime = _eventDateTime;
    }

    function setTicketSalesStartDateTime(
        uint256 _ticketSalesStartDateTime
    ) external onlyAdmin notFinalized resetSignatures {
        ticketSalesStartDateTime = _ticketSalesStartDateTime;
    }

    function setTicketSalesEndDateTime(
        uint256 _ticketSalesEndDateTime
    ) external onlyAdmin notFinalized resetSignatures {
        ticketSalesEndDateTime = _ticketSalesEndDateTime;
    }

    function setVenueFeeBasePoints(
        uint256 _venueFeeBasePoints
    ) external onlyAdmin notFinalized resetSignatures {
        venueFeeBasePoints = _venueFeeBasePoints;
    }

    function setDefaultTicketPrice(
        uint256 _ticketPrice
    ) external onlyAdmin notFinalized resetSignatures {
        defaultTicketPrice = normalizeTicketPrice(_ticketPrice);
    }

    function addOpenSection(
        string calldata _key,
        uint256 _capacity
    ) external onlyVenue notFinalized resetSignatures {
        require(!openSections.exists(_key), "Open section already exists");
        OpenSection memory openSection;
        openSection.maxCapacity = _capacity;
        openSection.remainingCapacity = _capacity;
        openSections.set(_key, openSection);
    }

    function setOpenSectionTicketPrice(
        string calldata _key,
        uint256 _ticketPrice
    ) external onlyEntertainer notFinalized resetSignatures {
        require(openSections.exists(_key), "Open section not found");
        OpenSection storage openSection = openSections.get(_key);
        openSection.ticketPrice = normalizeTicketPrice(_ticketPrice);
    }

    function setOpenSectionCapacity(
        string calldata _key,
        uint256 _capacity
    ) external onlyVenue notFinalized resetSignatures {
        require(openSections.exists(_key), "Open section not found");
        OpenSection storage openSection = openSections.get(_key);
        openSection.maxCapacity = _capacity;
        openSection.remainingCapacity = _capacity;
    }

    function removeOpenSection(
        string calldata _key
    ) external onlyVenue notFinalized resetSignatures {
        openSections.remove(_key);
    }

    function addReservedSection(
        string calldata _key
    ) external onlyVenue notFinalized resetSignatures {
        require(!reservedSections.exists(_key), "Reserved section already exists");
        ReservedSection memory reservedSection;
        reservedSections.set(_key, reservedSection);
    }

    function setReservedSectionTicketPrice(
        string calldata _key,
        uint256 _ticketPrice
    ) external onlyEntertainer notFinalized resetSignatures {
        require(reservedSections.exists(_key), "Reserved section not found");
        ReservedSection storage reservedSection = reservedSections.get(_key);
        reservedSection.ticketPrice = normalizeTicketPrice(_ticketPrice);
    }

    function removeReservedSection(
        string calldata _key
    ) external onlyVenue notFinalized resetSignatures {
        reservedSections.remove(_key);
    }

    function venueSign() external onlyVenue notFinalized readyToSign {
        venueSigned = true;
    }

    function entertainerSign()
        external
        onlyEntertainer
        notFinalized
        readyToSign
    {
        entertainerSigned = true;
    }

    function createNft(
        string memory name,
        string memory symbol,
        string memory memo,
        int64 maxSupply,
        int64 autoRenewPeriod
    ) external payable onlyEntertainer finalized returns (address) {
        IHederaTokenService.TokenKey[]
            memory keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = getSingleKey(
            KeyType.SUPPLY,
            KeyValueType.CONTRACT_ID,
            address(this)
        );

        IHederaTokenService.HederaToken memory token;
        token.name = name;
        token.symbol = symbol;
        token.memo = memo;
        token.treasury = address(this);
        token.tokenSupplyType = true; // FINITE
        token.maxSupply = maxSupply;
        token.tokenKeys = keys;
        token.freezeDefault = false;
        token.expiry = createAutoRenewExpiry(address(this), autoRenewPeriod);

        (int256 responseCode, address createdToken) = HederaTokenService
            .createNonFungibleToken(token);

        require(
            responseCode == HederaResponseCodes.SUCCESS,
            "Failed to create NFT collection"
        );
        tokenAddress = createdToken;
        return createdToken;
    }

    function scanTicket(int64 _serial) external onlyVenue {
        NFTicket storage nfTicket = nfTickets.get(_serial);
        require(nfTicket.price == 0, "Could not find that ticket");
        require(nfTicket.scanned == false, "Ticket already scanned");
        nfTicket.scanned = true;
    }

    function collectServiceFee() external onlyOwner salesEnded {
        require(!serviceFeeCollected, "Service fee already collected");
        distributeProceeds();
        (bool success, ) = owner.call{value: serviceFee}("");
        require(success, "Failed to transfer");
        serviceFeeCollected = true;
    }

    function collectVenueFee() external onlyVenue salesEnded {
        require(!venueFeeCollected, "Venue fee already collected");
        distributeProceeds();
        (bool success, ) = venue.call{value: venueFee}("");
        require(success, "Failed to transfer");
        venueFeeCollected = true;
    }

    function collectEntertainerProceeds() external onlyEntertainer salesEnded {
        require(
            !entertainerProceedsCollected,
            "Entertainer proceeds already collected"
        );
        distributeProceeds();
        (bool success, ) = entertainer.call{value: entertainerProceeds}("");
        require(success, "Failed to transfer");
        entertainerProceedsCollected = true;
    }

    // public payable
    function mintAndTransferNft(
        string calldata _section,
        string calldata _row,
        string calldata _seat,
        bytes[] memory _metadata
    ) external payable salesEnabled returns (int64) {
        OpenSection storage openSection = openSections.get(_section);
        string memory ticketKey = buildTicketKey(_section, _row, _seat);

        bool seatAvailable = openSection.maxCapacity > 0
            ? openSection.remainingCapacity > 0
            : reservedSeats[ticketKey] == 0;
        require(seatAvailable, "Ticket not available");

        int256 ticketPrice = getSeatTicketPrice(_section, _row, _seat);
        if (ticketPrice > 0) {
            require(
                uint256(ticketPrice) <= msg.value,
                "Insufficient payment amount"
            );
        }

        (int256 mintResponse, , int64[] memory serials) = HederaTokenService
            .mintToken(tokenAddress, 0, _metadata);

        require(
            mintResponse == HederaResponseCodes.SUCCESS,
            "Failed to mint NFTicket"
        );

        nfTickets.set(
            serials[0],
            NFTicket(ticketKey, ticketPrice, msg.sender, false)
        );

        if (openSection.maxCapacity > 0) {
            openSection.remainingCapacity--;
        } else {
            reservedSeats[ticketKey] = serials[0];
        }

        HederaTokenService.associateToken(msg.sender, tokenAddress);
        HederaTokenService.transferNFT(
            tokenAddress,
            address(this),
            msg.sender,
            serials[0]
        );

        // TODO : handle when ticket was successfully minted but failed to transfer for some reason

        return serials[0];
    }

    // internal functions
    function buildTicketKey(
        string memory _section,
        string memory _row,
        string memory _seat
    ) internal pure returns (string memory) {
      if (bytes(_seat).length > 0) {
        return string(abi.encodePacked(_section, ":", _row, ":", _seat));
      }
      if (bytes(_row).length > 0) {
        return string(abi.encodePacked(_section, ":", _row));
      }
      return _section;
    }

    function normalizeTicketPrice(
        uint256 _ticketPrice
    ) internal pure returns (int256) {
        // We need to differentiate between an unset ticket price and a free ticket
        // and since unset values are always 0, we'll use -1 to represent free tickets
        return (_ticketPrice == 0 ? -1 : int(_ticketPrice));
    }

    function getOpenSectionTicketPrice(
        string memory _openSectionKey
    ) internal view returns (int256) {
        return openSections.get(_openSectionKey).ticketPrice;
    }

    function getReservedSectionTicketPrice(
        string memory _reservedSectionKey
    ) internal view returns (int256) {
        return reservedSections.get(_reservedSectionKey).ticketPrice;
    }

    function distributeProceeds() internal salesEnded {
        if (serviceFee == 0 && venueFee == 0 && entertainerProceeds == 0) {
            uint256 totalBalance = address(this).balance;
            serviceFee = (totalBalance * serviceFeeBasePoints) / 10_000;
            venueFee = (totalBalance * venueFeeBasePoints) / 10_000;
            entertainerProceeds = totalBalance - (serviceFee + venueFee);
        }
    }
}
