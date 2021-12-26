// SPDX-License-Identifier: GPL-3.0

// remixd -s /Users/Kemosabe/Desktop/NFT_Dapp/ -u https://remix.ethereum.org
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "./@rarible/royalties/contracts/RoyaltiesV2Impl.sol";
import "./@rarible/royalties/LibPart.sol";
import "./@rarible/royalties/LibRoyaltiesV2.sol";

contract foranimals is ERC721Enumerable, Ownable, RoyaltiesV2Impl {
  using Strings for uint256;
  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = 0.1 ether;
  uint256 public maxSupply = 12500;
  uint256 public maxMintAmount = 120;
  uint256 public percentage = 10;
  uint256 public discount = 25;
  bool public paused = false;
  bool public revealed = false;
  bool public onlyWhitelisted = true;
  address public charityAddress = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
  mapping(address => bool) public whitelisted;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _notRevealedURI


  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_notRevealedURI);

    // mint(msg.sender, 20);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function nextToBeMinted(uint256 supply)internal pure returns(uint){
    if (supply <= 9880){
      return supply + 120;
    }
    else{
      return 10000;
      
      }

  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = nextToBeMinted(totalSupply());
    require(!paused, "the contract is paused");
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(_mintAmount <= maxMintAmount, "max mint amount per session exceeded");
    require(supply + _mintAmount <= maxSupply-2500, "max NFT limit exceeded");

    if (msg.sender != owner()) {
        if(onlyWhitelisted == true) {
            require(whitelisted[msg.sender] == true, "user is not whitelisted");
        }
        if(whitelisted[msg.sender] == true){
            require(msg.value >= (cost-(cost * discount/100))* _mintAmount, "insufficient funds");
        }else{
            require(msg.value >= cost * _mintAmount, "insufficient funds");
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      setRoyalties(supply+i, payable(owner()), 700);
      _safeMint(_to, supply + i);
    }
  }
  function mintToOwner(uint256 _from, uint256 _to) public onlyOwner{

    for (uint256 i = _from; i <= _to; i++){
      _safeMint(owner(), i);

    }


  }
  function presents(address _to, uint _tokenId)public{
        require(!paused, "the contract is paused");
        require(_tokenId<=2500, "You need to own one of the first 2500 NFTs");
        require(ownerOf(_tokenId) == msg.sender, "You don't own this NFT");
          _safeMint(_to, _tokenId + 10000);
        

  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }
  function setPercentage(uint256 _newPercentage) public onlyOwner{
    require(_newPercentage >= 0 && _newPercentage <= 50, "Percentage must be between 0 and 50");
    percentage = _newPercentage;
  }
  function setDiscount(uint256 _newDiscount) public onlyOwner{
    require(_newDiscount >= 0 && _newDiscount <= 99, "Discount must be between 0 and 99");
    discount = _newDiscount;
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }
  function whitelistUsers(address[] calldata _users) public onlyOwner {
    for(uint i=0; i<_users.length; i++){
          whitelisted[_users[i]] = true;

    }
  }
  function mintPreordered(address[] calldata _users) public onlyOwner {
     uint256 supply = nextToBeMinted(totalSupply());
    for(uint i=0; i<_users.length; i++){
  
    require(supply <= maxSupply-2500, "max NFT limit exceeded");

        _safeMint(_users[i], supply + i + 1);


    }
  }
  function setOnlyWhitelisted(bool _state) public onlyOwner {
    onlyWhitelisted = _state;
  }
   function reveal() public onlyOwner {
      revealed = true;
  }
  function isWhitelisted(address _user) view public onlyOwner returns(bool){
    return whitelisted[_user];
  }
  function setCharityAddress(address _newCharityAddress) public onlyOwner{
    charityAddress = _newCharityAddress;
  }
  function setRoyalties(uint _tokenId, address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner{
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

  function withdraw() public payable onlyOwner {

    // This account has the funds to be donated
    // =============================================================================
    (bool hs, ) = payable(charityAddress).call{value: address(this).balance * percentage / 100}("");
    require(hs);
    
    // This will payout the developers the rest to maintain the project
    // =============================================================================
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}
