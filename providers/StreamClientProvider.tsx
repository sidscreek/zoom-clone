'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log("Effect is running", { API_KEY, user, isLoaded });
  
    if (!isLoaded || !user) {
      console.log("User not loaded or not logged in");
      return;
    }
    if (!API_KEY) {
      console.log("API key is missing");
      throw new Error('Stream API key is missing');
    }
  
    try {
      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user?.id,
          name: user?.username || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider,
      });
  
      console.log("StreamVideoClient initialized", client);
      setVideoClient(client);
    } catch (error) {
      console.error("Failed to initialize StreamVideoClient", error);
    }
  }, [user, isLoaded]);
  

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;