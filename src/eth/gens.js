const Web3 = require('web3');

const config = require('../config/eth');
const genParse = require('../utils/gen-parse');
const dragonethMainABI = require('./ABI/dragon_eth.json');
const web3 = new Web3(config.provider);

const dragoneth = new web3.eth.Contract(
  dragonethMainABI,
  config.contracts.main
);

async function getGensById(id) {
  const data = await dragoneth
    .methods
    .dragons(Number(id))
    .call();
  const genColor = genParse(data.gen1, 64);
  const batleGen = genParse(data.gen2, 62);

  return {
    genColor: genColor,
    batleGen: batleGen,
    stage: Number(data.stage),
    currentAction: Number(data.currentAction),
    nextBlock2Action: Number(data.nextBlock2Action),
    id: id
  };
};

module.exports = getGensById;