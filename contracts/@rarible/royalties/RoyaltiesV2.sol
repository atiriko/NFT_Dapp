// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "./LibPart.sol";

interface RoyaltiesV2 {
    event RoyaltiesSet(uint256 tokenId, LibPart.Part[] royalties);

    function getRaribleV2Royalties(uint256 id) external view returns (LibPart.Part[] memory);


} function setRoyalties(uint _tokenId, address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner{
    LibPart.Part[] memory _royalties = new LibPart.Part[](1);
    _royalties[0].value = _percentageBasisPoints;
    _royalties[0].account = _royaltiesRecipientAddress;
    _saveRoyalties(_tokenId, _royalties);
  }
  function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721Enumerable) returns (bool){
    if (interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES){
      return true;
    }
    if(interfaceId == _INTERFACE_ID_ERC2981){
      return true;
    }
    return super.supportsInterface(interfaceId);
  }
 function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    ){
      LibPart.Part[] memory _royalties = royalties[_tokenId];
      if(_royalties.length > 0 ){
        return (_royalties[0].account, (_salePrice * _royalties[0].value)/10000);

      }
      return(address(0), 0);
   
    }