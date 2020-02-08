const cloudinary = require('cloudinary');

const config = require('../config/cloudinary');

cloudinary.config(config);

function upload(id, stage) {
  let type = '';

  if (stage == 'egg') {
    type = 'eggs';
  } else if (stage == 'dragon') {
    type = 'dragons';
  }

  let name = `${config.rootdir.out}/${type}/${id}.png`;

  let params = {
    public_id: `${stage}_${id}`, 
    crop: 'limit',
    width: 2000,
    height: 2000,
    eager: [
      {
        width: 200,
        height: 200,
        crop: 'thumb',
        gravity: 'face',
        radius: 20,
        effect: 'sepia'
      },
      {
        width: 100,
        height: 150,
        crop: 'fit',
        format: 'png'
      }
    ]
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(name, (result) => {
        if (!result) {
          return reject({ status: 'fail' });
        } else if (result.error) {
          return reject({ status: result.error.message });
        } else if (result) {
          return resolve({ status: 'done', data: result });
        }
      },
      params
    );
  });
};


module.exports = upload;
