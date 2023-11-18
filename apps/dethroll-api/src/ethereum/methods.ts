import ethers from 'ethers';
import { DETHRoll } from '../types/dETHRoll';
import dETHRollAbi from './abi/DETHRoll.json';

export const MESSAGE_SIGN = 'Ethereum Signed Message:';

export function getAsSigner(pk: string) {
  return new ethers.Wallet(pk);
}

export function getDETHContract() {
  return new ethers.Contract(
    process.env.CONTRACT_ADDRESS!,
    dETHRollAbi.abi
  ) as unknown as DETHRoll;
}

export function getProvider() {
  return new ethers.providers.InfuraProvider(process.env.RPC_URL);
}

export async function initGame(pk: string, betAmount: number) {
  const signer = getAsSigner(pk);
  const contract = getDETHContract();

  const { v, r, s, signature } = await signMessage(signer);

  await contract.initGame(BigInt(betAmount), signature, v, r, s);
}

export async function joinGame(pk: string, oponent: string) {
  const signer = getAsSigner(pk);
  const contract = getDETHContract();

  const { v, r, s, signature } = await signMessage(signer);
  await contract.joinGame(oponent, signature, v, r, s);
}

export async function roll(pk: string, gameId: string) {
  const signer = getAsSigner(pk);
  const contract = getDETHContract();

  const { v, r, s, signature } = await signMessage(signer);
  await contract.roll(gameId, signature, v, r, s);
}

export async function signMessage(signer: ethers.Wallet) {
  const signature = await signer.signMessage(MESSAGE_SIGN);

  const r = signature.slice(0, 66);
  const s = '0x' + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);

  return { v, r, s, signature };
}
