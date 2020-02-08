const Web3 = require('web3');

const config = require('../config/eth');
const dragonethMainABI = require('./ABI/dragon_eth.json');
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider));

const dragoneth = new web3.eth.Contract(
  dragonethMainABI,
  config.contracts.main
);

function totalDragons() {
  return dragoneth
    .methods
    .totalDragons()
    .call();
};

module.exports = totalDragons;
