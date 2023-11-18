export function getTrimmedPublicKey(publicKey: string): string {
  const publicKeyString = publicKey.toString();
  return (
    publicKeyString.substring(0, 5) +
    '...' +
    publicKeyString.substring(publicKeyString.length - 5)
  );
}
