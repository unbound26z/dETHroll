import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    dev: {
      url: process.env.RPC_URL!,
      accounts: [process.env.MNEMONIC!],
      chainId: 11155111,
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
