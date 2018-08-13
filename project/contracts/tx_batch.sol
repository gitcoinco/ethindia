pragma solidity ^0.4.11;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control 
 * functions, this simplifies the implementation of "user permissions". 
 */
contract Ownable {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }
 
  modifier onlyOwner() {
    if (msg.sender != owner) {
      revert();
    }
    _;
  }
 
  function transferOwnership(address newOwner)  public onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }

}

contract ERC20Basic {
  uint public totalSupply;
  function balanceOf(address who) constant public returns (uint);
  function transfer(address to, uint value) public;
  event Transfer(address indexed from, address indexed to, uint value);
}
 
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) constant public returns (uint);
  function transferFrom(address from, address to, uint value) public;
  function approve(address spender, uint value) public;
  event Approval(address indexed owner, address indexed spender, uint value);
}

contract Txbatch is Ownable {
    
    constructor() public payable{
        
    }

    function getauthur() constant public returns(string){
      return "abhi"; 
    }

    function multisend(address _tokenAddr, address[] dests, uint256[] values)
    onlyOwner public
    returns (uint256) {
        uint256 i = 0;
       // ERC20(_tokenAddr).approve(address(this), sum);
        while (i < dests.length) {
           ERC20(_tokenAddr).transferFrom(msg.sender, dests[i], values[i]);
           i += 1;
        }
        return(i);
    }
}