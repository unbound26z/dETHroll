import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  GameCreated,
  GameJoin,
  GameWon,
  OwnershipTransferred,
  Roll
} from "../generated/dethroll/dethroll"

export function createGameCreatedEvent(
  amount: BigInt,
  player1: Address
): GameCreated {
  let gameCreatedEvent = changetype<GameCreated>(newMockEvent())

  gameCreatedEvent.parameters = new Array()

  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("player1", ethereum.Value.fromAddress(player1))
  )

  return gameCreatedEvent
}

export function createGameJoinEvent(
  gameId: Bytes,
  amount: BigInt,
  player2: Address,
  player1: Address
): GameJoin {
  let gameJoinEvent = changetype<GameJoin>(newMockEvent())

  gameJoinEvent.parameters = new Array()

  gameJoinEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  gameJoinEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  gameJoinEvent.parameters.push(
    new ethereum.EventParam("player2", ethereum.Value.fromAddress(player2))
  )
  gameJoinEvent.parameters.push(
    new ethereum.EventParam("player1", ethereum.Value.fromAddress(player1))
  )

  return gameJoinEvent
}

export function createGameWonEvent(
  gameId: Bytes,
  winner: Address,
  loser: Address,
  wonAmount: BigInt
): GameWon {
  let gameWonEvent = changetype<GameWon>(newMockEvent())

  gameWonEvent.parameters = new Array()

  gameWonEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  gameWonEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  gameWonEvent.parameters.push(
    new ethereum.EventParam("loser", ethereum.Value.fromAddress(loser))
  )
  gameWonEvent.parameters.push(
    new ethereum.EventParam(
      "wonAmount",
      ethereum.Value.fromUnsignedBigInt(wonAmount)
    )
  )

  return gameWonEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRollEvent(
  gameId: Bytes,
  player: Address,
  rolledNumber: BigInt
): Roll {
  let rollEvent = changetype<Roll>(newMockEvent())

  rollEvent.parameters = new Array()

  rollEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  rollEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  rollEvent.parameters.push(
    new ethereum.EventParam(
      "rolledNumber",
      ethereum.Value.fromUnsignedBigInt(rolledNumber)
    )
  )

  return rollEvent
}
