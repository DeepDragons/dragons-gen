const Web3 = require('web3');

const config = require('../config/eth');
const dragonethMainABI = require('./ABI/dragon_eth.json');
const web3 = new Web3(config.provider);

const dragoneth = new web3.eth.Contract(
  dragonethMainABI,
  config.contracts.main
);

function totalSupply() {
  return dragonEth
    .methods
    .totalSupply()
    .call();
};

module.exports = totalSupply;
