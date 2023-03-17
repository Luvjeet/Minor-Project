const Types = artifacts.require("Types");
const Voting = artifacts.require("Voting");

module.exports = async function (deployer, network) {
  let add = await web3.eth.getAccounts();
  console.log(add);
  deployer.deploy(Types);
  deployer.link(Types, Voting);
  deployer.deploy(Voting, 1672752871000, 1674912848000);
};
