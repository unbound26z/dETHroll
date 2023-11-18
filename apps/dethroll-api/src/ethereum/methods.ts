import { ethers, Signer } from 'ethers';
import { DETHRoll } from '../types/dETHRoll';
import dETHRollAbi from './abi/DETHRoll.json';
import * as dotenv from 'dotenv';

dotenv.config();

export function getAsSigner(pk: string) {
  return new ethers.Wallet(pk, getProvider());
}

export function getDETHContract(signer: Signer) {
  return new ethers.Contract(
    process.env.CONTRACT_ADDRESS!,
    dETHRollAbi.abi,
    signer
  ) as unknown as DETHRoll;
}

export function getProvider() {
  return new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
}

export async function initGame(address: string, betAmount: number) {
  const mainPk = getAsSigner(process.env.MNEMONIC);
  const contract = getDETHContract(mainPk);

  await contract.initGame(BigInt(betAmount), address);
}

export async function joinGame(
  gameId: string,
  address: string,
  oponent: string
) {
  const mainPk = getAsSigner(process.env.MNEMONIC);

  const contract = getDETHContract(mainPk);

  await contract.joinGame(gameId, oponent, address);
}

export async function roll(address: string, gameId: string) {
  const mainPk = getAsSigner(process.env.MNEMONIC);

  const contract = getDETHContract(mainPk);

  await contract.roll(gameId, address);
}
