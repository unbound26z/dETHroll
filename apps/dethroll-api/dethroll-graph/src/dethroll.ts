import { BigInt } from '@graphprotocol/graph-ts';
import {
  dethroll,
  GameCreated,
  GameJoin,
  GameWon,
  OwnershipTransferred,
  Roll,
} from '../generated/dethroll/dethroll';
import { Player } from '../generated/schema';

export function handleGameCreated(event: GameCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let player = Player.load(event.params.player1);

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!player) {
    player = new Player(event.transaction.from);

    // Entity fields can be set using simple assignments
    player.id = event.params.player1;
    player.address = event.params.player1;
    player.gamesLost = BigInt.fromI32(0);
    player.gamesWon = BigInt.fromI32(0);
    player.gamesPlayed = BigInt.fromI32(0);
  }

  // Entities can be written to the store with `.save()`
  player.save();
}

export function handleGameJoin(event: GameJoin): void {
  let player = Player.load(event.params.player2);

  if (!player) {
    player = new Player(event.params.player2);

    // Entity fields can be set using simple assignments
    player.id = event.params.player2;
    player.address = event.params.player2;
    player.gamesLost = BigInt.fromI32(0);
    player.gamesWon = BigInt.fromI32(0);
    player.gamesPlayed = BigInt.fromI32(0);
  }
}

export function handleGameWon(event: GameWon): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let winner = Player.load(event.params.winner);
  let loser = Player.load(event.params.loser);

  // BigInt and BigDecimal math are supported
  winner!.gamesPlayed = winner!.gamesPlayed.plus(BigInt.fromI32(1));
  loser!.gamesPlayed = loser!.gamesPlayed.plus(BigInt.fromI32(1));

  winner!.gamesWon = winner!.gamesWon.plus(BigInt.fromI32(1));
  loser!.gamesLost = loser!.gamesLost.plus(BigInt.fromI32(1));

  winner!.save();
  loser!.save();
}
