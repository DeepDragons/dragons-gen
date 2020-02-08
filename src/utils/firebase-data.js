module.exports = function(dataForParse) {
  let data = {};

  [
    'id',
    'genColor',
    'battleGen',
    'generated'
  ].forEach((requireKey) => {
    if (!(requireKey in dataForParse)) {
      throw new Error(`${requireKey} is required.`);
    }
    data[requireKey] = dataForParse[requireKey]
  });

  return data;
}
