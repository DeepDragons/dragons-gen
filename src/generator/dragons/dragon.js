var gm = require('gm');
var config = require('../config/config.json');


var dragon = (back, front) => {
    let srcFront = `${config.rootdir.out}/dragons/${front}.png`;
    let buferOrStr;

    if (typeof back === 'string') {
        buferOrStr = `${config.rootdir.out}/dragons/${back}.png`;
    } else {
        buferOrStr = back;
    }

    return new Promise((resolve, reject) => {
        gm(buferOrStr)
        .composite(srcFront)
        .toBuffer((err, buffer) => {
            if (err) return reject(err);

            if (!err) return resolve({
                status: 'done',
                out: buffer
            });
        });
    });
};

var write = (buffer, id) => {
    let src = `${config.rootdir.out}/dragons/${id}.png`;

    return new Promise((resolve, reject) => {
        gm(buffer)
        .write(src, (err) => {
            if (err) return reject(err);
            
            if (!err) return resolve({
                status: 'done',
                out: id
            });
        });
    });
};


module.exports = {
    genBufer: dragon,
    writeBufer: write
};