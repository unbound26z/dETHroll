import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Response } from 'express';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/link/:wallet')
  linkDiscord(@Param('wallet') wallet: string) {
    return this.discordService.oAuthDiscordAccount(wallet);
  }

  @Get('/auth')
  async authDiscord(
    @Query('code') code: string,
    @Query('state') wallet: string,
    @Res() response: Response
  ) {
    await this.discordService.getUserData(code, wallet);

    return response.redirect(`http://localhost:4200`);
  }
}
