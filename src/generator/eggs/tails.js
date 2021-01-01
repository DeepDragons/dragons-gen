const gm = require('gm');
const colorScheme = require('../genes/main');
const config = require('../config');
const exec = require('child_process').exec;

const writeFragment = (MaskFragment, DetailFragment, finite, srcShadow) => {
    return new Promise(resolve => {
        gm(MaskFragment)
        .composite(DetailFragment)
        .toBuffer((err, buffer) => {
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
    if (obj.gen_number > 7) {
        obj.gen_number = 7;
    }
    let mask = `${config.eggs}/${obj.type}/${obj.gen_number}mask.png`;
    let detail = `${config.eggs}/${obj.type}/${obj.gen_number}detail.png`;
    let MaskFragment = `${config.out}/eggs/${obj.type}_mask_${id}.png`;
    let DetailFragment = `${config.out}/eggs/${obj.type}_detail_${id}.png`;
    let srcShadow = `${config.eggs}/${obj.type}/${obj.gen_number}shadow.png`;
    let finite =  `${config.out}/eggs/${obj.type}_${id}.png`;

    let colors0 = colorScheme.getColorFromSchema(scheme, obj.gen_color);
    let colors1 = colorScheme.getColorFromSchema(scheme, obj.chunk_color);

    return new Promise((resolve, reject) => {
        if (obj.gen_number <= 0) return reject('not be 0');

        let done = { one: false, two: false };

        gm(mask)
        .colorize(colors0.r, colors0.g, colors0.b)
        .write(MaskFragment, (err) => {
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