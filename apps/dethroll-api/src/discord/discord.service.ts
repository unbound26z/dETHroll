import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {
  CacheType,
  Client,
  Events,
  Interaction,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import axios from 'axios';
import { CreateUserDto } from '../user/dto/user.dto';
import { generateDiscordPfPUrl } from '../utils/helpers';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { DETHRollCommands } from './discord.enum';
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
      this.registerSlashCommand();
      this.interactionReact();
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }

  oAuthDiscordAccount(wallet: string) {
    return {
      uri: this.configService.get('DISCORD_REDIRECT_URI') + wallet,
    };
  }

  registerSlashCommand() {
    try {
      (async () => {
        try {
          await this.rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
            {
              body: [
                new SlashCommandBuilder()
                  .setName('init')
                  .setDescription('Initialize new dETHroll game!')
                  .addStringOption((option) =>
                    option
                      .setName('bet')
                      .setDescription('Amount of dETH currency to bet')
                      .setRequired(true)
                  ),

                new SlashCommandBuilder()
                  .setName('join')
                  .setDescription('Join dETHroll game!')
                  .addUserOption((option) =>
                    option
                      .setName('oponent')
                      .setDescription('Oponent to play agains')
                      .setRequired(true)
                  ),

                new SlashCommandBuilder()
                  .setName('roll')
                  .setDescription('Roll dETHroll number!')
                  .addStringOption((option) =>
                    option
                      .setName('oponent')
                      .setDescription('Amount of dETH currency to bet')
                      .setRequired(true)
                  ),
              ],
            }
          );
          this.logger.verbose('Registered command');
        } catch (error) {
          this.logger.error('Failed to register command!' + error.message);
        }
      })();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async interactionReact() {
    this.client.on('interactionCreate', async (interaction) => {
      try {
        if (!interaction.isCommand()) {
          throw new Error('Inetaction is not command!');
        }

        const command = interaction.command;
        const options = interaction.options;

        let message = '';

        switch (command.name) {
          case DETHRollCommands.InitDethroll: {
            message = await this.initGameHandler(
              interaction,
              interaction.options.data
            );
            break;
          }
          case DETHRollCommands.JoinGame: {
            this.joinGameHandler(interaction);
            break;
          }
          case DETHRollCommands.Roll: {
            this.rollHandler(interaction);
            break;
          }
          default: {
            throw new BadRequestException('Command not supported');
          }
        }
        interaction.reply(message);
      } catch (error) {}
    });
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

  async initGameHandler(interaction: Interaction<CacheType>, options: any) {
    const { user, guild } = interaction;

    const amount = options[0];

    return '10';
  }

  async joinGameHandler(interaction: Interaction<CacheType>) {}

  async rollHandler(interaction: Interaction<CacheType>) {}
}
