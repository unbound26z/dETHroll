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

      if (walletExists) {
        throw new Error(
          `User with wallet address ${createUserDto.walletAddress} already exists`
        );
      }

      const snowflakeExists = await this.userRepository.getUserByDiscordId(
        createUserDto.discordId
      );

      if (snowflakeExists) {
        throw new Error(
          `User with discord snowflake ${createUserDto.discordId} already exists`
        );
      }

      const { pubkey, privateKey } = generateWallet();

      const newUser: User = {
        createdAt: new Date(),
        updatedAt: new Date(),
        discordId: createUserDto.discordId,
        walletAddress: createUserDto.walletAddress,
        signerWalletPubkey: pubkey,
        signerWalletPrivateKey: privateKey,
        discordImage: createUserDto.discordImage,
        discordUsername: createUserDto.discordUsername,
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
    return await this.userRepository.getUserByWallet(walletAddress);
  }

  async getUserByDiscordId(discordId: string) {
    return await this.userRepository.getUserByDiscordId(discordId);
  }
}
