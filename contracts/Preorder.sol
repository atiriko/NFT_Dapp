// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

contract preorder is Ownable {


  address[] public Preordered;
  uint256 public cost = 0.025 ether;

  function Preorder()public payable{
      require(Preordered.length <= 2500, "Presale has been sold out!");
      require(msg.value >= cost, "You need to pay more than the cost");
      require(!hasUserPreordered(msg.sender), "You can only preorder once");
      Preordered.push(msg.sender);

  }
  function hasUserPreordered(address _address)internal view returns (bool){
         for(uint256 i = 0; i<Preordered.length; i++){

         if(_address == Preordered[i]){
           return true;
         }

        }
        return false;

  }
  // function GetPreorder()public onlyOwner view returns(address[] calldata){
  //     return Preordered;25000000000000000

  // }
   function setPrice(uint256 price)public onlyOwner{
      cost = price;

  }
  function withdraw() public onlyOwner{

    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

}