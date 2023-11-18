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
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  RrpRequesterV0,
  RrpRequesterV0Interface,
} from "../../../../../../@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0";

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
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516103043803806103048339818101604052810190610032919061013d565b8073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1663addf027c3060016040518363ffffffff1660e01b81526004016100a2929190610194565b600060405180830381600087803b1580156100bc57600080fd5b505af11580156100d0573d6000803e3d6000fd5b50505050506101bd565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061010a826100df565b9050919050565b61011a816100ff565b811461012557600080fd5b50565b60008151905061013781610111565b92915050565b600060208284031215610153576101526100da565b5b600061016184828501610128565b91505092915050565b610173816100ff565b82525050565b60008115159050919050565b61018e81610179565b82525050565b60006040820190506101a9600083018561016a565b6101b66020830184610185565b9392505050565b60805161012d6101d760003960006049015261012d6000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806371bab66614602d575b600080fd5b60336047565b604051603e919060de565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060aa60a660a284606b565b608b565b606b565b9050919050565b600060ba826095565b9050919050565b600060ca8260b1565b9050919050565b60d88160c1565b82525050565b600060208201905060f1600083018460d1565b9291505056fea2646970667358221220c339f91591ca0cdfbf9bebf83fd219abb958ec2985b7940865dc91ba7515806164736f6c63430008130033";

type RrpRequesterV0ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RrpRequesterV0ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RrpRequesterV0__factory extends ContractFactory {
  constructor(...args: RrpRequesterV0ConstructorParams) {
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
      RrpRequesterV0 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RrpRequesterV0__factory {
    return super.connect(runner) as RrpRequesterV0__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RrpRequesterV0Interface {
    return new Interface(_abi) as RrpRequesterV0Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RrpRequesterV0 {
    return new Contract(address, _abi, runner) as unknown as RrpRequesterV0;
  }
}
