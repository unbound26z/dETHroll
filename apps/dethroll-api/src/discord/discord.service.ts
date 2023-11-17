import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import axios from 'axios';
@Injectable()
export class DiscordService implements OnModuleInit {
  client: Client;
  private readonly logger = new Logger(DiscordService.name);

  constructor() {
    this.client = new Client({
      // TODO add proper intents and partials
      intents: [],
      partials: [Partials.GuildMember],
    });
  }

  onModuleInit() {
    try {
      this.client.once(Events.ClientReady, () => {
        this.logger.log(`Logged in as ${this.client.user!.username}!`);
      });

      this.client.on(Events.ThreadCreate, () => {});

      this.client.login(
        'MTE3NTEzOTM5MTU2MDI0MTI1Mg.G3iL75.A25LgsL7f0tJIA6P6TPlUy-uLaTrtn-Eyvdixo'
      );
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }

  oAuthDiscordAccount() {
    return {
      uri: 'https://discord.com/api/oauth2/authorize?client_id=1175139391560241252&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fauth&response_type=code&scope=identify',
    };
  }

  async getUserData(code: string) {
    try {
      const { data } = await axios.post(
        'https://discord.com/api/oauth2/token',
        {
          client_id: '1175139391560241252',
          client_secret: 'a30m4Q2Ji903uHxomV7Wfx6CuApp6zNd',
          code,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:${3000}/api/discord/auth`,
          scope: 'identify',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, refresh_token, token_type } = data;
      const { data: userData } = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );

      const uri = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
      console.log(uri);
      console.log(userData, 'UDATA');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
