import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { generateWallet } from './user.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const walletExists = await this.userRepository.getUserByWallet(
        createUserDto.walletAddress
      );

      if (!walletExists) {
        throw new Error(
          `User with wallet address ${createUserDto.walletAddress} already exists`
        );
      }

      const snowflakeExists = await this.userRepository.getUserByDiscordId(
        createUserDto.discordSnowflake
      );

      if (!snowflakeExists) {
        throw new Error(
          `User with discord snowflake ${createUserDto.discordSnowflake} already exists`
        );
      }

      const { pubkey, privateKey } = generateWallet();

      const newUser: User = {
        createdAt: new Date(),
        updatedAt: new Date(),
        discordSnowflake: createUserDto.discordSnowflake,
        walletAddress: createUserDto.walletAddress,
        signerWalletPubkey: pubkey,
        signerWalletPrivateKey: privateKey,
      };

      await this.userRepository.saveUser(newUser);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async getAllUsers() {
    await this.userRepository.getAllUsers();
  }

  async getUserByWallet(walletAddress: string) {
    await this.userRepository.getUserByWallet(walletAddress);
  }

  async getUserByDiscordId(discordSnowflake: string) {
    await this.userRepository.getUserByDiscordId(discordSnowflake);
  }
}
