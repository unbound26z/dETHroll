import * as dotenv from 'dotenv';

dotenv.config();

export const clientId = process.env.DISCORD_CLIENT_ID!;
export const secret = process.env.DISCORD_SECRET_ID!;
export const redirectUri = process.env.DISCORD_REDIRECT_URI!;
export const discordToken = process.env.DISCORD_TOKEN!;
