// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Instance refers to a truffle-contract object, which represents the DToken contract deployed on the network.

//This object exposes all the public and external functions of the DToken contract.

/*contract ExchangeTokens {

    address tokenToSend;

    function claimTokens(address tokenSent) {
        uint256 numTokens = ERC20(tokenSent).allowance(msg.sender, this);
        if (numTokens > 0) {
            ERC20(tokenSent).transferFrom(msg.sender, this, numTokens);
            ERC20(tokenToSend).transfer(msg.sender, numTokens);
        }
    }
}*/

/*TokenInterface _instance = TokenInterface('tokenContractAddress')

The function will be then:

function claimTokens () public onlyWhitelisted returns (bool){
                require(!_investors[msg.sender].claimed);
                TokenInterface _instance = TokenInterface('the_token_contract_address');
                uint tokensToBeClaimed =  _investors[msg.sender].invested * ratio;
                _investors[msg.sender].claimed = true;                   
                _instance.transfer(contractAddress, msg.sender, tokensToBeClaimed));
                return true;
            }*/


//Use ERC20 interface
contract UnconsciousEnergyToken {
    //Name
    string public name = "Unconscious Energy Token";
    string public symbol = "UE";
    //Standard not part of the ERC20
    string public standard = "Unconscious Energy v0.1";
    //Symbol
    address public minter;

    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens
    //totalSupply.toNumber()
    //web3.eth.getAccounts()
    //truffle(development)> let accounts = await web3.eth.getAccounts()
    //truffle(development)> accounts[0]

    //Totalsupply limited to uint256 type: (2^256)-1
    //To have infinite supply erase all checks on totalSupply
    // Put initial supply to 0 and then increase token count
    //uint256 public _totalSupply ;
    //Supply is 1 eth 18 decimals plus 6 zeros for it to be 1 million tokens
     uint256 public totalSupply = 1000000000000000000000000000; // 1 milion tokens
   // ETH has 18 decimals
    uint8 public decimals = 18;

    // mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public balanceOf;
    //Allowance is a function in ERC20 standard
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

  
  // InitialSupply gets set by giving the total supply to msg_sender/the address that created the transaction

    constructor() {
        minter = msg.sender;
       // balanceOf[msg.sender] = totalSupply;

        //_totalSupply = _initialSupply;
        // allocate initial supply
        //initialSupply = 10000000000;
        //totalSupply_ = _initialSupply * 10 ** uint(decimals);
        //balance[owner] = totalSupply_;
    }

    //Transfer
    //Exception if account doesn't have enough
    //Return a boolean
    //Transfer the balance
    // Transfer Event

    function mint(address reciever, uint256 amount) public {
       require(msg.sender == minter);

       balanceOf[reciever] += amount;
       

        /*require(account != address(0), "ERC20: mint to the zero address");
         _balances[account] += amount;
        emit Transfer(address(0), account, amount);*/
    }

    function mint2(address account, uint256 amount) external {
        require(account != address(0), "ERC20: mint to the zero address");
        

        _beforeTokenTransfer(address(0), account, amount);

        totalSupply -= amount;
        
        unchecked {
        balanceOf[account] += amount;
        }
        

      emit Transfer(address(0), account, amount);
         
         _afterTokenTransfer(address(0), account, amount);

    }

   function claimTokens(address _to, uint256 _value) public returns (bool success){
    //_value = generatedTokens from EEGData
           require(_value > 0, "There are no tokens to be claimed");
           allowance[msg.sender][_to] = _value;

           emit Approval(msg.sender, _to, _value);
           
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;


   }

   function totalSupply2() public view virtual returns (uint256){
    return totalSupply;
   }

    function balanceOf2(address account) public view virtual returns (uint256){
    return balanceOf[account];
   }



 

   /*function decimals() public view virtual returns (uint8){
    return 18;
   }*/

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

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
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        //allowance[_from][msg.sender] -= _value;
        allowance[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function _beforeTokenTransfer(
        address from,
        address to, 
        uint256 amount
    ) internal virtual{}

    
    function _afterTokenTransfer(
        address from,
        address to, 
        uint256 amount
    ) internal virtual{}
}
