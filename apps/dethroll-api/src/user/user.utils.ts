import { ethers } from 'ethers';

export const generateWallet = () => {
  const wallet = ethers.Wallet.createRandom();

  const privateKey = wallet.privateKey;
  const pubkey = wallet.address;

  return { pubkey, privateKey };
};
