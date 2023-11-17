export function generateDiscordPfPUrl(userId: string, avatarHash: string) {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
}
