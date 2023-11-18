import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/game.dto';
import { Game } from './entities/game.entity';
import { GameRepository } from './repository/game.repository';
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository) private gameRepo: GameRepository
  ) {}

  async createGame(createGameDto: CreateGameDto) {
    try {
      const userGames = await this.gameRepo.getUserGames(
        createGameDto.discordId
      );
      if (userGames.some((g) => g.isPending)) {
        throw new Error(
          "You already have pening games. Can't play two gams at once!"
        );
      }
      const game: Game = {
        gameId: createGameDto.gameId,
        betAmount: createGameDto.betAmount,
        createdAt: new Date(),
        isPending: true,
        player1: createGameDto.player,
        player1DiscordId: createGameDto.discordId,
        threadId: createGameDto.threadId,
        threadName: createGameDto.threadName,
        player2DiscordId: null,
        player2: null,
        updatedAt: new Date(),
      };

      return await this.gameRepo.save(game);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  getGameForOponen(discordId: string) {
    return this.gameRepo.findOne({
      where: { player1DiscordId: discordId, isPending: true },
    });
  }

  async updateGame(game: Game) {
    return await this.gameRepo.save(game);
  }
}
