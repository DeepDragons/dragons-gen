const bunyan = require('bunyan');

const config = require('../config/firebase');

const { GenEggs } = require('../generator');
const cloudinaryUpload = require('../services/cloudinary');
const { getNonGenerated, generatedUpdate } = require('../services/firebase');

const log = bunyan.createLogger({ name: 'zilliqa-eggs-generator' });
const firebaseKEY = config.key;
const dragonType = 'egg';
const limit = 5;

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

    if (!result || !result.status || result.status !== 'done') {
      await generatedUpdate(
        [dragon],
        firebaseKEY,
        dragonType,
        false
      );

      log.error('wrong generate dragon status:', result);
    } else {
      try {
        await cloudinaryUpload(dragon.id, dragonType, 0);
        log.info('eggID:', dragon.id, 'has been uploaded');
      } catch (err) {
        log.error('cloudinary fail upload img', err);
        await generatedUpdate(
          [dragon],
          firebaseKEY,
          dragonType,
          false
        );
      }
    }

    log.info('eggID:', dragon.id, 'has been generated.');

    return {
      ...result,
      ...dragon
    };
  }));
}

eggGenerator();

setInterval(() => {
  log.info('Run schedule!');
  eggGenerator();
}, 100000);
