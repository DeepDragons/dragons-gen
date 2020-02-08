const bunyan = require('bunyan');

const config = require('../config/firebase');

const { GenEggs } = require('../generator');
const { getNonGenerated } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'eth-egg-generator' });
const firebaseKEY = config.key;

async function eggGenerator() {
  log.info('run egg generator.');

  const needGenerate = await getNonGenerated(firebaseKEY);

  const needToGenerate = await Promise.all(needGenerate.map(async (dragon) => {
    const egg = new GenEggs(dragon.genColor, dragon.id);
    const result = await egg.onGenerateFragments();

    return {
      ...result,
      ...dragon
    };
  }));

  console.log(needToGenerate);
}

eggGenerator();
