export interface User {
  walletAddress: string;
  discordId: string;
  discordUsername: string;
  discordImage: string;
  signerWalletPubkey: string;
  signerWalletPrivateKey: string;
  createdAt: Date;
  updatedAt: Date;
}
