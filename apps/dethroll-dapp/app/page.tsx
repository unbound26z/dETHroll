'use client';
import { useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import Homepage from '../components/Homepage/Homepage';

export default async function Index() {
  const getDiscordOauthLink = useCallback(async () => {
    const {
      data: { uri },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/discord/link/0xC1fBA4F0290FcFfE56F744D5c4E25210cBa523b1`
    );

    window.open(uri, '_blank');
    window.close();
  }, []);

  return (
    <div>
      <Header home={true} />
      <Homepage />
    </div>
  );
}
