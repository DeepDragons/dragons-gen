require('custom-env').env();

const { Zilliqa } = require('@zilliqa-js/zilliqa');

const provider = process.env.PROVIDER;
const contract = process.env.DRAGONZIL;
const zilliqa = new Zilliqa(provider);

module.exports = async function(id) {
  const field = 'token_gen_image';

  const { result } = await zilliqa
    .blockchain
    .getSmartContractSubState(contract, field, [id]);

  return result[field][id];
}
