import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: 'T9BHGPE5EVCD8YREDKA8CWS4WWM4PE1DBC',
  },
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
