'use client';
import { depositFunds } from 'apps/dethroll-dapp/utils/utils';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

const Modal: FC<{
  title: string;
  signatureWallet: string;
  toggleDepositModal: Dispatch<SetStateAction<boolean>>;
}> = ({ title, signatureWallet, toggleDepositModal }) => {
  const [depositAmountEth, setDepositAmountEth] = useState<number | undefined>(
    undefined
  );
  const [unit2Value, setUnit2Value] = useState<number | undefined>(undefined);

  const handleClose = () => {
    toggleDepositModal(false);
  };

  const handleDeposit = async () => {
    try {
      if (depositAmountEth)
        await depositFunds(depositAmountEth, signatureWallet);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUnit1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const value = parseInt(event.target.value, 10);
    // setUnit1Value(value);
    // setUnit2Value(value * 5);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>

      <div
        className="bg-gray-500 p-8 rounded shadow-lg z-50"
        style={{ height: '80%', width: '40%' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-black hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-between mt-44">
          <div className=" flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-2">Unit 1 Title</h3>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter deposit amount"
              onChange={(e) => setDepositAmountEth(+e.target.value)}
            />
          </div>
          <div className=" flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-2">Unit 2 Title</h3>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter deposit amount"
            />
          </div>
        </div>
        <button onClick={handleDeposit}>GUTOOO</button>
      </div>
    </div>
  );
};

export default Modal;
