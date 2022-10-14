// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC165.sol';
import './interfaces/IERC721.sol';


/*
Building out the minting function:
a. Nft to point to an address
b. Keep track of the token ids
c. keep track of token owner addresses to token ids
d. Keep track of how many tokens an owner address has
e. Create an event that emits a transfer log - contract address, where it is being minted to and the id.


*/

contract ERC721 is ERC165, IERC721 {

    

    



   // event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

   // event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    // Mapping in solidity creates a hash table of key pair values
    // Mapping from token id to the owner
    mapping(uint256 => address) private _tokenOwner;

    mapping(address => uint256) private _OwnedTokensCount;

    mapping(uint256 => address) private _tokenApprovals;

    

     constructor(){
      _registerInterface(bytes4(keccak256('balanceOf(bytes4)')^
      keccak256('ownerOf(bytes4)')^keccak256('transferFrom(bytes4)')));

    }

     
     
    function balanceOf(address _owner) public override  view returns(uint256){

     require(_owner != address(0), 'owner query for non-existent token');
     return _OwnedTokensCount[_owner];

     //Make balanceOf return string

    } 

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) public override view returns (address){

        address owner = _tokenOwner[_tokenId];

         require(owner != address(0), 'owner query for non-existent token');

        return owner; 
    }



    function _exists(uint256 tokenId) internal view returns(bool){
        // Setting the address of nft owner to check the mapping
        // of the address from tokenOwner at the tokenId
        address owner = _tokenOwner[tokenId];
        // Return truthiness that address is not zero
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {


       // Requires that the address isnt zero
       require(to != address(0), 'ERC721: minting to the zero address');

       // Requires that the token does not already exists
        require(!_exists(tokenId), 'ERC721: Token already minted');

        // We are adding a new address with a token id for minting
      _tokenOwner[tokenId] = to;

       // Keeping track of each address that is minting and adding one
      //_OwnedTokensCount[to] = _OwnedTokensCount[to] + 1;

      _OwnedTokensCount[to] += 1;

      emit Transfer(address(0), to, tokenId);

    }

     /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer

    //This is not a safe function
    function _transferFrom(address _from, address _to, uint256 _tokenId) internal{
     
     require(_to != address(0), 'Error - ERC721 Transfer to zero address');

     //require(_tokenOwner[_tokenId] == _from , 'ERC721: Token not owned by address');

     require(ownerOf(_tokenId) == _from , 'ERC721: Token not owned by address');

      _OwnedTokensCount[_from] -= 1;

      _OwnedTokensCount[_to] += 1;

     _tokenOwner[_tokenId] = _to;

     emit Transfer(_from, _to, _tokenId);

    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }
    

   // 1. Require that the person approving is the owner
   // 2. We are approving an address to a token (tokenId)
   // 3. Require that we cant approve sending tokens of the owner to the owner(current caller)
   // 4. Update the map of the approval addresses 
    function approve(address _to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(_to != owner, 'Error - approval to current owner');
        require(msg.sender == owner, 'Current caller is not the owner of the token');
        _tokenApprovals[tokenId] = _to;

        emit Approval(owner, _to, tokenId);

    } 

    function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns(bool){
        require(_exists(tokenId), 'token does not exist');

        address owner = ownerOf(tokenId);

        //openzeppelin library contains ERC721 that contains hints for the rest of approval functionality

       // return (spender == owner || getApproved(tokenId) == spender);

       return (spender == owner);
    }


}