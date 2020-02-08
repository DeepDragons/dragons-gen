const bunyan = require('bunyan');

const totalDragons = require('../eth/total-dragons');
const getGensById = require('../eth/gens');

const { setDragon } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'eth-sync' });

async function synchronization() {
  const maxErrors = 10;
  const lastDragonId = await totalDragons();
  let numberOfErrors = 0;

  log.info('number of dragons:', lastDragonId);

  for (let index = 1; index < lastDragonId; index++) {
    try {
      const dragon = await getGensById(index);

      dragon.generated = false;

      await setDragon(dragon);

      log.info(`dragon ${dragon.id} has been synchronized.`);
    } catch (err) {
      log.error(`dragon ${index} has not been synchronized.`, err);

      numberOfErrors++;
    }

    if (numberOfErrors >= maxErrors) {
      log.warn('limit reached %s', maxErrors);

      return null;
    }
  }
};

synchronization();
