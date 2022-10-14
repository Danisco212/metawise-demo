// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is IERC721Enumerable, ERC721{

uint256[] private _allTokens;

mapping(uint256 => uint256) private _allTokensIndex;

mapping(address => uint256[]) private _ownedTokens;

mapping(uint256 => uint256) private _ownedTokensIndex;  

 constructor(){
      _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^
      keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));

    }



     // @notice Count NFTs tracked by this contract
    // @return A count of valid NFTs tracked by this contract, where each one of
    //  them has an assigned and queryable owner not equal to the zero address
   /* function totalSupply() external view returns (uint256){
        

        return _allTokens.length;
    }*/

    // @notice Enumerate valid NFTs
    // @dev Throws if `_index` >= `totalSupply()`.
    // @param _index A counter less than `totalSupply()`
    // @return The token identifier for the `_index`th NFT,
    //  (sort order not specified)
   // function tokenByIndex(uint256 _index) external view returns (uint256);

    // @notice Enumerate NFTs assigned to an owner
    // @dev Throws if `_index` >= `balanceOf(_owner)` or if
    //  `_owner` is the zero address, representing invalid NFTs.
    // @param _owner An address where we are interested in NFTs owned by them
    // @param _index A counter less than `balanceOf(_owner)`
    // @return The token identifier for the `_index`th NFT assigned to `_owner`,
    //   (sort order not specified)
    //function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

    function _mint(address to, uint256 tokenId) internal override(ERC721){
      super._mint(to, tokenId);
      // 1. Add tokens to the owner
      // 2. All tokens to our total supply - to all Tokens
      _addTokensToAllTokenEnumeration(tokenId);
      _addTokensToOwnerEnumeration(to, tokenId);
    }

     // Add tokens to the _alltokens array and set the position of the tokens indexes
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {

        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);

    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
       // 1. Add address and token id to the _ownerTokens
       // 2. ownedTokensIndex token Id set to address of ownedTokens position
       // We want to execute this function with minting

    

       _ownedTokensIndex[tokenId] = _ownedTokens[to].length;

        _ownedTokens[to].push(tokenId);
    }

    function tokenByIndex(uint256 index) public override view returns(uint256) {
         
         require(index < totalSupply(), 'Global index is out of bounds!');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint index) public override view returns(uint256){
        require(index < balanceOf(owner), 'Owner index is out of bounds!');
        return _ownedTokens[owner][index];
    }

    //return the total supply of the _allTokens array
    function totalSupply() public view returns(uint256){
        

    return _allTokens.length;

    }
}