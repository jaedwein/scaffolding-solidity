//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Vault {
    string private variable;
    uint256 private totalSupply; //por defecto inicializa en cero

    constructor() {
        //console.log("Deploying a Vault");
    }

    function addSupply(uint256 quantity) public {
        require(quantity > 0, "Quantity should be greater than 0");
        totalSupply += quantity;
    }

    function removeSupply(uint256 quantity) public {
        require(quantity > 0, "Quantity should be greater than 0");
        require(
            quantity <= totalSupply,
            "Quantity should be less than totalSupply"
        );
        totalSupply -= quantity;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
}
