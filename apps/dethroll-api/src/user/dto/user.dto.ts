import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  walletAddress: string;

  @IsString()
  discordId: string;
}
