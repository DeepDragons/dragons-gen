function parseGens(gensStr) {
  const gensObj = {
    "aura": 0,
    "colorAura": 0,
    "horns": 0,
    "colorHorns": 0,
    "scales": 0,
    "colorScales": 0,
    "spots": 0,
    "colorSpots": 0,
    "tail": 0,
    "colorTail": 0,
    "wings": 0,
    "colorWings": 0,
    "spins": 0,
    "colorSpins": 0,
    "body": 0,
    "colorBody": 0,
    "eyes": 0,
    "colorEyes": 0,
    "head": 0,
    "colorClaws": 0,
    "colorScheme": 0,
    "mutagenImutable": 0
  };

  const gen = parseInt(gensStr.substr(3, 1));
  gensObj.aura = gen;
  const gen = parseInt(gensStr.substr(4, 1));
  gensObj.colorAura = gen;
  const gen = parseInt(gensStr.substr(5, 1));
  gensObj.horns = gen;
  const gen = parseInt(gensStr.substr(6, 1));
  gensObj.colorHorns = gen;
  const gen = parseInt(gensStr.substr(7, 1));
  gensObj.scales = gen;
  const gen = parseInt(gensStr.substr(8, 1));
  gensObj.colorScales = gen;
  const gen = parseInt(gensStr.substr(9, 1));
  gensObj.spots = gen;
  const gen = parseInt(gensStr.substr(10, 1));
  gensObj.colorSpots = gen;
  const gen = parseInt(gensStr.substr(11, 1));
  gensObj.tail = gen;
  const gen = parseInt(gensStr.substr(12, 1));
  gensObj.colorTail = gen;
  const gen = parseInt(gensStr.substr(13, 1));
  gensObj.wings = gen;
  const gen = parseInt(gensStr.substr(14, 1));
  gensObj.colorWings = gen;
  const gen = parseInt(gensStr.substr(15, 1));
  gensObj.spins = gen;
  const gen = parseInt(gensStr.substr(16, 1));
  gensObj.colorSpins = gen;
  const gen = parseInt(gensStr.substr(17, 1));
  gensObj.body = gen;
  const gen = parseInt(gensStr.substr(18, 1));
  gensObj.colorBody = gen;
  const gen = parseInt(gensStr.substr(19, 1));
  gensObj.eyes = gen;
  const gen = parseInt(gensStr.substr(20, 1));
  gensObj.colorEyes = gen;
  const gen = parseInt(gensStr.substr(21, 1));
  gensObj.head = gen;
  const gen = parseInt(gensStr.substr(22, 1));
  gensObj.colorClaws = gen;
  const gen = parseInt(gensStr.substr(23, 3));
  gensObj.colorScheme = gen;
  const gen = parseInt(gensStr.substr(26, 3));
  gensObj.mutagenImutable = gen;

  return gensObj;
}

function gensToString(gensObj) {
  return ``;
}
// 77703410132235131101131010147
module.exports = {
  parseGens,
  gensToString
};
