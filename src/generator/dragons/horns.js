const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');

const horns = (obj, id, scheme) => {
    let srcL = `${config.dragons}/${obj.type}/${obj.gen_number}mask_l.png`;
    let srcR = `${config.dragons}/${obj.type}/${obj.gen_number}mask_r.png`;
    let fragment = `${config.out}/dragons/${obj.type}_${id}`;
    let srcShadowL = `${config.dragons}/${obj.type}/${obj.gen_number}shadow_l.png`;
    let srcShadowR = `${config.dragons}/${obj.type}/${obj.gen_number}shadow_r.png`;

    let colors = colorScheme.getColorFromSchema(scheme, obj.gen_color);

    let asynData = { l: false, r: false };

    return new Promise((resolve, reject) => {
        gm(srcL)
        .colorize(colors.r, colors.g, colors.b)
        .toBuffer((err, buffer) => {
            gm(buffer)
            .composite(srcShadowL)
            .write(fragment + '_l.png', (err) => {
                if (err) return reject(err);

                asynData.l = true;
                
                if (!err && asynData.l && asynData.r) {
                    return resolve({
                        status: 'done',
                        out: [ `${obj.type}_${id}_l`, `${obj.type}_${id}_r`]
                    });
                }
            });
        });

        gm(srcR)
        .colorize(colors.r, colors.g, colors.b)
        .toBuffer((err, buffer) => {
            gm(buffer)
            .composite(srcShadowR)
            .write(fragment + '_r.png', (err) => {
                if (err) return reject(err);

                asynData.r = true;
                
                if (!err && asynData.l && asynData.r) {
                    return resolve({
                        status: 'done',
                        out: [ `${obj.type}_${id}_l`, `${obj.type}_${id}_r`]
                    });
                }
            });
        });
    });
};

module.exports = horns;
