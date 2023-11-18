import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  DETHRoll,
  DETHRollMethodNames,
  DETHRollEventsContext,
  DETHRollEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type DETHRollEvents =
  | 'GameCreated'
  | 'GameJoin'
  | 'GameWon'
  | 'OwnershipTransferred'
  | 'Roll';
export interface DETHRollEventsContext {
  GameCreated(...parameters: any): EventFilter;
  GameJoin(...parameters: any): EventFilter;
  GameWon(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  Roll(...parameters: any): EventFilter;
}
export type DETHRollMethodNames =
  | 'new'
  | '_qrngUint256'
  | 'airnode'
  | 'airnodeRrp'
  | 'depositErc20'
  | 'endpointIdUint256'
  | 'expectingRequestWithIdToBeFulfilled'
  | 'fulfillUint256'
  | 'getGame'
  | 'getMinePendingGame'
  | 'getPlayer'
  | 'getUserBalance'
  | 'initGame'
  | 'joinGame'
  | 'owner'
  | 'register'
  | 'renounceOwnership'
  | 'roll'
  | 'setParameters'
  | 'sponsorWallet'
  | 'terminatePendingGame'
  | 'transferOwnership'
  | 'verifyMessage';
export interface GameCreatedEventEmittedResponse {
  amount: BigNumberish;
  player1: string;
}
export interface GameJoinEventEmittedResponse {
  gameId: string;
  amount: BigNumberish;
  player2: string;
  player1: string;
}
export interface GameWonEventEmittedResponse {
  gameId: string;
  winner: string;
  loser: string;
  wonAmount: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RollEventEmittedResponse {
  gameId: string;
  player: string;
  rolledNumber: BigNumberish;
}
export interface GameResponse {
  player1: string;
  0: string;
  player2: string;
  1: string;
  startTimestamp: BigNumber;
  2: BigNumber;
  lastRandomNumber: BigNumber;
  3: BigNumber;
  betAmount: BigNumber;
  4: BigNumber;
  lastPlayer1: boolean;
  5: boolean;
  rollsCount: BigNumber;
  6: BigNumber;
  winner: string;
  7: string;
}
export interface PlayerResponse {
  discord: string;
  0: string;
  sigWallet: string;
  1: string;
}
export interface DETHRoll {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _airnodeRrp Type: address, Indexed: false
   */
  'new'(
    _airnodeRrp: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _qrngUint256(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  airnode(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  airnodeRrp(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  depositErc20(
    token: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  endpointIdUint256(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  expectingRequestWithIdToBeFulfilled(
    parameter0: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestId Type: bytes32, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  fulfillUint256(
    requestId: Arrayish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param gameId Type: string, Indexed: false
   */
  getGame(
    gameId: string,
    overrides?: ContractCallOverrides
  ): Promise<GameResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param player Type: address, Indexed: false
   */
  getMinePendingGame(
    player: string,
    overrides?: ContractCallOverrides
  ): Promise<GameResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param player Type: address, Indexed: false
   */
  getPlayer(
    player: string,
    overrides?: ContractCallOverrides
  ): Promise<PlayerResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  getUserBalance(
    user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _betAmount Type: uint256, Indexed: false
   * @param _hashedMessage Type: bytes32, Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  initGame(
    _betAmount: BigNumberish,
    _hashedMessage: Arrayish,
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gameId Type: string, Indexed: false
   * @param oponent Type: address, Indexed: false
   * @param _hashedMessage Type: bytes32, Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  joinGame(
    gameId: string,
    oponent: string,
    _hashedMessage: Arrayish,
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _mainWallet Type: address, Indexed: false
   * @param _discord Type: string, Indexed: false
   * @param _sigWallet Type: address, Indexed: false
   */
  register(
    _mainWallet: string,
    _discord: string,
    _sigWallet: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gameId Type: string, Indexed: false
   * @param _hashedMessage Type: bytes32, Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  roll(
    gameId: string,
    _hashedMessage: Arrayish,
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _airnode Type: address, Indexed: false
   * @param _endpointIdUint256 Type: bytes32, Indexed: false
   * @param _sponsorWallet Type: address, Indexed: false
   */
  setParameters(
    _airnode: string,
    _endpointIdUint256: Arrayish,
    _sponsorWallet: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  sponsorWallet(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _hashedMessage Type: bytes32, Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  terminatePendingGame(
    _hashedMessage: Arrayish,
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param _hashedMessage Type: bytes32, Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  verifyMessage(
    _hashedMessage: Arrayish,
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
}
