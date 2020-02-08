const bunyan = require('bunyan');
const totalDragons = require('../eth/total-dragons');
const log = bunyan.createLogger({ name: 'eth-sync' });

async function synchronization() {
  const lastDragonId = await totalDragons();

  console.log(lastDragonId);
};

synchronization();
