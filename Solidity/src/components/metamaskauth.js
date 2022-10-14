import React, { useEffect, useState } from "react";
import "./metamask.css";
import NFTData from "./NFTData";
import NFTData2 from "./NFTData2";



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
     <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "http://localhost:3000/"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
         <button className='button'>
           Connect to MetaMask
         </button>
      </a>
    );
  }

  
  return (
    <button className='button' onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (

    <div className="container-filled">

        <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-o shadow'>
            <div className='navbar-brand col-sm-3 col-md-3 mr-0 ' style={{ color: 'white' }}>

                Metawise
            </div>
            <ul className='navbar-nav px-3'>
                <li className='nav-item text-nowrap
            d-none d-sm-none d-sm-block'>
                    <small className='text-white'>
                        {userAddress}
                    </small>
                   
                </li>

            </ul>

        </nav>
        
     {/* <span className='address'>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span> */}
     <NFTData2/>
    </div>
  );
}