const Web3 = require('web3');

const config = require('../config/eth');
const web3 = new Web3(config.provider);

function getBlockNumber() {
  return web3.eth.getBlockNumber();
}

module.exports = {
  getBlockNumber
};
