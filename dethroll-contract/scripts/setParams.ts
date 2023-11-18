import { ethers } from 'hardhat';
export async function main() {
  const contract = await ethers.getContractAt('DETHRoll', '');

  await contract.setParameters('', '', '');
}

main().catch((err) => {
  console.log(err);
});
