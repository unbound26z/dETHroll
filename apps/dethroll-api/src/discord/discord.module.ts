import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
