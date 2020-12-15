const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');
const exec = require('child_process').exec;

const writeFragment = (MaskFragment, DetailFragment, finite, srcShadow) => {
    return new Promise((resolve, reject) => {
        gm(MaskFragment)
        .composite(DetailFragment)
        .toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            gm(buffer)
            .composite(srcShadow)
            .write(finite, (err) => {
                let name = finite.split('/');
                name = name[name.length - 1];
                name = name.replace('.png', '');
                if (!err) resolve({ status: 'done', out: name });
                exec(`rm -f ${MaskFragment} ${DetailFragment}`);
            });
        });
    });
};

const tails = (obj, id, scheme) => {
    if (obj.gen_number === 0) {
        return Promise.reject(`Skip gen number 0.`);
    }

    let mask = `${config.dragons}/${obj.type}/${obj.gen_number}mask.png`;
    let detail = `${config.dragons}/${obj.type}/${obj.gen_number}detail.png`;
    let MaskFragment = `${config.out}/dragons/${obj.type}_mask_${id}.png`;
    let DetailFragment = `${config.out}/dragons/${obj.type}_detail_${id}.png`;
    let srcShadow = `${config.dragons}/${obj.type}/${obj.gen_number}shadow.png`;
    let finite =  `${config.out}/dragons/${obj.type}_${id}.png`;

    let colors0 = colorScheme.getColorFromSchema(scheme, obj.gen_color);
    let colors1 = colorScheme.getColorFromSchema(scheme, obj.chunk_color);

    return new Promise((resolve, reject) => {
        let done = { one: false, two: false };

        gm(mask)
        .colorize(colors0.r, colors0.g, colors0.b)
        .write(MaskFragment, (err) => {
            if (err) return reject(err);
            done.one = true;

            if (done.one && done.two) {
                writeFragment(
                    MaskFragment,
                    DetailFragment,
                    finite,
                    srcShadow
                ).then(data => {
                    resolve(data);
                });
            }
        });
        gm(detail)
        .colorize(colors1.r, colors1.g, colors1.b)
        .write(DetailFragment, (err) => {
            if (err) return reject(err);
            done.two = true;

            if (done.one && done.two) {
                writeFragment(
                    MaskFragment,
                    DetailFragment,
                    finite,
                    srcShadow
                ).then(data => {
                    resolve(data);
                });
            }
        });
    });
};


module.exports = tails;
