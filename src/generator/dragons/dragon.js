const gm = require('gm');
const config = require('../config');


const dragon = (back, front) => {
    let srcFront = `${config.out}/dragons/${front}.png`;
    let buferOrStr;

    if (typeof back === 'string') {
        buferOrStr = `${config.out}/dragons/${back}.png`;
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

const write = (buffer, id) => {
    let src = `${config.out}/dragons/${id}.png`;

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
