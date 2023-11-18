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
} from "../common";

export declare namespace DETH {
  export type GameStruct = {
    player1: AddressLike;
    player2: AddressLike;
    startTimestamp: BigNumberish;
    lastRandomNumber: BigNumberish;
    betAmount: BigNumberish;
    lastPlayer1: boolean;
    rollsCount: BigNumberish;
    winner: AddressLike;
  };

  export type GameStructOutput = [
    player1: string,
    player2: string,
    startTimestamp: bigint,
    lastRandomNumber: bigint,
    betAmount: bigint,
    lastPlayer1: boolean,
    rollsCount: bigint,
    winner: string
  ] & {
    player1: string;
    player2: string;
    startTimestamp: bigint;
    lastRandomNumber: bigint;
    betAmount: bigint;
    lastPlayer1: boolean;
    rollsCount: bigint;
    winner: string;
  };
}

export interface DETHInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "_qrngUint256"
      | "airnode"
      | "airnodeRrp"
      | "depositErc20"
      | "endpointIdUint256"
      | "expectingRequestWithIdToBeFulfilled"
      | "fulfillUint256"
      | "getMinePendingGame"
      | "initGame"
      | "joinGame"
      | "owner"
      | "register"
      | "renounceOwnership"
      | "roll"
      | "setParameters"
      | "sponsorWallet"
      | "terminatePendingGame"
      | "transferOwnership"
      | "verifyMessage"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "GameCreated"
      | "GameJoin"
      | "GameWon"
      | "OwnershipTransferred"
      | "Roll"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "_qrngUint256",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "airnode", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "airnodeRrp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositErc20",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endpointIdUint256",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expectingRequestWithIdToBeFulfilled",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fulfillUint256",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMinePendingGame",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initGame",
    values: [BigNumberish, BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "joinGame",
    values: [AddressLike, BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [AddressLike, string, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "roll",
    values: [BytesLike, BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setParameters",
    values: [AddressLike, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sponsorWallet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "terminatePendingGame",
    values: [BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyMessage",
    values: [BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "_qrngUint256",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "airnode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "airnodeRrp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositErc20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endpointIdUint256",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expectingRequestWithIdToBeFulfilled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fulfillUint256",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinePendingGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "joinGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "roll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sponsorWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "terminatePendingGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyMessage",
    data: BytesLike
  ): Result;
}

export namespace GameCreatedEvent {
  export type InputTuple = [amount: BigNumberish, player1: AddressLike];
  export type OutputTuple = [amount: bigint, player1: string];
  export interface OutputObject {
    amount: bigint;
    player1: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameJoinEvent {
  export type InputTuple = [
    gameId: BytesLike,
    amount: BigNumberish,
    player2: AddressLike,
    player1: AddressLike
  ];
  export type OutputTuple = [
    gameId: string,
    amount: bigint,
    player2: string,
    player1: string
  ];
  export interface OutputObject {
    gameId: string;
    amount: bigint;
    player2: string;
    player1: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameWonEvent {
  export type InputTuple = [
    gameId: BytesLike,
    winner: AddressLike,
    loser: AddressLike,
    wonAmount: BigNumberish
  ];
  export type OutputTuple = [
    gameId: string,
    winner: string,
    loser: string,
    wonAmount: bigint
  ];
  export interface OutputObject {
    gameId: string;
    winner: string;
    loser: string;
    wonAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RollEvent {
  export type InputTuple = [
    gameId: BytesLike,
    player: AddressLike,
    rolledNumber: BigNumberish
  ];
  export type OutputTuple = [
    gameId: string,
    player: string,
    rolledNumber: bigint
  ];
  export interface OutputObject {
    gameId: string;
    player: string;
    rolledNumber: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface DETH extends BaseContract {
  connect(runner?: ContractRunner | null): DETH;
  waitForDeployment(): Promise<this>;

  interface: DETHInterface;

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

  _qrngUint256: TypedContractMethod<[], [bigint], "view">;

  airnode: TypedContractMethod<[], [string], "view">;

  airnodeRrp: TypedContractMethod<[], [string], "view">;

  depositErc20: TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "payable"
  >;

  endpointIdUint256: TypedContractMethod<[], [string], "view">;

  expectingRequestWithIdToBeFulfilled: TypedContractMethod<
    [arg0: BytesLike],
    [boolean],
    "view"
  >;

  fulfillUint256: TypedContractMethod<
    [requestId: BytesLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  getMinePendingGame: TypedContractMethod<
    [player: AddressLike],
    [DETH.GameStructOutput],
    "view"
  >;

  initGame: TypedContractMethod<
    [
      _betAmount: BigNumberish,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  joinGame: TypedContractMethod<
    [
      oponent: AddressLike,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  register: TypedContractMethod<
    [_mainWallet: AddressLike, _discord: string, _sigWallet: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  roll: TypedContractMethod<
    [
      gameId: BytesLike,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setParameters: TypedContractMethod<
    [
      _airnode: AddressLike,
      _endpointIdUint256: BytesLike,
      _sponsorWallet: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  sponsorWallet: TypedContractMethod<[], [string], "view">;

  terminatePendingGame: TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  verifyMessage: TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "_qrngUint256"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "airnode"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "airnodeRrp"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "depositErc20"
  ): TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "endpointIdUint256"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "expectingRequestWithIdToBeFulfilled"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "fulfillUint256"
  ): TypedContractMethod<
    [requestId: BytesLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getMinePendingGame"
  ): TypedContractMethod<
    [player: AddressLike],
    [DETH.GameStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "initGame"
  ): TypedContractMethod<
    [
      _betAmount: BigNumberish,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "joinGame"
  ): TypedContractMethod<
    [
      oponent: AddressLike,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "register"
  ): TypedContractMethod<
    [_mainWallet: AddressLike, _discord: string, _sigWallet: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "roll"
  ): TypedContractMethod<
    [
      gameId: BytesLike,
      _hashedMessage: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setParameters"
  ): TypedContractMethod<
    [
      _airnode: AddressLike,
      _endpointIdUint256: BytesLike,
      _sponsorWallet: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sponsorWallet"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "terminatePendingGame"
  ): TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifyMessage"
  ): TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [string],
    "view"
  >;

  getEvent(
    key: "GameCreated"
  ): TypedContractEvent<
    GameCreatedEvent.InputTuple,
    GameCreatedEvent.OutputTuple,
    GameCreatedEvent.OutputObject
  >;
  getEvent(
    key: "GameJoin"
  ): TypedContractEvent<
    GameJoinEvent.InputTuple,
    GameJoinEvent.OutputTuple,
    GameJoinEvent.OutputObject
  >;
  getEvent(
    key: "GameWon"
  ): TypedContractEvent<
    GameWonEvent.InputTuple,
    GameWonEvent.OutputTuple,
    GameWonEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Roll"
  ): TypedContractEvent<
    RollEvent.InputTuple,
    RollEvent.OutputTuple,
    RollEvent.OutputObject
  >;

  filters: {
    "GameCreated(uint256,address)": TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;
    GameCreated: TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;

    "GameJoin(bytes32,uint256,address,address)": TypedContractEvent<
      GameJoinEvent.InputTuple,
      GameJoinEvent.OutputTuple,
      GameJoinEvent.OutputObject
    >;
    GameJoin: TypedContractEvent<
      GameJoinEvent.InputTuple,
      GameJoinEvent.OutputTuple,
      GameJoinEvent.OutputObject
    >;

    "GameWon(bytes32,address,address,uint256)": TypedContractEvent<
      GameWonEvent.InputTuple,
      GameWonEvent.OutputTuple,
      GameWonEvent.OutputObject
    >;
    GameWon: TypedContractEvent<
      GameWonEvent.InputTuple,
      GameWonEvent.OutputTuple,
      GameWonEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Roll(bytes32,address,uint256)": TypedContractEvent<
      RollEvent.InputTuple,
      RollEvent.OutputTuple,
      RollEvent.OutputObject
    >;
    Roll: TypedContractEvent<
      RollEvent.InputTuple,
      RollEvent.OutputTuple,
      RollEvent.OutputObject
    >;
  };
}
