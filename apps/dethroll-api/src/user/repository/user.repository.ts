import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveUser(user: User) {
    return this.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.find();
  }

  async getUserByWallet(walletAddress: string) {
    return this.findOne({ where: { walletAddress } });
  }

  async getUserByDiscordId(discordSnowflake: string) {
    return this.findOne({ where: { discordSnowflake } });
  }
}
