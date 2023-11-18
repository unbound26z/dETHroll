import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GameService } from './game/game.service';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    DiscordModule,
    UserModule,
    GameModule,
    ConfigModule.forRoot(),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get('POSTGRES_DB'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          port: 5432,
          entities: [User, Game],
          synchronize: true,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
