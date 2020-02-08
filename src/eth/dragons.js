const Web3 = require('web3');

const config = require('../config/eth');
const genParse = require('../utils/gen-parse');
const dragonethMainABI = require('./ABI/proxy.json');
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider));

const dragonethProxy = new web3.eth.Contract(
  dragonethMainABI,
  config.contracts.proxy
);

async function getDragons(ids) {
  const dragons = await dragonethProxy
    .methods
    .getDragons(ids)
    .call();

  let data = [];

  const iterator = 17;

  for (let index = 0; index < dragons.length; index += iterator) {
    if (dragons[index + 1]) {
      data.push({
        id:                 String(dragons[index + 1]),
        owner:              web3.utils.toHex(dragons[index + 2]),
        genColor:           genParse(web3.utils.toHex(dragons[index + 3]), 64),
        nextBlock2Action:   String(dragons[index + 4]),
        stage:              String(dragons[index + 5]),
        currentAction:      String(dragons[index + 6]),
        battleGen:          genParse(web3.utils.toHex(dragons[index + 7]), 62),
        lastActionID:       String(dragons[index + 8]),
        lastActionDragonID: String(dragons[index + 9]),
        fightWin:           String(dragons[index + 10]),
        fightLose:          String(dragons[index + 11]),
        children:           String(dragons[index + 12]),
        fightToDeathWin:    String(dragons[index + 13]),
        mutagenFace:        String(dragons[index + 14]),
        mutagenFight:       String(dragons[index + 15]),
        genLabFace:         String(dragons[index + 16]),
        genLabFight:        String(dragons[index + 17]),
      });
    }
  }

  return data;
};
module.exports = getDragons;