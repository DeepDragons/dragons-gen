const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');

const aura = (obj, id, scheme) => {
    if (Number(obj.gen_number) === 0) {
        return Promise.reject(`Skip ${obj.gen_number} gen.`);
    }

    let src = `${config.dragons}/${obj.type}/${obj.gen_number}mask.png`;
    let fragment = `${config.out}/dragons/${obj.type}_${id}.png`;

    let colors = colorScheme.getColorFromSchema(scheme, obj.gen_color);

    return new Promise((resolve, reject) => {
        gm(src)
        .colorize(colors.r, colors.g, colors.b)
        .write(fragment, (err) => {
            if (err) return reject(err);
            
            if (!err) return resolve({
                status: 'done',
                out: `${obj.type}_${id}`
            });
        });
    });
};


module.exports = aura;
