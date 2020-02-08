var gm = require('gm');
var colorScheme = require('../genes/main');
var config = require('../config/config.json');


var spots = (obj, id, scheme) => {
    return Promise.reject('Spots was desabled');

    let src = `${config.rootdir.dragons}/${obj.type}/${obj.gen_number}mask.png`;
    let fragment = `${config.rootdir.out}/dragons/${obj.type}_${id}.png`;

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

module.exports = spots;
