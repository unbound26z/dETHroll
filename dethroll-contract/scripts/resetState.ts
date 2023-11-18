import { ethers } from 'hardhat';

export async function main() {
  const contract = await ethers.getContractAt(
    'DETHRoll',
    process.env.CONTRACT_ADDRESS!
  );

  const sig = (await ethers.getSigners())[0];

  const tx = await contract
    .connect(sig)
    .resetPlayer('0xc41a10aE8b71F072Cd62D16a834eF2a6E9627326');

  const receipts = await tx.wait();

  console.log(receipts?.hash);
}

main().catch((err) => console.log(err));
