"use client";

import { useEffect, useState } from "react";
import { Address, WalletClient, createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

declare let window: any;

const Wallet = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [client, setClient] = useState<WalletClient>();

  useEffect(() => {
    const initClient = () => {
      const client = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum),
      });
      setClient(client);
    };
    initClient();
  }, []);

  useEffect(() => {
    if (!client) return;
    const getAddress = async () => {
      const [address] = await client.getAddresses();
      setAddress(address);
      console.log(address);
    };
    getAddress();
  }, [client]);

  return (
    <div>
      <p>Address: {address}</p>
    </div>
  );
};

export default Wallet;
