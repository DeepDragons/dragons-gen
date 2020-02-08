var gm = require('gm');

var ColorScheme = require('../genes/main');
var config = require('../config/config.json');


var composite = (back, front, stage, type, genNumber, id) => {
    /**
     * @method: Merges 2 pictures into one.
     * @param {back}: The background.
     * @param {front}: Front Background.
     * @param {err}: Error handler.
     */
    let err = [];
    
    let srcInput = `${config.rootdir.out}/${front}.png`;
    let srcShadow = `${config.rootdir[stage]}/${type}/${genNumber}shadow.png`;
    let srcOutput = `${config.rootdir.out}/${id}_fragment.png`;
    let buferOrStr;
    
    if (typeof back === 'string') {
        // If the back is string parameter.
        buferOrStr = `${config.rootdir.out}/${back}.png`;
    } else if (typeof back === 'object') {
         // If the back is Object (bufer) parameter.
        buferOrStr = back;
    } else {
        err.push('Parameter back can only be a string or object!');
    }

    return new Promise((resolve, reject) => {
        if (err.length > 0) {
            return reject({ status: 'fail', errors: err });
        };

        gm(buferOrStr)
        .composite(srcInput)
        .toBuffer((err, buffer) => {
            // if (err) return reject(err);

            gm(buffer)
            .composite(srcShadow)
            .write(srcOutput, (err) => {
                // if (err) return reject(err);
                
                if (!err) return resolve({
                    status: 'done',
                    out: `${id}_fragment`
                });
            });
        });
    });
};

var compositeSingle = (back, stage, type, genNumber, id) => {
    /**
     * @method: Merges 2 pictures into one.
     * @param {back}: The background.
     * @param {front}: Front Background.
     * @param {err}: Error handler.
     */
    let err = [];
    
    let srcShadow = `${config.rootdir[stage]}/${type}/${genNumber}shadow.png`;
    let srcOutput = `${config.rootdir.out}/${id}_fragment.png`;
    let buferOrStr;
    
    if (typeof back === 'string') {
        // If the back is string parameter.
        buferOrStr = `${config.rootdir.out}/${back}.png`;
    } else if (typeof back === 'object') {
         // If the back is Object (bufer) parameter.
        buferOrStr = back;
    } else {
        err.push('Parameter back can only be a string or object!');
    }

    return new Promise((resolve, reject) => {
        if (err.length > 0) {
            return reject({ status: 'fail', errors: err });
        };

        gm(buferOrStr)
        .composite(srcShadow)
        .write(srcOutput, (err) => {
            // if (err) return reject(err);
            
            if (!err) return resolve({
                status: 'done',
                out: `${id}_fragment`
            });
        });
    });
};

var writeBufer = (id, buf) => {

    let srcOutput = `${config.rootdir.out}/${id}_fragment.png`;

    return new Promise((resolve, reject) => {
        gm(buf).write(srcOutput, (err) => {
            if (err) return reject(err);
            
            if (!err) return resolve({
                status: 'done',
                out: `${id}_fragment`
            });
        });
    });
};

var colorize = (colors, genNumber, stage, type, model, id) => {
    let err = [];

    let src = `${config.rootdir[stage]}/${type}/${genNumber}${model}.png`;
    let fragment = `${config.rootdir.out}/${type}_${model}_${id}.png`;

    return new Promise((resolve, reject) => {
        if (err.length > 0) {
            return reject({ status: 'fail', errors: err });
        };
        if (genNumber === 0) {
            return resolve({
                status: 'done'
            });
        };

        gm(src)
        .colorize(colors.r, colors.g, colors.b)
        .write(fragment, (err) => {
            if (err) return reject(err);
            
            if (!err) return resolve({
                status: 'done',
                out: `${type}_${model}_${id}`
            });
        });
    });
};

module.exports = {
    colorize: colorize,
    composite: composite,
    writeBufer: writeBufer,
    compositeSingle: compositeSingle
};