import { ethers } from 'hardhat';
import params from './parameters.sepolia.json';
export async function main() {
  const erc20 = await ethers.getContractAt('ERC20', params.token);

  const signer = (await ethers.getSigners())[0];
  const approveTx = await erc20
    .connect(signer)
    .approve(process.env.CONTRACT_ADDRESS!, BigInt(50000000));

  await approveTx.wait();

  const dETHRoll = await ethers.getContractAt(
    'DETHRoll',
    process.env.CONTRACT_ADDRESS!
  );

  const depositTx = await dETHRoll.depositErc20(
    BigInt(50000000),
    '0xB4915d6CeCBc0752ef7eA592a09962321612F9CB'
  );

  const receipt = await depositTx.wait();

  console.log(`Deposited funds to contract ${receipt?.hash}`);
}
main().catch((err) => console.log(err));
