/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAirnodeRrpV0,
  IAirnodeRrpV0Interface,
} from "../../../../../../@api3/airnode-protocol/contracts/rrp/interfaces/IAirnodeRrpV0";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "CreatedTemplate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "FailedRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "FulfilledRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "withdrawalRequestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FulfilledWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requesterRequestCount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "MadeFullRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requesterRequestCount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "MadeTemplateRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "withdrawalRequestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
    ],
    name: "RequestedWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sponsorshipStatus",
        type: "bool",
      },
    ],
    name: "SetSponsorshipStatus",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authorizers",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "checkAuthorizationStatus",
    outputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "authorizers",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "requestIds",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "endpointIds",
        type: "bytes32[]",
      },
      {
        internalType: "address[]",
        name: "sponsors",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "requesters",
        type: "address[]",
      },
    ],
    name: "checkAuthorizationStatuses",
    outputs: [
      {
        internalType: "bool[]",
        name: "statuses",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "createTemplate",
    outputs: [
      {
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "fail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "fulfill",
    outputs: [
      {
        internalType: "bool",
        name: "callSuccess",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "withdrawalRequestId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
    ],
    name: "fulfillWithdrawal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "templateIds",
        type: "bytes32[]",
      },
    ],
    name: "getTemplates",
    outputs: [
      {
        internalType: "address[]",
        name: "airnodes",
        type: "address[]",
      },
      {
        internalType: "bytes32[]",
        name: "endpointIds",
        type: "bytes32[]",
      },
      {
        internalType: "bytes[]",
        name: "parameters",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "makeFullRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "fulfillAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "fulfillFunctionId",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    name: "makeTemplateRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "requestIsAwaitingFulfillment",
    outputs: [
      {
        internalType: "bool",
        name: "isAwaitingFulfillment",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
    ],
    name: "requestWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "requesterToRequestCountPlusOne",
    outputs: [
      {
        internalType: "uint256",
        name: "requestCountPlusOne",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        internalType: "bool",
        name: "sponsorshipStatus",
        type: "bool",
      },
    ],
    name: "setSponsorshipStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "sponsorToRequesterToSponsorshipStatus",
    outputs: [
      {
        internalType: "bool",
        name: "sponsorshipStatus",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
    ],
    name: "sponsorToWithdrawalRequestCount",
    outputs: [
      {
        internalType: "uint256",
        name: "withdrawalRequestCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
    ],
    name: "templates",
    outputs: [
      {
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "endpointId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "parameters",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAirnodeRrpV0__factory {
  static readonly abi = _abi;
  static createInterface(): IAirnodeRrpV0Interface {
    return new Interface(_abi) as IAirnodeRrpV0Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAirnodeRrpV0 {
    return new Contract(address, _abi, runner) as unknown as IAirnodeRrpV0;
  }
}
