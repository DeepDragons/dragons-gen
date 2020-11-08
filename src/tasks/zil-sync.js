const getGens = require('../zil/get-gens');
const { gensToString, parseGens } = require('../zil/gen-parser');

async function main() {
  const gens = await getGens('2');
  const parsedGens = parseGens(gens);
  const validatedGens = gensToString(parsedGens);

  console.log(validatedGens);
}