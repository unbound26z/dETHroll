'use client';
import { FC } from 'react';

const Homepage: FC<{}> = () => {
  return (
    <div
      className="bg-cover overflow-hidden"
      style={{
        backgroundImage: `url(background.png)`,
        height: `calc(100vh - 132px)`,
      }}
    >
      <div className="flex m-auto text-white p-6 max-w-screen-2xl h-screen">
        <div className="flex flex-col p-10 gap-8 w-9/12 mt-8">
          <div className="text-8xl font-bold w-8/12 ">
            ADD OUR BOT TO YOUR SERVER NOW
          </div>
          <button className="border-solid border-2 rounded-3xl px-2 border-white text-5xl font-bold w-96 py-2">
            DISCORD
          </button>
        </div>
        <img src="ethblur.png" style={{ height: '80%', marginRight: '90px' }} />
      </div>
    </div>
  );
};

export default Homepage;
