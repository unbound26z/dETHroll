import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/link')
  linkDiscord() {
    return this.discordService.oAuthDiscordAccount();
  }

  @Get('/auth')
  async authDiscord(@Query('code') code: string, @Res() response: any) {
    await this.discordService.getUserData(code);

    return { auth: true };
  }

  @Post('/data')
  async postData(@Body() body: any) {
    console.log(body);
  }
}
