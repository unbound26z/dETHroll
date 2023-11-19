import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {
  CacheType,
  Channel,
  Client,
  Events,
  Interaction,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder,
  Message,
} from 'discord.js';
import axios from 'axios';
import { CreateUserDto } from '../user/dto/user.dto';
import { extractUuid, generateDiscordPfPUrl } from '../utils/helpers';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { DETHRollCommands } from './discord.enum';
import { v4 } from 'uuid';
import { GameService } from '../game/game.service';
import {
  getAsSigner,
  getDETHContract,
  getProvider,
  initGame,
  joinGame,
  roll,
} from '../ethereum/methods';
@Injectable()
export class DiscordService implements OnModuleInit {
  client: Client;
  rest: REST;
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private gameService: GameService
  ) {
    this.client = new Client({
      intents: [],
      partials: [Partials.GuildMember],
    });
    this.rest = new REST().setToken(configService.get('DISCORD_TOKEN'));
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
      this.registerEvents();
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
                  .setDescription('Roll dETHroll number!'),
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
        await interaction.deferReply();
        const options = interaction.options;

        let data: { message: string; error: boolean | null };

        const user = interaction.user;
        const commandName = interaction.commandName;

        switch (commandName) {
          case DETHRollCommands.InitDethroll: {
            data = await this.initGameHandler(interaction, interaction.options);
            break;
          }
          case DETHRollCommands.JoinGame: {
            data = await this.joinGameHandler(interaction, options);
            break;
          }
          case DETHRollCommands.Roll: {
            data = await this.rollHandler(interaction);
            break;
          }
          default: {
            throw new BadRequestException('Command not supported');
          }
        }
        if (data.message.length > 200) {
          interaction.editReply(
            'Transaction reverted! Please contact support!⚠️'
          );
        } else {
          interaction.editReply(data.message + data.error ? '⚠️' : '');
        }
      } catch (error) {
        console.log(error);
      }
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
    try {
      const { user } = interaction;

      const amount = options.get('bet');

      if (!amount) return { message: 'Bet amount not found!', error: true };

      const channelId = interaction.channelId;

      const dbUser = await this.userService.getUserByDiscordId(user.id);

      if (!dbUser)
        return {
          message:
            'Please link discord on: ' + this.configService.get('APP_URL'),
          error: true,
        };

      await initGame(dbUser.signerWalletPubkey, +amount.value);

      const channel = await this.client.channels.fetch(channelId);
      if (
        !channel.isTextBased() ||
        channel.isDMBased() ||
        channel.isThread() ||
        channel.isVoiceBased()
      ) {
        return { message: 'Channel is not text based!', error: true };
      }

      const gameId = v4();
      const threadName = `${user.username}_${extractUuid(gameId)}`;
      const thread = await channel.threads.create({
        name: threadName,
      });
      await thread.members.add(user.id);
      await thread.send('Waiting for oponent... ⚔️');

      await this.gameService.createGame({
        betAmount: 10,
        discordId: user.id,
        chanelId: channelId,
        gameId,
        player: user.username,
        threadId: thread.id,
        threadName,
      });

      return {
        message: `User <@${user.id}> has created dETHroll game for ${amount.value} dETH! 🎰`,
        error: null,
      };
    } catch (error) {
      console.log(error, 'ERR');
      return { message: error.message, error: true };
    }
  }

  async joinGameHandler(interaction: Interaction<CacheType>, options: any) {
    try {
      const member = options.get('oponent').member;
      if (!member) return { message: 'Oponent not tagged', error: true };
      const { user } = interaction;

      if (user.id == member.user.id)
        return {
          message: "Can't play dETHroll game against yourself!",
          error: true,
        };

      const dbUser = await this.userService.getUserByDiscordId(user.id);

      if (!dbUser)
        return {
          message:
            'Please link discord on: ' + this.configService.get('APP_URL'),
          error: true,
        };

      const oponentData = await this.userService.getUserByDiscordId(
        member.user.id
      );

      if (!oponentData)
        return {
          message: 'Oponent discord data not found!',
          error: true,
        };

      const game = await this.gameService.getGameForOponen(member.user.id);

      if (!game)
        return {
          message: 'Tagged user does not have created games!',
          error: true,
        };

      const { channelId } = interaction;

      const channel = await this.client.channels.fetch(channelId);

      if (
        !channel.isTextBased() ||
        channel.isDMBased() ||
        channel.isThread() ||
        channel.isVoiceBased()
      ) {
        return { message: 'Channel is not text based!', error: true };
      }

      const threads = await channel.threads.fetch();

      const thread = threads.threads.find((t) => t.name === game.threadName);

      if (!thread) return { message: 'Thread not found', error: true };

      await thread.members.add(user.id);

      await thread.send(`User <@${user.id}> joined game. Good luck! 🧬`);
      await joinGame(
        game.gameId,
        dbUser.signerWalletPubkey,
        oponentData.signerWalletPubkey
      );

      game.isPending = false;
      game.player2 = user.username;
      game.player2DiscordId = user.id;

      await this.gameService.updateGame(game);

      return {
        message: `User <@${user.id}> has joined dETHroll game against <@${member.user.id}>. Good luck!`,
        error: null,
      };
    } catch (error) {
      return { message: error.message, error: true };
    }
  }

  async rollHandler(interaction: Interaction<CacheType>) {
    try {
      const { user, channelId } = interaction;

      const userData = await this.userService.getUserByDiscordId(user.id);

      if (!userData) throw new Error('Player not found in database!');

      const signer = getAsSigner(process.env.MNEMONIC);

      const contract = getDETHContract(signer);

      const gameData = await this.gameService.getGameByThreadId(channelId);

      if (!gameData) return { message: 'Game not found!', error: true };

      const game = await contract.getGame(gameData.gameId);

      if (
        (!game.lastPlayer1 && userData.signerWalletPubkey !== game.player1) ||
        (game.lastPlayer1 && userData.signerWalletPubkey === game.player1)
      ) {
        return { message: 'It is not your turn!', error: true };
      }
      await roll(userData.signerWalletPubkey, gameData.gameId);
      return { message: `Successfull roll by <@${user.id}>! 🎲`, error: null };
    } catch (error) {
      console.log(error);
      return { message: error.message, error: true };
    }
  }
  registerEvents() {
    try {
      this.logger.verbose(`Registering events`);

      const contract: any = getDETHContract();

      contract.on('Roll', async (gameId, player, rolledNumber) => {
        console.log(gameId, player, rolledNumber);
        const game = await this.gameService.getGameById(gameId);
        if (!game) throw new BadRequestException('Could not find game!');

        const user = await this.userService.getUserBySigWallet(player);

        if (!user) throw new BadRequestException('User could not be found');

        const channel = this.transformChannel(
          await this.client.channels.fetch(game.chanelId)
        );

        const threads = await channel.threads.fetch();

        const foundThread = threads.threads.find(
          (t) => t.name === game.threadName
        );

        if (!foundThread) throw new Error('Thread deleted or does not exist!');

        await foundThread.send(
          `User <@${user.discordId}> rolled number **${Number(
            rolledNumber
          )}** !`
        );
      });

      contract.on('GameWon', async (gameId, winner, loser, wonAmount) => {
        const game = await this.gameService.getGameById(gameId);

        if (!game) throw new BadRequestException('Could not find game!');

        const winnerData = await this.userService.getUserBySigWallet(winner);

        if (!winnerData)
          throw new BadRequestException('Winner could not be found');

        const loserAddr = game.player1 === winner ? game.player2 : game.player1;

        const channel = this.transformChannel(
          await this.client.channels.fetch(game.chanelId)
        );

        const threads = await channel.threads.fetch();

        const foundThread = threads.threads.find(
          (t) => t.name === game.threadName
        );

        if (!foundThread) throw new Error('Thread deleted or does not exist!');

        game.winner = winner;

        await this.gameService.updateGame(game);

        await foundThread.send(
          `User <@${winnerData.discordId}> has won! Total bet was ${wonAmount}`
        );
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  transformChannel(channel: Channel) {
    if (
      !channel.isTextBased() ||
      channel.isDMBased() ||
      channel.isThread() ||
      channel.isVoiceBased()
    ) {
      throw new BadRequestException('Channel is not text based!');
    }
    return channel;
  }
}
