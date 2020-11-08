const getGens = require('./get-gens');

module.exports = async function(ids) {
    const dragonsGens = await getGens(ids);

    return dragonsGens;
}
