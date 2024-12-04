// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Beluga{

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply; 
    address public owner;
    
    // BALANCES
    mapping(address=>uint256) private balances;

    // ALLOWANCES
    mapping(address=>mapping(address=>uint256)) private allowances;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // INITIATE AND SEND TOKEN TO OWNER
    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply_){
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
        totalSupply = totalSupply_;
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function balanceOf(address owner) public view returns(uint256){
        return balances[owner];
    }

    function transfer(address to, uint256 amount) public returns(bool){
        require(balances[msg.sender]>=amount,"Insufficient balance");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public returns(bool){
        require(balances[from]>=amount,"Insufficient balance");
        require(allowances[from][msg.sender]>=amount,"Allowance exceeded");
        balances[from]-=amount;
        balances[to]+=amount;
        allowances[from][msg.sender]-=amount;
        return true;
    }

    function approve(address spender, uint256 amount) public returns(bool){
        allowances[msg.sender][spender] = amount;
        return true;
    }

    function allowance(address owner, address spender) public view returns(uint256){
        return allowances[owner][spender];
    }

    function mint(address to, uint256 amount) public onlyOwner returns(bool){
        balances[to]+=amount;
        totalSupply+=amount;
        return true;
    }

    function burn(uint256 amount) public returns(bool){
        require(balances[msg.sender]>=amount,"Insufficient balance");
        balances[msg.sender]-=amount;
        totalSupply-=amount;
        return true;
    }

}
