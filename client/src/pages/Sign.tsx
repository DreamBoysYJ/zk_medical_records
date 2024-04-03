import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { FC, useCallback } from "react";
import React from 'react';

export const SignMessage: FC = () => {


    const { wallet, publicKey } = useWallet();
    console.log("지갑 주소는??? : ",  wallet?.adapter?.publicKey);
    const address: string = wallet?.adapter?.publicKey as string;
    localStorage.setItem('address', address);
  
    const onClick = useCallback(async () => {
      if (!publicKey) throw new WalletNotConnectedError();
  
      const message = "a message to sign";
      console.log(wallet);
  
      const bytes = new TextEncoder().encode(message);
      const signatureBytes = await (
        wallet?.adapter as LeoWalletAdapter
      ).signMessage(bytes);
      const signature = new TextDecoder().decode(signatureBytes);
      alert("Signed message: " + signature);
    }, [wallet, publicKey]);
  
    return (
      <span onClick={onClick} >

      </span>
    );
  };

