/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../../../common";

export interface IWithdrawalUtilsV0Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "fulfillWithdrawal"
      | "requestWithdrawal"
      | "sponsorToWithdrawalRequestCount"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "FulfilledWithdrawal" | "RequestedWithdrawal"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "fulfillWithdrawal",
    values: [BytesLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestWithdrawal",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sponsorToWithdrawalRequestCount",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "fulfillWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sponsorToWithdrawalRequestCount",
    data: BytesLike
  ): Result;
}

export namespace FulfilledWithdrawalEvent {
  export type InputTuple = [
    airnode: AddressLike,
    sponsor: AddressLike,
    withdrawalRequestId: BytesLike,
    sponsorWallet: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    airnode: string,
    sponsor: string,
    withdrawalRequestId: string,
    sponsorWallet: string,
    amount: bigint
  ];
  export interface OutputObject {
    airnode: string;
    sponsor: string;
    withdrawalRequestId: string;
    sponsorWallet: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RequestedWithdrawalEvent {
  export type InputTuple = [
    airnode: AddressLike,
    sponsor: AddressLike,
    withdrawalRequestId: BytesLike,
    sponsorWallet: AddressLike
  ];
  export type OutputTuple = [
    airnode: string,
    sponsor: string,
    withdrawalRequestId: string,
    sponsorWallet: string
  ];
  export interface OutputObject {
    airnode: string;
    sponsor: string;
    withdrawalRequestId: string;
    sponsorWallet: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IWithdrawalUtilsV0 extends BaseContract {
  connect(runner?: ContractRunner | null): IWithdrawalUtilsV0;
  waitForDeployment(): Promise<this>;

  interface: IWithdrawalUtilsV0Interface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  fulfillWithdrawal: TypedContractMethod<
    [
      withdrawalRequestId: BytesLike,
      airnode: AddressLike,
      sponsor: AddressLike
    ],
    [void],
    "payable"
  >;

  requestWithdrawal: TypedContractMethod<
    [airnode: AddressLike, sponsorWallet: AddressLike],
    [void],
    "nonpayable"
  >;

  sponsorToWithdrawalRequestCount: TypedContractMethod<
    [sponsor: AddressLike],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "fulfillWithdrawal"
  ): TypedContractMethod<
    [
      withdrawalRequestId: BytesLike,
      airnode: AddressLike,
      sponsor: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "requestWithdrawal"
  ): TypedContractMethod<
    [airnode: AddressLike, sponsorWallet: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sponsorToWithdrawalRequestCount"
  ): TypedContractMethod<[sponsor: AddressLike], [bigint], "view">;

  getEvent(
    key: "FulfilledWithdrawal"
  ): TypedContractEvent<
    FulfilledWithdrawalEvent.InputTuple,
    FulfilledWithdrawalEvent.OutputTuple,
    FulfilledWithdrawalEvent.OutputObject
  >;
  getEvent(
    key: "RequestedWithdrawal"
  ): TypedContractEvent<
    RequestedWithdrawalEvent.InputTuple,
    RequestedWithdrawalEvent.OutputTuple,
    RequestedWithdrawalEvent.OutputObject
  >;

  filters: {
    "FulfilledWithdrawal(address,address,bytes32,address,uint256)": TypedContractEvent<
      FulfilledWithdrawalEvent.InputTuple,
      FulfilledWithdrawalEvent.OutputTuple,
      FulfilledWithdrawalEvent.OutputObject
    >;
    FulfilledWithdrawal: TypedContractEvent<
      FulfilledWithdrawalEvent.InputTuple,
      FulfilledWithdrawalEvent.OutputTuple,
      FulfilledWithdrawalEvent.OutputObject
    >;

    "RequestedWithdrawal(address,address,bytes32,address)": TypedContractEvent<
      RequestedWithdrawalEvent.InputTuple,
      RequestedWithdrawalEvent.OutputTuple,
      RequestedWithdrawalEvent.OutputObject
    >;
    RequestedWithdrawal: TypedContractEvent<
      RequestedWithdrawalEvent.InputTuple,
      RequestedWithdrawalEvent.OutputTuple,
      RequestedWithdrawalEvent.OutputObject
    >;
  };
}