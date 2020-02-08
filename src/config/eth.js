require('custom-env').env();

module.exports = {
  provider: process.env.PROVIDER,
  contracts: {
    main: process.env.DRAGONETH
  }
};
