const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');
const exec = require('child_process').exec;

const fragmentLR = (obj, id, scheme) => {
    let srcL = `${config.dragons}/${obj.type}/${obj.gen_number}mask_l.png`;
    let srcR = `${config.dragons}/${obj.type}/${obj.gen_number}mask_r.png`;
    let fragment = `${config.out}/dragons/${obj.type}_${id}`;
    let colors0 = colorScheme.getColorFromSchema(scheme, obj.gen_color);
    let colors1 = colorScheme.getColorFromSchema(scheme, obj.chunk_color);
    let srcDetailL = `${config.dragons}/${obj.type}/${obj.gen_number}detail_l.png`;
    let srcDetailR = `${config.dragons}/${obj.type}/${obj.gen_number}detail_r.png`;
    
    let asynData = {
        mask_l: false, mask_r: false,
        detail_l: false, detail_r: false
    };

    return new Promise((resolve, reject) => {
        gm(srcL)
        .colorize(colors0.r, colors0.g, colors0.b)
        .write(fragment + '_mask_l.png', (err) => {
            if (err) return reject(err);

            asynData.mask_l = true;

            let masksV = asynData.mask_r && asynData.mask_l;
            let detailV = asynData.detail_r && asynData.detail_l;

            if (masksV && detailV) {
                return resolve({
                    status: 'done',
                    out: [
                        `${obj.type}_${id}_mask_l`,
                        `${obj.type}_${id}_mask_r`,
                        `${obj.type}_${id}_detail_r`,
                        `${obj.type}_${id}_detail_l`,
                    ]
                });
            }
        });
        gm(srcR)
        .colorize(colors0.r, colors0.g, colors0.b)
        .write(fragment + '_mask_r.png', (err) => {
            if (err) return reject(err);

            asynData.mask_r = true;
            
            let masksV = asynData.mask_r && asynData.mask_l;
            let detailV = asynData.detail_r && asynData.detail_l;
            
            if (masksV && detailV) {
                return resolve({
                    status: 'done',
                    out: [
                        `${obj.type}_${id}_mask_l`,
                        `${obj.type}_${id}_mask_r`,
                        `${obj.type}_${id}_detail_r`,
                        `${obj.type}_${id}_detail_l`,
                    ]
                });
            }
        });

        gm(srcDetailL)
        .colorize(colors1.r, colors1.g, colors1.b)
        .write(fragment + '_detail_l.png', (err) => {
            if (err) return reject(err);

            asynData.detail_l = true;
            
            let masksV = asynData.mask_r && asynData.mask_l;
            let detailV = asynData.detail_r && asynData.detail_l;
            
            if (masksV && detailV) {
                return resolve({
                    status: 'done',
                    out: [
                        `${obj.type}_${id}_mask_l`,
                        `${obj.type}_${id}_mask_r`,
                        `${obj.type}_${id}_detail_r`,
                        `${obj.type}_${id}_detail_l`,
                    ]
                });
            }
        });
        gm(srcDetailR)
        .colorize(colors1.r, colors1.g, colors1.b)
        .write(fragment + '_detail_r.png', (err) => {
            if (err) return reject(err);

            asynData.detail_r = true;
            
            let masksV = asynData.mask_r && asynData.mask_l;
            let detailV = asynData.detail_r && asynData.detail_l;
        
            if (masksV && detailV) {
                return resolve({
                    status: 'done',
                    out: [
                        `${obj.type}_${id}_mask_l`,
                        `${obj.type}_${id}_mask_r`,
                        `${obj.type}_${id}_detail_r`,
                        `${obj.type}_${id}_detail_l`,
                    ]
                });
            }
        });
    });
};

const fragmentLRCom = (src, srcSL, srcRL, id, fragment) => {

    let asynData = { l: false, r: false };
    
    return new Promise((resolve, reject) => {
        gm(src.mask_l)
        .composite(src.detail_l)
        .toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            gm(buffer)
            .composite(srcSL)
            .write(fragment + '_l.png', (err) => {
                if (err) return reject(err);

                asynData.l = true;
                
                if (!err && asynData.l && asynData.r) {
                    return resolve({
                        status: 'done'
                    });
                }
            });
        });
        gm(src.mask_r)
        .composite(src.detail_r)
        .toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            gm(buffer)
            .composite(srcRL)
            .write(fragment + '_r.png', (err) => {
                if (err) return reject(err);

                asynData.r = true;
                
                if (!err && asynData.l && asynData.r) {
                    return resolve({
                        status: 'done'
                    });
                }
            });
        });
    });
};

const removeFragment = (src) => {
    exec(`rm -f ${src.mask_l} ${src.detail_l} ${src.mask_r} ${src.detail_r}`);
};

const paws = (obj, id, scheme) => {
    let fragment = `${config.out}/dragons/${obj.type}_${id}`;

    let srcShadowL = `${config.dragons}/${obj.type}/${obj.gen_number}shadow_l.png`;
    let srcShadowR = `${config.dragons}/${obj.type}/${obj.gen_number}shadow_r.png`;
    let src = {};

    return fragmentLR(obj, id, scheme).then(data => {
        src = {
            mask_l: `${config.out}/dragons/${data.out[0]}.png`,
            detail_l: `${config.out}/dragons/${data.out[3]}.png`,
            mask_r: `${config.out}/dragons/${data.out[1]}.png`,
            detail_r: `${config.out}/dragons/${data.out[2]}.png`
        };

        return fragmentLRCom(src, srcShadowL, srcShadowR, id, fragment);
    }).then(data => {
        removeFragment(src);

        return {
            status: 'done',
            out: [`paws_${id}_l`, `paws_${id}_r`]
        }
    });
};


module.exports = paws;
