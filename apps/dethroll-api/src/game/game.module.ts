import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameRepository } from './repository/game.repository';

@Module({
  providers: [GameService, GameRepository],
  controllers: [],
  imports: [],
  exports: [GameService],
})
export class GameModule {}
