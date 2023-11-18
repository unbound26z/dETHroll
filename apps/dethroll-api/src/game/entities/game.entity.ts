import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  gameId: string;
  @Column()
  player1: string;
  @Column({ nullable: true })
  @Column()
  chanelId: string;
  player2: string | null;
  @Column({ default: true })
  isPending: boolean;
  @Column()
  threadId: string;
  @Column()
  threadName: string;
  @Column()
  betAmount: number;
  @Column()
  player1DiscordId: string;
  @Column({ nullable: true })
  winner: string | null;
  @Column({ nullable: true })
  player2DiscordId: string | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
