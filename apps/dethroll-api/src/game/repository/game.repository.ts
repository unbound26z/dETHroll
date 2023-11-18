import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(private dataSource: DataSource) {
    super(Game, dataSource.createEntityManager());
  }

  getUserGames(userDiscordId: string) {
    return this.find({ where: { player1DiscordId: userDiscordId } });
  }

  storeGame(game: Game) {
    return this.save(game);
  }
}
