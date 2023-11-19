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
    apiKey: process.env.ETHERSCAN_API_KEY!,
  },
  networks: {
    dev: {
      url: process.env.RPC_URL!,
      accounts: [process.env.MNEMONIC!],
      chainId: 11155111,
      allowUnlimitedContractSize: true,
    },
    arbitrum: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc/',
      chainId: 421614,
      accounts: [process.env.MNEMONIC!],
      allowUnlimitedContractSize: true,
    },
    scroll: {
      url: 'https://rpc.ankr.com/scroll_sepolia_testnet	',
      chainId: 534351,
      accounts: [process.env.MNEMONIC!],
      allowUnlimitedContractSize: true,
    },
    mantle: {
      url: 'https://rpc.testnet.mantle.xyz',
      chainId: 5001,
      accounts: [process.env.MNEMONIC!],
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
