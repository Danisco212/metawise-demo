// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RWD {

   string public name = 'Reward Token';
   string public symbol = 'RWD';
   uint256 totalSupply = 1000000000000000000000; // 1 milion tokens
   // ETH has 18 decimals
   uint8 public decimals = 18;

    // uint256 public totalSupply = 1000000000000000000000; // 1 milion tokens
   // ETH has 18 decimals
   //uint8 public decimals = 18;

     // mapping(address => uint256) public balanceOf;
    mapping(address => uint256) private balances;
    //Allowance is a function in ERC20 standard
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );




    constructor() {
        balances[msg.sender] = totalSupply;

        //_totalSupply = _initialSupply;
        // allocate initial supply
        //initialSupply = 10000000000;
        //totalSupply_ = _initialSupply * 10 ** uint(decimals);
        //balance[owner] = totalSupply_;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        //The ERC-20 standard allows an address to give an allowance to another address to be able to retrieve tokens from it.
        //This getter returns the remaining number of tokens that the spender will be allowed to spend on behalf of owner .
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }
      //transferFrom enables third party clients to interact with the smart contract 
    function transferFrom( address _from, address _to, uint256 _value ) public returns (bool success) {
        require(_value <= balances[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balances[_from] -= _value;
        balances[_to] += _value;

        //allowance[_from][msg.sender] -= _value;
        allowance[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}