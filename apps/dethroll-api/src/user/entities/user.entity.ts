import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  walletAddress: string;

  @PrimaryColumn()
  discordId: string;

  @Column()
  discordUsername: string;

  @Column()
  discordImage: string;

  @Column()
  signerWalletPubkey: string;

  @Column()
  signerWalletPrivateKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
