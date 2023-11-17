import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Client, Events, Partials, REST } from 'discord.js';
import axios from 'axios';
import { CreateUserDto } from '../user/dto/user.dto';
import { generateDiscordPfPUrl } from '../utils/helpers';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
@Injectable()
export class DiscordService implements OnModuleInit {
  client: Client;
  rest: REST;
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    this.client = new Client({
      intents: [],
      partials: [Partials.GuildMember],
    });
    this.rest = new REST();
  }

  onModuleInit() {
    try {
      this.client.once(Events.ClientReady, () => {
        this.logger.log(`Logged in as ${this.client.user!.username}!`);
      });

      this.client.on(Events.ThreadCreate, () => {});

      this.client.login(this.configService.get('DISCORD_TOKEN'));
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }

  oAuthDiscordAccount(wallet: string) {
    return {
      uri: this.configService.get('DISCORD_REDIRECT_URI') + wallet,
    };
  }

  async getUserData(code: string, wallet: string) {
    try {
      const { data } = await axios.post(
        'https://discord.com/api/oauth2/token',
        {
          client_id: this.configService.get('DISCORD_CLIENT_ID'),
          client_secret: this.configService.get('DISCORD_SECRET_ID'),
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

      const { access_token, token_type } = data;
      const { data: userData } = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );

      const createUsreDto: CreateUserDto = {
        discordId: userData.id,
        discordImage: generateDiscordPfPUrl(userData.id, userData.avatar),
        discordUsername: userData.username,
        walletAddress: wallet,
      };

      await this.userService.createUser(createUsreDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
