
var Crud = artifacts.require("TaskCrud");

module.exports = function(deployer) {
  deployer.deploy(Crud);
};
