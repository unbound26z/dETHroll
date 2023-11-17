/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { DETH, DETHInterface } from "../../contracts/DETH";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_airnodeRrp",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "_qrngUint256",
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
    inputs: [],
    name: "airnode",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "airnodeRrp",
    outputs: [
      {
        internalType: "contract IAirnodeRrpV0",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositErc20",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endpointIdUint256",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "expectingRequestWithIdToBeFulfilled",
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
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "fulfillUint256",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getMinePendingGame",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "player1",
            type: "address",
          },
          {
            internalType: "address",
            name: "player2",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastRandomNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "betAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "lastPlayer1",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rollsCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "winner",
            type: "address",
          },
        ],
        internalType: "struct dETH.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "initGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oponent",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mainWallet",
        type: "address",
      },
      {
        internalType: "string",
        name: "_discord",
        type: "string",
      },
      {
        internalType: "address",
        name: "_sigWallet",
        type: "address",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "roll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_endpointIdUint256",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_sponsorWallet",
        type: "address",
      },
    ],
    name: "setParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sponsorWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "verifyMessage",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620036b2380380620036b283398181016040528101906200003791906200027d565b808073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1663addf027c3060016040518363ffffffff1660e01b8152600401620000aa929190620002dd565b600060405180830381600087803b158015620000c557600080fd5b505af1158015620000da573d6000803e3d6000fd5b5050505050620000ff620000f36200014760201b60201c565b6200014f60201b60201c565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200030a565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002458262000218565b9050919050565b620002578162000238565b81146200026357600080fd5b50565b60008151905062000277816200024c565b92915050565b60006020828403121562000296576200029562000213565b5b6000620002a68482850162000266565b91505092915050565b620002ba8162000238565b82525050565b60008115159050919050565b620002d781620002c0565b82525050565b6000604082019050620002f46000830185620002af565b620003036020830184620002cc565b9392505050565b60805161337e62000334600039600081816104ce01528181610b8b0152611e2f015261337e6000f3fe60806040526004361061010d5760003560e01c8063851244f711610095578063bf90fb4e11610064578063bf90fb4e146103da578063ceb7259214610405578063d3cf32df1461042e578063f2fde38b1461046b578063fda6482014610494576101ad565b8063851244f71461031e5780638da5cb5b1461035b57806397294e5814610386578063a36ff4d8146103af576101ad565b80636ec3c393116100dc5780636ec3c3931461024b578063715018a61461027657806371bab6661461028d57806376a68263146102b857806381dd33b5146102e1576101ad565b806307b9fc57146101b25780633718d90a146101dd5780636548b40d14610206578063661ddef014610222576101ad565b366101ad57600061011c6104bd565b905080600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546101699190612013565b600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055005b600080fd5b3480156101be57600080fd5b506101c76104c6565b6040516101d49190612060565b60405180910390f35b3480156101e957600080fd5b5061020460048036038101906101ff9190612120565b6104cc565b005b610220600480360381019061021b919061220a565b610606565b005b34801561022e57600080fd5b5061024960048036038101906102449190612283565b61072c565b005b34801561025757600080fd5b50610260610afb565b60405161026d919061230d565b60405180910390f35b34801561028257600080fd5b5061028b610b01565b005b34801561029957600080fd5b506102a2610b89565b6040516102af9190612387565b60405180910390f35b3480156102c457600080fd5b506102df60048036038101906102da91906123a2565b610bad565b005b3480156102ed57600080fd5b50610308600480360381019061030391906123f5565b610cb7565b60405161031591906124fd565b60405180910390f35b34801561032a57600080fd5b5061034560048036038101906103409190612519565b610e56565b6040516103529190612555565b60405180910390f35b34801561036757600080fd5b50610370610e76565b60405161037d919061257f565b60405180910390f35b34801561039257600080fd5b506103ad60048036038101906103a891906126db565b610e9f565b005b3480156103bb57600080fd5b506103c46110bb565b6040516103d1919061257f565b60405180910390f35b3480156103e657600080fd5b506103ef6110e1565b6040516103fc919061257f565b60405180910390f35b34801561041157600080fd5b5061042c6004803603810190610427919061274a565b611107565b005b34801561043a57600080fd5b50610455600480360381019061045091906127c5565b6115e9565b604051610462919061257f565b60405180910390f35b34801561047757600080fd5b50610492600480360381019061048d91906123f5565b6116b2565b005b3480156104a057600080fd5b506104bb60048036038101906104b6919061282c565b6117a9565b005b6000600a905090565b60045481565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461055a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055190612904565b60405180910390fd5b6008600084815260200190815260200160002060009054906101000a900460ff166105ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b190612970565b60405180910390fd5b60006008600085815260200190815260200160002060006101000a81548160ff021916908315150217905550600082828101906105f79190612990565b90508060078190555050505050565b60008290508073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b8152600401610648939291906129bd565b6020604051808303816000875af1158015610667573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068b9190612a20565b5060006106966104bd565b905080600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546106e39190612013565b600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050505050565b600061073a858585856115e9565b90506000610746611ccc565b905081816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050868160800181815250506000600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806101000160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff16151515158152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff1614610991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098890612a99565b60405180910390fd5b81600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c0820151816006015560e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505050505050505050565b60065481565b610b09611d5f565b73ffffffffffffffffffffffffffffffffffffffff16610b27610e76565b73ffffffffffffffffffffffffffffffffffffffff1614610b7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7490612b05565b60405180910390fd5b610b876000611d67565b565b7f000000000000000000000000000000000000000000000000000000000000000081565b610bb5611d5f565b73ffffffffffffffffffffffffffffffffffffffff16610bd3610e76565b73ffffffffffffffffffffffffffffffffffffffff1614610c29576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2090612b05565b60405180910390fd5b82600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160048190555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b610cbf611f51565b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806101000160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff16151515158152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b60086020528060005260406000206000915054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610ea7611d5f565b73ffffffffffffffffffffffffffffffffffffffff16610ec5610e76565b73ffffffffffffffffffffffffffffffffffffffff1614610f1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f1290612b05565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610fec576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe390612b71565b60405180910390fd5b60405180604001604052808381526020018273ffffffffffffffffffffffffffffffffffffffff16815250600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001908161106b9190612d9e565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000611115858585856115e9565b90506000600a6000888152602001908152602001600020604051806101000160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff16151515158152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050600073ffffffffffffffffffffffffffffffffffffffff168160e0015173ffffffffffffffffffffffffffffffffffffffff16146112f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e990612ebc565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16141580156113645750600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614155b6113a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139a90612f28565b60405180910390fd5b8060a001511561145357806020015173ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461141f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141690612f94565b60405180910390fd5b6000600a600089815260200190815260200160002060050160006101000a81548160ff0219169083151502179055506114f5565b806000015173ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146114c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bc90612f94565b60405180910390fd5b6001600a600089815260200190815260200160002060050160006101000a81548160ff0219169083151502179055505b6114fd611e2b565b600080826060015114611514578160600151611517565b60645b9050600060018260075461152b9190612fe3565b6115359190612013565b905080600a60008b8152602001908152602001600020600301819055506001600a60008b815260200190815260200160002060060160008282546115799190612013565b92505081905550600181036115de5783600a60008b815260200190815260200160002060070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505050505050505050565b6000806040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600081876040516020016116399291906130a6565b60405160208183030381529060405280519060200120905060006001828888886040516000815260200160405260405161167694939291906130dd565b6020604051602081039080840390855afa158015611698573d6000803e3d6000fd5b505050602060405103519050809350505050949350505050565b6116ba611d5f565b73ffffffffffffffffffffffffffffffffffffffff166116d8610e76565b73ffffffffffffffffffffffffffffffffffffffff161461172e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161172590612b05565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361179d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161179490613194565b60405180910390fd5b6117a681611d67565b50565b60006117b7858585856115e9565b90506000600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806101000160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff16151515158152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16036119c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119b790613200565b60405180910390fd5b60008783426040516020016119d7939291906129bd565b60405160208183030381529060405280519060200120905082826020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050611a2f611ccc565b600960008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c0820151816006015560e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505081600a600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c0820151816006015560e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505050505050505050565b611cd4611f51565b604051806101000160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200160001515815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815250905090565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636e6be03f600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660045430600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1630633718d90a60e01b6040518763ffffffff1660e01b8152600401611edd96959493929190613292565b6020604051808303816000875af1158015611efc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f20919061331b565b905060016008600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b604051806101000160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200160001515815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061201e82611fda565b915061202983611fda565b925082820190508082111561204157612040611fe4565b5b92915050565b6000819050919050565b61205a81612047565b82525050565b60006020820190506120756000830184612051565b92915050565b6000604051905090565b600080fd5b600080fd5b61209881612047565b81146120a357600080fd5b50565b6000813590506120b58161208f565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126120e0576120df6120bb565b5b8235905067ffffffffffffffff8111156120fd576120fc6120c0565b5b602083019150836001820283011115612119576121186120c5565b5b9250929050565b60008060006040848603121561213957612138612085565b5b6000612147868287016120a6565b935050602084013567ffffffffffffffff8111156121685761216761208a565b5b612174868287016120ca565b92509250509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006121ab82612180565b9050919050565b6121bb816121a0565b81146121c657600080fd5b50565b6000813590506121d8816121b2565b92915050565b6121e781611fda565b81146121f257600080fd5b50565b600081359050612204816121de565b92915050565b6000806040838503121561222157612220612085565b5b600061222f858286016121c9565b9250506020612240858286016121f5565b9150509250929050565b600060ff82169050919050565b6122608161224a565b811461226b57600080fd5b50565b60008135905061227d81612257565b92915050565b600080600080600060a0868803121561229f5761229e612085565b5b60006122ad888289016121f5565b95505060206122be888289016120a6565b94505060406122cf8882890161226e565b93505060606122e0888289016120a6565b92505060806122f1888289016120a6565b9150509295509295909350565b61230781611fda565b82525050565b600060208201905061232260008301846122fe565b92915050565b6000819050919050565b600061234d61234861234384612180565b612328565b612180565b9050919050565b600061235f82612332565b9050919050565b600061237182612354565b9050919050565b61238181612366565b82525050565b600060208201905061239c6000830184612378565b92915050565b6000806000606084860312156123bb576123ba612085565b5b60006123c9868287016121c9565b93505060206123da868287016120a6565b92505060406123eb868287016121c9565b9150509250925092565b60006020828403121561240b5761240a612085565b5b6000612419848285016121c9565b91505092915050565b61242b816121a0565b82525050565b61243a81611fda565b82525050565b60008115159050919050565b61245581612440565b82525050565b610100820160008201516124726000850182612422565b5060208201516124856020850182612422565b5060408201516124986040850182612431565b5060608201516124ab6060850182612431565b5060808201516124be6080850182612431565b5060a08201516124d160a085018261244c565b5060c08201516124e460c0850182612431565b5060e08201516124f760e0850182612422565b50505050565b600061010082019050612513600083018461245b565b92915050565b60006020828403121561252f5761252e612085565b5b600061253d848285016120a6565b91505092915050565b61254f81612440565b82525050565b600060208201905061256a6000830184612546565b92915050565b612579816121a0565b82525050565b60006020820190506125946000830184612570565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6125e88261259f565b810181811067ffffffffffffffff82111715612607576126066125b0565b5b80604052505050565b600061261a61207b565b905061262682826125df565b919050565b600067ffffffffffffffff821115612646576126456125b0565b5b61264f8261259f565b9050602081019050919050565b82818337600083830152505050565b600061267e6126798461262b565b612610565b90508281526020810184848401111561269a5761269961259a565b5b6126a584828561265c565b509392505050565b600082601f8301126126c2576126c16120bb565b5b81356126d284826020860161266b565b91505092915050565b6000806000606084860312156126f4576126f3612085565b5b6000612702868287016121c9565b935050602084013567ffffffffffffffff8111156127235761272261208a565b5b61272f868287016126ad565b9250506040612740868287016121c9565b9150509250925092565b600080600080600060a0868803121561276657612765612085565b5b6000612774888289016120a6565b9550506020612785888289016120a6565b94505060406127968882890161226e565b93505060606127a7888289016120a6565b92505060806127b8888289016120a6565b9150509295509295909350565b600080600080608085870312156127df576127de612085565b5b60006127ed878288016120a6565b94505060206127fe8782880161226e565b935050604061280f878288016120a6565b9250506060612820878288016120a6565b91505092959194509250565b600080600080600060a0868803121561284857612847612085565b5b6000612856888289016121c9565b9550506020612867888289016120a6565b94505060406128788882890161226e565b9350506060612889888289016120a6565b925050608061289a888289016120a6565b9150509295509295909350565b600082825260208201905092915050565b7f43616c6c6572206e6f74204169726e6f64652052525000000000000000000000600082015250565b60006128ee6016836128a7565b91506128f9826128b8565b602082019050919050565b6000602082019050818103600083015261291d816128e1565b9050919050565b7f52657175657374204944206e6f74206b6e6f776e000000000000000000000000600082015250565b600061295a6014836128a7565b915061296582612924565b602082019050919050565b600060208201905081810360008301526129898161294d565b9050919050565b6000602082840312156129a6576129a5612085565b5b60006129b4848285016121f5565b91505092915050565b60006060820190506129d26000830186612570565b6129df6020830185612570565b6129ec60408301846122fe565b949350505050565b6129fd81612440565b8114612a0857600080fd5b50565b600081519050612a1a816129f4565b92915050565b600060208284031215612a3657612a35612085565b5b6000612a4484828501612a0b565b91505092915050565b7f596f7520616c726561647920686176652070656e64696e672067616d65210000600082015250565b6000612a83601e836128a7565b9150612a8e82612a4d565b602082019050919050565b60006020820190508181036000830152612ab281612a76565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612aef6020836128a7565b9150612afa82612ab9565b602082019050919050565b60006020820190508181036000830152612b1e81612ae2565b9050919050565b7f506c6179657220616c7265616479207265676973746572656400000000000000600082015250565b6000612b5b6019836128a7565b9150612b6682612b25565b602082019050919050565b60006020820190508181036000830152612b8a81612b4e565b9050919050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680612be357607f821691505b602082108103612bf657612bf5612b9c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612c5e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612c21565b612c688683612c21565b95508019841693508086168417925050509392505050565b6000612c9b612c96612c9184611fda565b612328565b611fda565b9050919050565b6000819050919050565b612cb583612c80565b612cc9612cc182612ca2565b848454612c2e565b825550505050565b600090565b612cde612cd1565b612ce9818484612cac565b505050565b5b81811015612d0d57612d02600082612cd6565b600181019050612cef565b5050565b601f821115612d5257612d2381612bfc565b612d2c84612c11565b81016020851015612d3b578190505b612d4f612d4785612c11565b830182612cee565b50505b505050565b600082821c905092915050565b6000612d7560001984600802612d57565b1980831691505092915050565b6000612d8e8383612d64565b9150826002028217905092915050565b612da782612b91565b67ffffffffffffffff811115612dc057612dbf6125b0565b5b612dca8254612bcb565b612dd5828285612d11565b600060209050601f831160018114612e085760008415612df6578287015190505b612e008582612d82565b865550612e68565b601f198416612e1686612bfc565b60005b82811015612e3e57848901518255600182019150602085019450602081019050612e19565b86831015612e5b5784890151612e57601f891682612d64565b8355505b6001600288020188555050505b505050505050565b7f47616d6520616c7265616479207265736f6c7665640000000000000000000000600082015250565b6000612ea66015836128a7565b9150612eb182612e70565b602082019050919050565b60006020820190508181036000830152612ed581612e99565b9050919050565b7f496e76616c69642067616d6520636f6e66696721000000000000000000000000600082015250565b6000612f126014836128a7565b9150612f1d82612edc565b602082019050919050565b60006020820190508181036000830152612f4181612f05565b9050919050565b7f43616e277420726f6c6c20747769636520696e20726f77000000000000000000600082015250565b6000612f7e6017836128a7565b9150612f8982612f48565b602082019050919050565b60006020820190508181036000830152612fad81612f71565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612fee82611fda565b9150612ff983611fda565b92508261300957613008612fb4565b5b828206905092915050565b600081519050919050565b600081905092915050565b60005b8381101561304857808201518184015260208101905061302d565b60008484015250505050565b600061305f82613014565b613069818561301f565b935061307981856020860161302a565b80840191505092915050565b6000819050919050565b6130a061309b82612047565b613085565b82525050565b60006130b28285613054565b91506130be828461308f565b6020820191508190509392505050565b6130d78161224a565b82525050565b60006080820190506130f26000830187612051565b6130ff60208301866130ce565b61310c6040830185612051565b6131196060830184612051565b95945050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061317e6026836128a7565b915061318982613122565b604082019050919050565b600060208201905081810360008301526131ad81613171565b9050919050565b7f436f756c64206e6f742066696e642070656e64696e672067616d652100000000600082015250565b60006131ea601c836128a7565b91506131f5826131b4565b602082019050919050565b60006020820190508181036000830152613219816131dd565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61325581613220565b82525050565b600082825260208201905092915050565b50565b600061327c60008361325b565b91506132878261326c565b600082019050919050565b600060e0820190506132a76000830189612570565b6132b46020830188612051565b6132c16040830187612570565b6132ce6060830186612570565b6132db6080830185612570565b6132e860a083018461324c565b81810360c08301526132f98161326f565b9050979650505050505050565b6000815190506133158161208f565b92915050565b60006020828403121561333157613330612085565b5b600061333f84828501613306565b9150509291505056fea26469706673582212205fa43e70068df01ecdfc73d877b110218728a28a011bb8694d505d8dd8bee8d164736f6c63430008130033";

type DETHConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DETHConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DETH__factory extends ContractFactory {
  constructor(...args: DETHConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _airnodeRrp: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_airnodeRrp, overrides || {});
  }
  override deploy(
    _airnodeRrp: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_airnodeRrp, overrides || {}) as Promise<
      DETH & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): DETH__factory {
    return super.connect(runner) as DETH__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DETHInterface {
    return new Interface(_abi) as DETHInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): DETH {
    return new Contract(address, _abi, runner) as unknown as DETH;
  }
}
