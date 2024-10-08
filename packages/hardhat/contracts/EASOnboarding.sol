// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./lib/Structs.sol";
import "./storage/EASOnboardingStorage.sol";

contract SEEDtest is EASOnboardingStorage {
    constructor() {
        deployer = msg.sender;
    }

    modifier isMentorAddress(address _mentorAddress) {
        require(
            isMentor[_mentorAddress] || _mentorAddress == deployer, "Only selected mentor addresses can create quiz"
        );
        _;
    }

    event EventCreated(
        uint256 indexed eventId, string eventName, address indexed mentorAddress, uint256 closingTimestamp
    );

    event AttestationAdded(address indexed studentAddress, uint256 indexed eventId, bytes32 attestation);
    event MentorAdded(address indexed mentorAddress);
    event OverrideEventFlagToggled(uint256 indexed eventId, bool status);
    event MentorRemoved(address indexed mentorAddress);

    function getAttested(uint256 _eventId, uint256 _level, bytes32 _msgHash, bytes memory _signature)
        public
        returns (bool)
    {
        // This should take care of failed attempt to getAttested
        require(
            studentEventMap[msg.sender][_eventId].attestation == bytes32(0), "Student already attested for this event"
        );
        require(isVerified(_msgHash, _signature), "Invalid Txn Source");
        require(events[_eventId].isActive || !events[_eventId].overrideClosingTimestamp, "Event is no longer active");
        require(
            (events[_eventId].closingTimestamp > block.timestamp) || !events[_eventId].overrideClosingTimestamp,
            "Event is past closing timestamp"
        );
        attestationProfile[msg.sender].studentLevel = _level;
        studentEventMap[msg.sender][_eventId].eventId = _eventId;
        studentEventMap[msg.sender][_eventId].eventName = events[_eventId].eventName;
        studentEventMap[msg.sender][_eventId].eventDescription = events[_eventId].eventDescription;
        studentEventMap[msg.sender][_eventId].mentorName = events[_eventId].mentorName;
        studentEventMap[msg.sender][_eventId].mentorAddress = events[_eventId].mentorAddress;
        studentEventMap[msg.sender][_eventId].level = _level;
        return true;
    }

    function addAttestation(bytes32 _attestation, address _studentAddress, uint256 _eventId) public {
        require(msg.sender == deployer);
        require(
            studentEventMap[_studentAddress][_eventId].attestation == bytes32(0),
            "Student already attested for this event"
        );
        events[_eventId].attendees.push(_studentAddress);
        events[_eventId].attendeeCount++;
        attestationProfile[_studentAddress].eventsCompleted.push(_eventId);
        attestationProfile[_studentAddress].attestations.push(_attestation);
        studentEventMap[_studentAddress][_eventId].attestation = _attestation;

        emit AttestationAdded(_studentAddress, _eventId, _attestation);
    }

    function toggleOverrideEventFlag(uint256 _eventId, bool _res) public isMentorAddress(msg.sender) {
        events[_eventId].overrideClosingTimestamp = _res;
        emit OverrideEventFlagToggled(_eventId, _res);
    }

    function createEvent(
        uint256 _closingTimestamp,
        uint256 _level,
        uint8 _type,
        string memory _eventName,
        string memory _eventDescription,
        string memory _mentorName,
        string memory _badgeUri,
        bytes32 _schemaUID
    ) public isMentorAddress(msg.sender) {
        require(_closingTimestamp > block.timestamp, "Closing timestamp cannot be in the past.");

        events[eventIdCounter].typeOf = _type;
        events[eventIdCounter].eventId = eventIdCounter;
        events[eventIdCounter].level = _level;
        events[eventIdCounter].closingTimestamp = _closingTimestamp;
        events[eventIdCounter].attendeeCount = 1;
        events[eventIdCounter].eventName = _eventName;
        events[eventIdCounter].eventDescription = _eventDescription;
        events[eventIdCounter].mentorName = _mentorName;
        events[eventIdCounter].badgeUri = _badgeUri;
        events[eventIdCounter].mentorAddress = msg.sender;
        events[eventIdCounter].attendees.push(msg.sender);
        events[eventIdCounter].isActive = true;
        events[eventIdCounter].overrideClosingTimestamp = false;
        events[eventIdCounter].schemaUID = _schemaUID;
        eventIdCounter++;

        emit EventCreated(eventIdCounter - 1, _eventName, msg.sender, _closingTimestamp);
    }

    function isVerified(bytes32 _messageHash, bytes memory _signature) public view returns (bool) {
        // The ethSignedMessageHash is the hash that the signer actually signed
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

        // Recover the signer's address from the signature
        address signer = recoverSigner(ethSignedMessageHash, _signature);

        require(signer == deployer, "Unauthorized Contract call");

        return true;
    }

    function addMentors(address[] memory _newMentors) public isMentorAddress(msg.sender) {
        for (uint256 i = 0; i < _newMentors.length; i++) {
            isMentor[_newMentors[i]] = true;
            emit MentorAdded(_newMentors[i]);
        }
    }

    function removeMentors(address[] memory _mentors) public {
        require(msg.sender == deployer, "Only deployer can remove mentors");

        for (uint256 i = 0; i < _mentors.length; i++) {
            if (isMentor[_mentors[i]]) {
                isMentor[_mentors[i]] = false;
                emit MentorRemoved(_mentors[i]);
            }
        }
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) public pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65, "invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }
        return (v, r, s);
    }
}
