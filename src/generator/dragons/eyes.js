var gm = require('gm');
var colorScheme = require('../genes/main');
var config = require('../config/config.json');
var exec = require('child_process').exec;

var writeFragment = (MaskFragment, DetailFragment, finite, srcShadow) => {
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

var eyes = (obj, id, scheme) => {
    let mask = `${config.rootdir.dragons}/${obj.type}/${obj.gen_number}mask.png`;
    let detail = `${config.rootdir.dragons}/${obj.type}/${obj.gen_number}detail.png`;
    let MaskFragment = `${config.rootdir.out}/dragons/${obj.type}_mask_${id}.png`;
    let DetailFragment = `${config.rootdir.out}/dragons/${obj.type}_detail_${id}.png`;
    let srcShadow = `${config.rootdir.dragons}/${obj.type}/${obj.gen_number}shadow.png`;
    let finite = `${config.rootdir.out}/dragons/${obj.type}_${id}.png`;

    let colors0 = colorScheme.getColorFromSchema(scheme, obj.gen_color);
    let colors1 = colorScheme.getColorFromSchema(scheme, obj.chunk_color);

    return new Promise((resolve, reject) => {
        let done = { one: false, two: false };

        gm(mask)
        .colorize(colors0.r, colors0.g, colors0.b)
        .write(MaskFragment, (err) => {
            if (err) {
                return reject(err);
            }

            done.one = true;

            if (done.one && done.two) {
                writeFragment(
                    MaskFragment,
                    DetailFragment,
                    finite,
                    srcShadow
                ).then(data => {
                    resolve(data);
                }).catch(console.log);
            }
        });
        gm(detail)
        .colorize(colors1.r, colors1.g, colors1.b)
        .write(DetailFragment, (err) => {
            if (err) {
                return reject(err);
            }

            done.two = true;

            if (done.one && done.two) {
                writeFragment(
                    MaskFragment,
                    DetailFragment,
                    finite,
                    srcShadow
                ).then(data => {
                    resolve(data);
                }).catch(console.log);
            }
        });
    });
};


module.exports = eyes;