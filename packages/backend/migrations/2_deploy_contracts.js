const Metawise = artifacts.require("Metawise");
const UnconsciousEnergyToken = artifacts.require("UnconsciousEnergyToken");
//const MetawiseNFTMarket = artifacts.require("MetawiseNFTMarket");



//initial and deploy for js deploy files are name conventions that truffle scans 

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Metawise);
    await  deployer.deploy(UnconsciousEnergyToken);
    //await deployer.deploy(MetawiseNFTMarket);
      
  
  

  
  };
