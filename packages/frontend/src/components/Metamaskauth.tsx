// @ts-nocheck
import userEvent from "@testing-library/user-event";
import console from "console";
import React, { useEffect, useState } from "react";

function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }
  
  async function connect(onConnected) {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    onConnected(accounts[0]);
  }
  
  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      if (accounts.length > 0) {
        const account = accounts[0];
        onConnected(account);
        return;
      }
  
      if (isMobileDevice()) {
        await connect(onConnected);
      }
    }
  }

  export default function MetaMaskAuth({ onAddressChanged }) {
    const [userAddress, setUserAddress] = useState("");
  
    useEffect(() => {
      checkIfWalletIsConnected(setUserAddress);
    }, []);
  
  
  
    return userAddress ? (
      <div>
        <Address userAddress={userAddress} />
      </div>
    ) : (
       <ConnectWallet setUserAddress={setUserAddress}/>
    );
  }
  
  
   function ConnectWallet({ setUserAddress }) {
    if (isMobileDevice()) {
      const dappUrl = "http://localhost:3000/track"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
      const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
      return (
        <a href={metamaskAppDeepLink}>
           <button className='button' userAddress={userAddress}>
             Connect to MetaMask
           </button>
           <div>Hello</div>
        </a>
      );
    }

    return (
        <div>
        <button className='button' onClick={() => connect(setUserAddress)}>
          Connect to MetaMask
        </button>

        </div>
      );
    }
    
      function Address({ userAddress }) {
      return (
                        <small >
                            {userAddress}
                        </small>         
      )
      }
    

    