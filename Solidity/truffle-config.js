require('babel-register');
require('babel-polyfill');
module.exports = {


  networks: {
    development: {
        host: "127.0.0.1",     // Localhost (default: none) Host Ganache is RPC SERVER
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none) 
       },

      
  },
  rinkeby: {
    host: "localhost",
    port: 8545,
    network_id: 4,
    gas: 4700000
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',  
 
  compilers: {
    solc: {
      version: "^0.8.0", 
      optimizer:{
        enabled:'true',
        runs: 200
      }           
    }
  }, 
};
