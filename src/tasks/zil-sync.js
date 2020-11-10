const bunyan = require('bunyan');
const BN = require('bn.js');
const config = require('../config/firebase');

const totalDragons = require('../zil/total-supply');
const getDragons = require('../zil/get-dragons');

const { addDragons, getLastDragon } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'zil-sync' });
const firebaseKEY = config.key;

async function synchronization() {
  const amountForSet = 20;
  const _one = new BN(1);

  const lastDragonId = await totalDragons();
  let [lastDragon] = await getLastDragon(firebaseKEY);

  if (!lastDragon) {
    lastDragon = {
      id: 1
    }
  }

  const _startIndex = new BN(lastDragon.id);
  let _endIndex = new BN(lastDragonId);

  log.info(
    'amount of dragons: ',
    lastDragonId,
    'last dragonID: ',
    lastDragon.id
  );

  if (_startIndex.gte(_endIndex)) {
    log.info('all dragons has synchronized!');

    // return null;
  }

  const dragonsForSync = [];

  for (let index = new BN(_startIndex); index.lte(_endIndex); index = index.add(_one)) {
    dragonsForSync.push(String(index));

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
    log.error(`has not been synchronized.`, err);
  }
};

synchronization();

setInterval(() => {
  log.info('Run schedule!');
  synchronization();
}, 50000);
