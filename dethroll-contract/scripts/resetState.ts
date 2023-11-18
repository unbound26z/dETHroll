import { ethers } from 'hardhat';

export async function main() {
  const contract = await ethers.getContractAt(
    'DETHRoll',
    process.env.CONTRACT_ADDRESS!
  );

  const sig = (await ethers.getSigners())[0];

  const tx = await contract.connect(sig).resetPlayer('');

  await tx.wait();
}

main().catch((err) => console.log(err));
