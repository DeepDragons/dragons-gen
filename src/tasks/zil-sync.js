// const getGens = require('../zil/get-gens');
// const { gensToString, parseGens } = require('../zil/gen-parser');
// const { GenEggs } = require('../generator');

// async function main() {
//   const dragonID = '1';
//   const gens = await getGens(dragonID);
//   const parsedGens = parseGens(gens);
//   const validatedGens = gensToString(parsedGens);
//   const instance = new GenEggs(validatedGens, dragonID);

//   const result = await instance.onGenerateFragments();

//   console.log(result);
// }

// main();

const bunyan = require('bunyan');

const config = require('../config/firebase');

const totalDragons = require('../zil/total-supply');
const getDragonGens = require('../zil/get-gens');

const { addDragons, getLastDragon } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'zil-sync' });
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

  const startIndex = Number(lastDragon.id);
  const endIndex = Number(lastDragonId) + 1;

  log.info(
    'amount of dragons: ',
    lastDragonId,
    'last dragonID: ',
    lastDragon.id
  );

  if (Number(lastDragonId) === Number(lastDragon.id)) {
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

synchronization();

setInterval(() => {
  log.info('Run schedule!');
  synchronization();
}, 10000);
