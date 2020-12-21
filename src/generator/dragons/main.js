const config = require('../config');

const exec   = require('child_process').exec;
const bunyan = require('bunyan');

const colorScheme = require('../genes/main');

const aura   = require('./aura');
const bodies = require('./bodies');
const eyes   = require('./eyes');
const heads  = require('./heads');
const horns  = require('./horns');
const paws   = require('./paws');
const scales = require('./scales');
const spots  = require('./spots');
const tails  = require('./tails');
const wings  = require('./wings');
const dragon = require('./dragon');
  
const log = bunyan.createLogger({ name: 'dragon-generator' });

class GenDragon {
  constructor(gens, id) {
    this.scheme = colorScheme.scheme(gens);
    this.id = id;
    this.data = {};
    this.stage = 'dragon';
    this.done = false;
    this.gens = gens;
  }

  onGenerateAnDragon() {
    let names = [];
    let k = 1;
    let bufer = {};

    log.info('init generate dragonID:', this.id);

    Object.keys(this.data).forEach(item => {
      names.push(this.data[item]);
    });

    return dragon.genBufer(names[0], names[k]).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return dragon.genBufer(data.out, names[k]);
    }).catch(err => {
        // return dragon.writeBufer(bufer, this.id);
    }).then(() => {
      this.onRemoveFragments(names);
      return dragon.writeBufer(bufer, this.id);
    }).catch(err => {
      return { status: 'fail', message: err.message }
    });
  }

  onGenerateFragments() {
    let k = 0;
    let kMax = 10;
    
    // Generation order. //
    let orderAura   = 0;
    let orderWings  = 1;
    let orderPawsR  = 2;
    let orderBodies = 3;
    let orderTails  = 4;
    let orderScales = 5;
    let orderPawsL  = 6;
    let orderHornsR = 7;
    let orderHeads  = 8;
    let orderHornsL = 9;
    let orderEyes   = 10;
    let orderSpots  = 11;

    return Promise.all([
      aura(this.scheme.aura, this.id, this.scheme.color_scheme).then(data => {
        log.info('aura-generated');
        k++;
        this.data[orderAura] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('aura-skip:', err);
        if (err) k++;
      }),
      eyes(this.scheme.eyes, this.id, this.scheme.color_scheme).then(data => {
        log.info('eyes-generated');
        k++;
        this.data[orderEyes] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
          this.done = null;
          log.warn('eyes-skip:', err);
          if (err) k++;
      }),
      heads(this.scheme.head, this.id, this.scheme.color_scheme).then(data => {
        log.info('heads-generated');
        k++;
        this.data[orderHeads] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        this.done = null;
        log.warn('heads-skip:', err, this.scheme.head, this.id);
        if (err) k++;
      }),
      paws(this.scheme.paws, this.id, this.scheme.color_scheme).then(data => {
        log.info('paws-generated');
        k++;
        this.data[orderPawsR] = data.out[1];
        this.data[orderPawsL] = data.out[0];
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('paws-skip:', err);
        if (err) k++;
      }),
      spots(this.scheme.spots, this.id, this.scheme.color_scheme).then(data => {
        log.info('spots-generated');
        k++;
        this.data[orderSpots] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('spots-skip:', err);
        if (err) k++;
      }),
      bodies(this.scheme.bodies, this.id, this.scheme.color_scheme).then(data => {
        log.info('bodies-generated');
        k++;
        this.data[orderBodies] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        this.done = null;
        log.warn('bodies-skip:', err);
        if (err) k++;
      }),
      horns(this.scheme.horns, this.id, this.scheme.color_scheme).then(data => {
        log.info('horns-generated');
        k++;
        this.data[orderHornsL] = data.out[0];
        this.data[orderHornsR] = data.out[1];
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('horns-skip:', err);
        if (err) k++;
      }),
      scales(this.scheme.scales, this.id, this.scheme.color_scheme).then(data => {
        log.info('scales-generated');
        k++;
        this.data[orderScales] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('scales-skip:', err);
        if (err) k++;
      }),
      wings(this.scheme.wings, this.id, this.scheme.color_scheme).then(data => {
        log.info('wings-generated');
        k++;
        this.data[orderWings] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('wings-skip:', err);
        if (err) k++;
      }),
      tails(this.scheme.tails, this.id, this.scheme.color_scheme).then(data => {
        log.info('tails-generated');
        k++;
        this.data[orderTails] = data.out;
        if (k >= kMax) {
          return this.onGenerateAnDragon();
        }
      }).catch(err => {
        log.warn('tails-skip:', err);
        if (err) k++;
      })
    ]).then((el) => {
      log.info('dragonID:', this.id, 'has been generated.');

      return el.filter(Boolean)[0];
    });
  }

  onRemoveFragments(names) {
    names.map(item => {
      const file = `rm -f ${config.out}/dragons/${item}.png`;
      log.warn('exec', file);
      exec(file)
    });
  }
}


module.exports = GenDragon;
