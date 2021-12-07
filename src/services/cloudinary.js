const cloudinary = require('cloudinary');
const fetch = require('cross-fetch');

const config = require('../config/cloudinary');
const generatorConfig = require('../generator/config');

cloudinary.config(config);

function upload(id, stage, stageNumber) {
  let type = stage + 's';
  let name = `${generatorConfig.out}/${type}/${id}.png`;

  let params = {
    public_id: `${stageNumber}_${id}`, 
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
let k = 5
function remove(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cloudinary.v2.uploader.destroy(id, {}, (error, result) => {
        if (!result) {
          return reject({ status: 'fail' });
        } else if (error) {
          return reject({ status: error });
        } else if (result) {
          return resolve({ status: 'done', data: result, id });
        }
      });
    }, k);
  });
}

const values = {
  "data": {
    "txPagination": {
      "pageInfo": {
        "currentPage": 4,
        "perPage": 200
      },
      "items": [
        {
          "blockId": 1478465,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x6f993197110d04329a85ff77e28fa9c00069fc2d"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "996"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x6f993197110d04329a85ff77e28fa9c00069fc2d"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "13332662088523873693"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1478500,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x738ce3185e6a4423ff1b4aed9b3c6d4f9bb63ee2"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "604"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x738ce3185e6a4423ff1b4aed9b3c6d4f9bb63ee2"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "9905644000138235700"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1478547,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x738ce3185e6a4423ff1b4aed9b3c6d4f9bb63ee2"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "605"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x738ce3185e6a4423ff1b4aed9b3c6d4f9bb63ee2"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "12454655862129042936"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1481666,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x8cc2aca8d64cbedc72fbb27a83828569db0142cd"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "2359"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x8cc2aca8d64cbedc72fbb27a83828569db0142cd"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "424124015179590668883"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1482201,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x5c7330591a4406a5e05d7610ab78142a72e7855f"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "4518"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x5c7330591a4406a5e05d7610ab78142a72e7855f"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "155291738511954452942"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1484035,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xa8652ebd491f62049ebbe8acbaa87c1e3e1d89f7"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3264"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xa8652ebd491f62049ebbe8acbaa87c1e3e1d89f7"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "15641556195297994834"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489291,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3270"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "17314853283382500791"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489292,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3271"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "13391387264237884711"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489293,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3272"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "9861284183619377026"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489294,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3273"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "14281207325509634411"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489296,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3288"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "13067503711529969355"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1489298,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3286"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xff38a3b616a852b5824788ecf033aedfe960b7d5"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "12567458790598644716"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1490041,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x1f0ca96f95f94eb3ef5bed3628e02148f34a1711"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "2764"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x1f0ca96f95f94eb3ef5bed3628e02148f34a1711"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "417405495917858085829"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1490061,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x1f0ca96f95f94eb3ef5bed3628e02148f34a1711"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "2765"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x1f0ca96f95f94eb3ef5bed3628e02148f34a1711"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "56011816457454410447"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1491523,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xdc8d8971abbb6164914864c0002f6896a7e03b21"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "4749"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xdc8d8971abbb6164914864c0002f6896a7e03b21"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "16959646748211034309"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1491654,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0xb0971182b9c41a8a4776dc1a52b435bad95b4e92"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "4748"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0xb0971182b9c41a8a4776dc1a52b435bad95b4e92"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "10542911254652511778"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1494259,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x38037231ce2a921645025be4f787ceb05c594d29"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "4089"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x38037231ce2a921645025be4f787ceb05c594d29"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "12695882553666195437"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1494260,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x38037231ce2a921645025be4f787ceb05c594d29"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "4090"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x38037231ce2a921645025be4f787ceb05c594d29"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "9772473421611224194"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1496184,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x4c964943c3b8531dd04cf8f7438abcc2d83297d6"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "3045"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x4c964943c3b8531dd04cf8f7438abcc2d83297d6"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "57777936977249134971"
                  }
                ]
              }
            ]
          }
        },
        {
          "blockId": 1498747,
          "receipt": {
            "event_logs": [
              {
                "address": "0xb4d83becb950c096b001a3d1c7abb10f571ae75f",
                "_eventname": "BurnSuccess",
                "params": [
                  {
                    "vname": "initiator",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "burn_address",
                    "type": "ByStr20",
                    "value": "0x24ed3dac68a1f0a6a695b1dfacb3d7f6a6bd80bd"
                  },
                  {
                    "vname": "token_id",
                    "type": "Uint256",
                    "value": "2089"
                  }
                ]
              },
              {
                "address": "0xfbd07e692543d3064b9cf570b27faabfd7948da4",
                "_eventname": "TransferSuccess",
                "params": [
                  {
                    "vname": "sender",
                    "type": "ByStr20",
                    "value": "0x949569d440b2cd4dc9b7e2ee0eb68dc35c8d9246"
                  },
                  {
                    "vname": "recipient",
                    "type": "ByStr20",
                    "value": "0x24ed3dac68a1f0a6a695b1dfacb3d7f6a6bd80bd"
                  },
                  {
                    "vname": "amount",
                    "type": "Uint128",
                    "value": "10950713219002610427018"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
}

const itmes = values.data.txPagination.items.map((el) => el.receipt.event_logs[0].params[2].value);

// console.log(JSON.stringify(itmes, null, 4));

itmes.forEach(async(value) => {
  try {
    const res = await remove(`0_${value}`);
    console.log(res)
  } catch (err) {
    console.log(err)
  }
  try {
    const res = await remove(`1_${value}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
})

module.exports = upload;
