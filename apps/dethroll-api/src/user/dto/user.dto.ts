import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  walletAddress: string;

  @IsString()
  discordSnowflake: string;
}
