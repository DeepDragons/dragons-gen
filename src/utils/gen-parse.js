const Web3 = require('web3');
const web3 = new Web3();

module.exports = function genParse(genNumber, padLeft) {
  let gens = web3.utils.toHex(genNumber);
  let genStr = '';

  gens = web3.utils.padLeft(gens, padLeft);
  gens = gens.split(/(..)/g);
  gens = gens.map(el => parseInt(el, 16));
  gens.forEach(el => {
      if (!isNaN(el)) genStr += `${el}-`;
  });

  genStr = genStr.substring(0, genStr.length - 1);

  return genStr;
};
