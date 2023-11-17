import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';

const client: Client = new Client({
  // TODO add proper intents and partials
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.GuildMember],
});

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly logger = new Logger(DiscordService.name);

  onModuleInit() {
    try {
      client.once(Events.ClientReady, () => {
        this.logger.log(`Logged in as ${client.user!.username}!`);
      });

      client.login('TOKEN OVDE TODO');
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }
}
