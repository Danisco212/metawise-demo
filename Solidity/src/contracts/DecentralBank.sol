// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UnconsciousEnergyToken.sol";

contract DecentralBank {
    string public name = "Decentral Bank";


    address public owner;

    uint256 public totalSupply = 100000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    UnconsciousEnergyToken public UET;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    modifier onlyOwner() {
     require(msg.sender == owner, 'Oops! Not contract owner');
     _;

    }

    constructor(UnconsciousEnergyToken _UET) {
        UET = _UET;

        owner = msg.sender;

    

       //balanceOf[address.this] = totalSupply;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Deposited(address indexed _from, uint256 _amount);

    function depositMoney() public payable {
        emit Deposited(msg.sender, msg.value);
    }

    function withdrawMoney(address _to, uint256 _value) public onlyOwner returns(bool success) {
        payable(_to).transfer(_value);

        return true;
    }

    function getSmartContractBalance() external view returns(uint256) {
        return address(this).balance;
    }



    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // require that the value is greater or equal for transfer
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and subtract the balance
        balanceOf[msg.sender] -= _value;
        // add the balance
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // add the balance for transferFrom
        balanceOf[_to] += _value;
        // subtract the balance for transferFrom
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    //staking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");
        UET.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking Balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        // require the amount to be greater than zero
        require(balance > 0, "staking balance cannot be less than zero");

        // transfer the tokens to the specified contract address from our bank
        UET.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update Staking Status
        isStaking[msg.sender] = false;
    }

    // issue rewards
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9; // Devide by 9 to create percentage incentive for stakers
            if (balance > 0) {
                UET.transfer(recipient, balance);
            }
        }
    }
}
