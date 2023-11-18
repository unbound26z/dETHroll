import { ethers } from 'hardhat';
export async function main() {
  const contract = await ethers.getContractAt(
    'DETHRoll',
    process.env.CONTRACT_ADDRESS!
  );

  const account = (await ethers.getSigners())[0];

  const tx = await contract
    .connect(account)
    .register(
      '0xC1fBA4F0290FcFfE56F744D5c4E25210cBa523b1',
      'gg97999',
      '0xB4915d6CeCBc0752ef7eA592a09962321612F9CB'
    );

  const receipt = await tx.wait();

  console.log(`Registered new user with tx hash ${receipt?.hash} 🚀`);
}

main().catch((err) => console.log(err));
