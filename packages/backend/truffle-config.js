require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider") 
const keys = require("./web3/keys.json")

module.exports = {


  networks: {
    development: {
        host: "127.0.0.1",     // Localhost (default: none) Host Ganache is RPC SERVER
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none) 
       },
       goerli : {
        provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `https://goerli.infura.io/v3/${keys.INFURA_API_KEY}`,
          addressIndex: 1
        }),
        network_id: 5,
        gas: 5500000, // gas limit, How much gas we are willing to spend
        gasPrice: 20000000000, // How much we are willing to spend for unit of gas
        conformations: 2, // number of blocks to wait between deployment 
        timeoutBlocks: 200, // number of blocks before deployment times out

       }

      
  },
  contracts_directory: './web3/contracts/',
  contracts_build_directory: '../frontend/src/abis/',  
 
  compilers: {
    solc: {
      version: "^0.8.14", 
      optimizer:{
        enabled:'true',
        runs: 200
      }           
    }
  }, 
};


// 5500000 * 20000000000 = 110000000000000000 = 0.11 eth

 // transaction hash:    0x402697cabb3aa3c51ac212a9f3b8649a48b6f3cb4582ef6ec899814aefd3f8cd
 // contract address:    0x1f95914Fb1D95d733A0824F5456D3Ca1Fe60e27f
