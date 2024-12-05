# Beluga Token (BLGT)

A ERC20 token implementation built on the Ethereum blockchain.

## Overview

Beluga Token (BLGT) is a standard ERC20 token with additional features like minting and burning capabilities. The contract is deployed on the Sepolia testnet and includes essential functionalities for token management and transfer.

## Features

### Basic Token Information
- **Name**: Beluga Token
- **Symbol**: BLGT
- **Decimals**: 0 (Non-divisible tokens)
- **Total Supply**: 10000 BLGT (Initial supply)

### Core Functions

#### Balance and Allowance
- `balanceOf(address owner)`: Check token balance of any address
- `allowance(address owner, address spender)`: Check approved spending limit
- `totalSupply()`: Get the current total supply of tokens

#### Transfer Operations
- `transfer(address to, uint256 amount)`: Direct transfer of tokens
- `transferFrom(address from, address to, uint256 amount)`: Transfer tokens on behalf of another address
- `approve(address spender, uint256 amount)`: Approve address to spend tokens

#### Supply Management
- `mint(address to, uint256 amount)`: Create new tokens
- `burn(uint256 amount)`: Destroy existing tokens

## Contract Details

### Deployment
- **Network**: Sepolia Testnet
- **Contract Address**: 0xa6C6f73020dc554b1EF585EdBf44ca0B07F14b57
- **Block Explorer**: https://sepolia.etherscan.io/address/0xa6C6f73020dc554b1EF585EdBf44ca0B07F14b57
