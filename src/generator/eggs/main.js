const exec   = require('child_process').exec;
const bunyan = require('bunyan');

const aura   = require('./aura');
const bodies = require('./bodies');
const horns  = require('./horns');
const scales = require('./scales');
const spots  = require('./spots');
const tails  = require('./tails');
const wings  = require('./wings');
const egg    = require('./egg');

const colorScheme = require('../genes/main');
const config      = require('../config');

const log = bunyan.createLogger({ name: 'eggs-generator' });

class GenEggs {
  /**
   * @class: Class asynchronously generates fragments of an egg.
   * @param {gens}: String with genes.
   * @param {id}: Eggs id.
   */
  constructor(gens, id = null, stage) {
    this.scheme = colorScheme.scheme(gens);
    this.id = id;
    this.data = {};
    this.stage = stage;
    this.done = false;
  }

  onGenerateAnEgg() {
    let names = [];
    let k = 1;
    let bufer = {};

    Object.keys(this.data).forEach(item => {
      names.push(this.data[item]);
    });

    return egg.genBufer(names[0], names[k]).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).then(data => {
      k++;
      bufer = data.out;
      return egg.genBufer(data.out, names[k]);
    }).catch(err => {
      return egg.writeBufer(bufer, this.id);
    }).catch((err) => {
      log.error('fail to generete', err);
    }).then(() => {
      this.onDeleteFragments(names);

      return { status: 'done' };
    });
  }

  onGenerateFragments() {
    let k = 0;
    
    // Generation order. //
    let orderAura   = 0;
    let orderBodies = 3;
    let orderHorns  = 6;
    let orderScales = 5;
    let orderSpots  = 4;
    let orderWings  = 1;
    let orderTails  = 2;

    let spotsColor = colorScheme.getColorFromSchema(
      this.scheme.color_scheme, this.scheme.spots.gen_color
    );
    let bodyColor = colorScheme.getColorFromSchema(
      this.scheme.color_scheme, this.scheme.bodies.gen_color
    );

    let colorFailSpots = JSON.stringify(spotsColor) == JSON.stringify(bodyColor);
    
    if (colorFailSpots) {
      this.scheme.spots.gen_number = 0;
    }

    return Promise.all([
      aura(this.scheme.aura, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment aura-generated');
        k++;
        this.data[orderAura] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('aura-skip', err);
        if (err) k++;
      }),
      bodies(this.scheme.bodies, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment bodies-generated');
        k++;
        this.data[orderBodies] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('bodies-skip', err);
        this.done = null;
        if (err) k++;
      }),
      horns(this.scheme.horns, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment horns-generated');
        k++;
        this.data[orderHorns] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('horns-skip', err);
        if (err) k++;
      }),
      scales(this.scheme.scales, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment scales-generated');
        k++;
        this.data[orderScales] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('scales-skip', err);
        if (err) k++;
      }),
      spots(this.scheme.spots, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment spots-generated');
        k++;
        this.data[orderSpots] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('spots-skip', err);
        if (err) k++;
      }),
      wings(this.scheme.wings, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment wings-generated');
        k++;
        this.data[orderWings] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('wings-skip', err);
        if (err) k++;
      }),
      tails(this.scheme.tails, this.id, this.scheme.color_scheme).then(data => {
        log.info('Egg fragment tails-generated');
        k++;
        this.data[orderTails] = data.out;
        if (k >= 7) {
          return this.onGenerateAnEgg();
        }
      }).catch(err => {
        log.warn('tails-skip', err);
        if (err) k++;
      })
    ])
    .then((el) => el.filter(Boolean)[0]);
  }

  onDeleteFragments(names) {
      /**
       * @method: Deletes fragments asynchronously.
       * @returns {void};
       */
      names.map(item => {
        const file = `rm -f ${config.out}/eggs/${item}.png`;
        log.warn('exec', file);
        exec(file)
      });
  }

}


module.exports = GenEggs;
