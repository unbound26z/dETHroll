import { ethers } from 'hardhat';

export async function main() {
  const contract = await ethers.getContractAt(
    'DETHRoll',
    process.env.CONTRACT_ADDRESS!
  );

  const sig = (await ethers.getSigners())[0];

  const tx = await contract
    .connect(sig)
    .resetPlayer('0xB4915d6CeCBc0752ef7eA592a09962321612F9CB');

  await tx.wait();
}

main().catch((err) => console.log(err));
