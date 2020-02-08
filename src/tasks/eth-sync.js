const bunyan = require('bunyan');

const config = require('../config/firebase');

const totalDragons = require('../eth/total-dragons');
const getDragons = require('../eth/dragons');

const { addDragons, getLastDragon } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'eth-sync' });
const firebaseKEY = config.key;

async function synchronization() {
  const amountForSet = 30;

  const lastDragonId = await totalDragons();
  let [lastDragon] = await getLastDragon(firebaseKEY);

  if (!lastDragon) {
    lastDragon = {
      id: 0
    }
  }

  const startIndex = Number(lastDragon.id) + 1;
  const endIndex = Number(lastDragonId);

  log.info(
    'amount of dragons: ',
    lastDragonId,
    'last dragonID: ',
    lastDragon.id
  );

  if (startIndex === endIndex) {
    log.info('all dragons has synchronized!');

    return null;
  }

  const dragonsForSync = [];

  for (let index = startIndex; index < endIndex; index++) {
    dragonsForSync.push(index);

    if (dragonsForSync.length >= amountForSet) {
      break;
    }
  }

  try {
    const dragons = await getDragons(dragonsForSync);
    const toFirebase = dragons.map((dragon) => ({
      ...dragon,
      egg: false,
      dragon: false
    }));
  
    await addDragons(toFirebase, firebaseKEY);

    log.info(`${dragonsForSync.length} dragons has been synchronized.`);
  } catch (err) {
    log.error(`dragon ${index} has not been synchronized.`, err);
  }
};

module.exports = synchronization;
