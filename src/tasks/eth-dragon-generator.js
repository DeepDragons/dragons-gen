const bunyan = require('bunyan');

const config = require('../config/firebase');

const { GenDragon } = require('../generator');
const { getNonGenerated, generatedUpdate } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'eth-dragon-generator' });
const firebaseKEY = config.key;
const dragonType = 'dragon';
const limit = 10;

async function dragonGenerator() {
  log.info('run dragon generator.');

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
    log.info('try generate dragonID:', dragon.id);
    
    const instance = new GenDragon(dragon.genColor, dragon.id);
    const result = await instance.onGenerateFragments();

    log.info('eggID:', dragon.id, 'has been generated.');

    if (result.status !== 'done') {
      await generatedUpdate(
        [dragon],
        firebaseKEY,
        dragonType,
        false
      );

      log.error('wrong generate dragon status:', result);
    }

    return {
      ...result,
      ...dragon
    };
  }));
}

dragonGenerator();
