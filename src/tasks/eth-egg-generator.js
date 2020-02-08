const bunyan = require('bunyan');

const config = require('../config/firebase');

const { GenEggs } = require('../generator');
const { getNonGenerated, generatedUpdate } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'eth-egg-generator' });
const firebaseKEY = config.key;
const dragonType = 'egg';
const limit = 1;

async function eggGenerator() {
  log.info('run egg generator.');

  const needGenerate = await getNonGenerated(
    firebaseKEY,
    dragonType,
    limit
  );

  await generatedUpdate(
    needGenerate,
    firebaseKEY,
    dragonType,
    true
  );

  return await Promise.all(needGenerate.map(async (dragon) => {
    log.info('try generate eggID:', dragon.id);
    
    const instance = new GenEggs(dragon.genColor, dragon.id);
    const result = await instance.onGenerateFragments();

    if (result.status !== 'done') {
      await generatedUpdate(
        [dragon],
        firebaseKEY,
        dragonType,
        false
      );

      log.error('wrong generate dragon status:', result);
    }

    log.info('eggID:', dragon.id, 'has been generated.');

    return {
      ...result,
      ...dragon
    };
  }));
}

eggGenerator();
