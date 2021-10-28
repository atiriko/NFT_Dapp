const SmartContract = artifacts.require("foranimals");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "4nimals", "ANML", "https://foranimals.web.app/assets/");
};

