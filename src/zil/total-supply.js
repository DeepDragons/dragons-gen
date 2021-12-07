require('custom-env').env();

const { Zilliqa } = require('@zilliqa-js/zilliqa');

const provider = process.env.PROVIDER;
const contract = process.env.DRAGONZIL;
const zilliqa = new Zilliqa(provider);

module.exports = async function() {
  const field = 'token_id_count';

  const { result } = await zilliqa
    .blockchain
    .getSmartContractSubState(contract, field);
  return result[field];
}
