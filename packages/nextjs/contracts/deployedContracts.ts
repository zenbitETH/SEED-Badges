/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  84532: {
    SEEDtest: {
      address: "0x5022fA30B3158051fBa6EdA14d98e31a44B3A561",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "studentAddress",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "bytes32",
              name: "attestation",
              type: "bytes32",
            },
          ],
          name: "AttestationAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "closingTimestamp",
              type: "uint256",
            },
          ],
          name: "EventCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
          ],
          name: "MentorAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
          ],
          name: "MentorRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "status",
              type: "bool",
            },
          ],
          name: "OverrideEventFlagToggled",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_attestation",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "_studentAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_eventId",
              type: "uint256",
            },
          ],
          name: "addAttestation",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "_newMentors",
              type: "address[]",
            },
          ],
          name: "addMentors",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "attestationProfile",
          outputs: [
            {
              internalType: "uint256",
              name: "studentLevel",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_closingTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_level",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "_type",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "_eventName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_eventDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "_mentorName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_badgeUri",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "_schemaUID",
              type: "bytes32",
            },
          ],
          name: "createEvent",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "eventIdCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "events",
          outputs: [
            {
              internalType: "uint8",
              name: "typeOf",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "closingTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "attendeeCount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              internalType: "string",
              name: "eventDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "mentorName",
              type: "string",
            },
            {
              internalType: "string",
              name: "badgeUri",
              type: "string",
            },
            {
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "overrideClosingTimestamp",
              type: "bool",
            },
            {
              internalType: "bytes32",
              name: "schemaUID",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllEvents",
          outputs: [
            {
              components: [
                {
                  internalType: "uint8",
                  name: "typeOf",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "eventId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "level",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "closingTimestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "attendeeCount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "eventDescription",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "mentorName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "badgeUri",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "mentorAddress",
                  type: "address",
                },
                {
                  internalType: "address[]",
                  name: "attendees",
                  type: "address[]",
                },
                {
                  internalType: "bool",
                  name: "isActive",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "overrideClosingTimestamp",
                  type: "bool",
                },
                {
                  internalType: "bytes32",
                  name: "schemaUID",
                  type: "bytes32",
                },
              ],
              internalType: "struct Structs.Event[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_studentAddress",
              type: "address",
            },
          ],
          name: "getAllStudentEventsWithAttestations",
          outputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "attestation",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "eventId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "level",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "eventName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "eventDescription",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "mentorName",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "mentorAddress",
                  type: "address",
                },
              ],
              internalType: "struct Structs.metaEvent[]",
              name: "",
              type: "tuple[]",
            },
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_level",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "_msgHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "getAttested",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
          ],
          name: "getEthSignedMessageHash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_studentAddress",
              type: "address",
            },
          ],
          name: "getEventsCompleted",
          outputs: [
            {
              internalType: "uint256",
              name: "_studentLevel",
              type: "uint256",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "bytes32[]",
              name: "",
              type: "bytes32[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isMentor",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "isVerified",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_ethSignedMessageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "recoverSigner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "_mentors",
              type: "address[]",
            },
          ],
          name: "removeMentors",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "sig",
              type: "bytes",
            },
          ],
          name: "splitSignature",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "studentEventMap",
          outputs: [
            {
              internalType: "bytes32",
              name: "attestation",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              internalType: "string",
              name: "eventDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "mentorName",
              type: "string",
            },
            {
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_eventId",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "_res",
              type: "bool",
            },
          ],
          name: "toggleOverrideEventFlag",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
