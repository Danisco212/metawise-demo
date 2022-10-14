const Metawise = artifacts.require("Metawise");
const UnconsciousEnergyToken = artifacts.require("UnconsciousEnergyToken");
const UnconsciousEnergyTokenSale = artifacts.require("UnconsciousEnergyTokenSale");
//const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

//initial and deploy for js deploy files are name conventions that truffle scans 

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Metawise);
    await  deployer.deploy(UnconsciousEnergyToken);
      
      /*, 1000000).then(function(){
      //Token price is 0.001 Ether
      var tokenPrice = 1000000000000000;
      return deployer.deploy(UnconsciousEnergyTokenSale, UnconsciousEnergyToken.address, tokenPrice);
    });*/

    const unconsciousEnergyToken = await UnconsciousEnergyToken.deployed();
    
   // deployer.deploy(RWD);

    await deployer.deploy(DecentralBank, unconsciousEnergyToken.address);
    const decentralBank = await DecentralBank.deployed();

    //await unconsciousEnergyToken.transfer(decentralBank.address, '100000000000000000000000');

   // await unconsciousEnergyToken.transfer(accounts[1], '1000000000000000000000');



  
  };

/*module.exports = function (deployer) {
  deployer.deploy(DappToken, 1000000).then(function(){
    //Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  });
  
};*/