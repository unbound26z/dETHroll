import { ethers } from 'ethers';
import abi from './abi/deth.json';
import ercAbi from './abi/ercAbi.json';

export function getTrimmedPublicKey(publicKey: string): string {
  const publicKeyString = publicKey.toString();
  return (
    publicKeyString.substring(0, 5) +
    '...' +
    publicKeyString.substring(publicKeyString.length - 5)
  );
}

export const getContract = () => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    abi.abi,
    new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!)
  );
};

export const depositFunds = async (amount: number, signatureWallet: string) => {
  console.log(amount, signatureWallet);
  console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  console.log(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const signer = provider.getSigner();

  const contract = getContract();

  const erc20Contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS!,
    ercAbi.abi,
    new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!)
  );

  const bigIntAmount = BigInt(amount * Math.pow(10, 6));

  const approvalTx = await erc20Contract
    .connect(signer)
    .approve(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, bigIntAmount);

  await approvalTx.wait();

  const tx = await contract
    .connect(signer)
    .depositErc20(bigIntAmount, signatureWallet);

  await tx.wait();
};
