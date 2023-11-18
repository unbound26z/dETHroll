'use client';
import { User } from 'apps/dethroll-dapp/common/common.interfaces';
import { getTrimmedPublicKey } from 'apps/dethroll-dapp/utils/utils';
import axios from 'axios';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';

const Header: FC<{ home: boolean }> = ({ home }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [discordUser, setDiscordUser] = useState<User>();
  const [depositModal, toggleDepositModal] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      void checkIfLoggedIn();

      window.ethereum.on('accountsChanged', handleAccountChange);
    }
  }, []);

  useEffect(() => {
    if (walletAddress && walletAddress !== '') void fetchExistingUser();
  }, [walletAddress]);

  const checkIfLoggedIn = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const userAddress = accounts[0];

    setWalletAddress(userAddress);
    setWalletConnected(true);
  };

  const fetchExistingUser = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/wallet/${walletAddress}`
    );

    const discordUserData = response.data;

    setDiscordUser(discordUserData);
  };

  const handleAccountChange = async (accounts: string[]) => {
    try {
      if (accounts.length === 0) {
        setWalletConnected(false);
        setWalletAddress('');
      }
    } catch (error: any) {
      console.log(error.messag);
    }
  };

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const userAddress = accounts[0];

        setWalletAddress(userAddress);
        setWalletConnected(true);
      } else {
        console.log('MetaMask not detected');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const authorizeDiscord = async () => {
    const {
      data: { uri },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/discord/link/${walletAddress}`
    );

    window.open(uri, '_blank');
    window.close();
  };

  const openModal = () => {
    toggleDepositModal(true);
  };

  return (
    <>
      {depositModal && discordUser && (
        <Modal
          title="DEPOSIT FUNDS"
          signatureWallet={discordUser.signerWalletPubkey}
          toggleDepositModal={toggleDepositModal}
        ></Modal>
      )}
      <div className="bg-black" style={{ height: '136px' }}>
        <div className="flex m-auto justify-between  text-white p-6 max-w-screen-2xl">
          <div
            className="flex flex-col text-xl justify-center"
            style={{ width: '240px' }}
          >
            {home ? (
              <Link href={'/info'}>
                <button className="border-solid border-2 rounded-xl px-2 border-white w-2/5">
                  INFO
                </button>
              </Link>
            ) : (
              <Link href={'/'}>
                <button className="border-solid border-2 rounded-xl px-2 border-white w-2/5">
                  HOME
                </button>
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4 text-xl justify-center items-center">
            <img className="w-10" src="Logo_dETHroll.png" />
            {walletConnected && discordUser ? (
              <div className="flex gap-4">
                <button
                  className="border-solid border-2 rounded-xl px-2 border-white"
                  style={{ width: '140px' }}
                  onClick={openModal}
                >
                  DEPOSIT
                </button>
                <button
                  className="border-solid border-2 rounded-xl px-2 border-white"
                  style={{ width: '140px' }}
                >
                  WITHDRAW
                </button>
              </div>
            ) : (
              <div className="font-bold">dETHroll</div>
            )}
          </div>
          <div
            className="flex flex-col gap-4 text-xl justify-center"
            style={{ width: '240px' }}
          >
            <button
              className="border-solid border-2 rounded-xl px-2 border-white"
              onClick={connectMetamask}
            >
              {walletConnected
                ? getTrimmedPublicKey(walletAddress)
                : 'CONNECT WALLET'}
            </button>
            {walletConnected && (
              <button
                className="border-solid border-2 rounded-xl px-2 border-white"
                onClick={authorizeDiscord}
              >
                {discordUser ? discordUser.discordUsername : 'CONNECT DISCORD'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
