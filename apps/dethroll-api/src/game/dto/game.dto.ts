export interface CreateGameDto {
  gameId: string;
  player: string;
  discordId: string;
  threadName: string;
  threadId: string;
  betAmount: number;
}
