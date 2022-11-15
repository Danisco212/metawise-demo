// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract Metawise is ERC721Connector{

    //Array to store our nfts
    //Change name to MetawiseNFT, name in progress
    //Metawise = MW
    //uint256[] public metawiseNFT;
    string[] public metawiseNFT;

    // Implement standard as an attribute


    mapping(string => bool) _metawiseExists; 
    // mapping(uint256 => bool) _metawiseExists;

    // Change mint function to have number of NFTs as parameter
    //string memory _metawiseNFT parameter
    function mint(string memory _metawiseNFT) public {

      // require(!_metawiseExists[_metawiseNFT], 'Error - MetawiseNFT already exists');
      require(!_metawiseExists[_metawiseNFT], 'Error - MetawiseNFT already exists');
       
       metawiseNFT.push(_metawiseNFT);
       //metawiseNFT.push();
       uint _id = metawiseNFT.length - 1;

        _mint(msg.sender, _id);

        _metawiseExists[_metawiseNFT] = true;
    }

 constructor () ERC721Connector('MetawiseNFT'){

   
 }

}

