require('custom-env').env();

const { Zilliqa } = require('@zilliqa-js/zilliqa');
const { gensToString, parseGens } = require('./gen-parser');

const provider = process.env.PROVIDER;
const contract = process.env.DRAGONZIL;
const zilliqa = new Zilliqa(provider);

module.exports = async function(ids) {
  const field = 'token_gen_image';
  const maped = ids.map(async(id) => {
    try {
      const { result } = await zilliqa
        .blockchain
        .getSmartContractSubState(contract, field, [String(id)]);
      const gens = parseGens(result[field][id]);
      const genColor = gensToString(gens);

      return {
        id,
        genColor
      };
    } catch (err) {
      return false;
    }
  }).filter(Boolean);

  const result = await Promise.all(maped);

  return result;
}
