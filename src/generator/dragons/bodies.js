const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');

const bodies = (obj, id, scheme) => {
    if (obj.gen_number > 0) {
        obj.gen_number = 0;
    }

    let src = `${config.dragons}/${obj.type}/${obj.gen_number}mask.png`;
    let fragment = `${config.out}/dragons/${obj.type}_${id}.png`;
    let srcShadow = `${config.dragons}/${obj.type}/${obj.gen_number}shadow.png`;

    let colors = colorScheme.getColorFromSchema(scheme, obj.gen_color);

    return new Promise((resolve, reject) => {
        if (obj.gen_number > 0) return reject('must not be greater than 0');

        gm(src)
        .colorize(colors.r, colors.g, colors.b)
        .toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            gm(buffer)
            .composite(srcShadow)
            .write(fragment, (err) => {
                if (err) return reject(err);
                
                if (!err) return resolve({
                    status: 'done',
                    out: `${obj.type}_${id}`
                });
            });
        });
    });
};

module.exports = bodies;
