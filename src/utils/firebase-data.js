module.exports = function(dataForParse) {
  let data = {};

  [
    'id',
    'genColor',
    'egg',
    'dragon'
  ].forEach((requireKey) => {
    if (!(requireKey in dataForParse)) {
      throw new Error(`${requireKey} is required.`);
    }
    data[requireKey] = dataForParse[requireKey]
  });

  data.id = Number(data.id);

  return data;
}
