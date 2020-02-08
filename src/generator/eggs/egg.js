const gm = require('gm');
const config = require('../config');


const egg = (back, front) => {
    let srcFront = `${config.out}/eggs/${front}.png`;
    let buferOrStr;

    if (typeof back === 'string') {
        buferOrStr = `${config.out}/eggs/${back}.png`;
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
    let src = `${config.out}/eggs/${id}.png`;

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
    genBufer: egg,
    writeBufer: write
};