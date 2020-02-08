const globalConfig = require('../../config/generator');

module.exports = {
  eggs: `${globalConfig.dataDir}/eggs`,
  dragons: `${globalConfig.dataDir}/dragons`,
  out: `${globalConfig.dataDir}/tmp`
};
