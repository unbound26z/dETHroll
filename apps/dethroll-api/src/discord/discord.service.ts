import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {
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
            Routes.applicationGuildCommands(
              process.env.APPLICATION_ID!,
              process.env.GUILD_ID!
            ),
            {
              body: [
                new SlashCommandBuilder()
                  .setName('init_dethroll')
                  .setDescription('Initialize new dETHroll game!')
                  .addStringOption((option) =>
                    option
                      .setName('dETH bet')
                      .setDescription('Amount of dETH currency to bet')
                      .setRequired(true)
                  ),

                new SlashCommandBuilder()
                  .setName('join_dethroll')
                  .setDescription('Join dETHroll game!')
                  .addStringOption((option) =>
                    option
                      .setName('Oponent')
                      .setDescription('Amount of dETH currency to bet')
                      .setRequired(true)
                  ),

                new SlashCommandBuilder()
                  .setName('roll')
                  .setDescription('Roll dETHroll number!')
                  .addStringOption((option) =>
                    option
                      .setName('Oponent')
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

  interactionReact() {
    try {
      this.client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) {
          throw new Error('Inetaction is not command!');
        }

        const command = interaction.command;

        switch (command.name) {
          case DETHRollCommands.InitDethroll: {
            this.initGameHandler(interaction);
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
      });
    } catch (error) {}
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

  async initGameHandler(interaction: Interaction) {}

  async joinGameHandler(interaction: Interaction) {}

  async rollHandler(interaction: Interaction) {}
}
