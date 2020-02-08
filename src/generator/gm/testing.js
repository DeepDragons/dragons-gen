var gm = require('gm');
var ColorScheme = require('../genes/main');
var genGm = require('./main');
var config = require('../config/config.json');


class GenEggs {
    constructor(gens, id) {
        this.colorScheme = ColorScheme.scheme(gens);
        this.dataBuf = {};
        this.id = id;
    }

    onSingleColorize(obj, colors) {
        let mask;
        let stage = 'eggs';
        let data = [];

        Object.keys(this.colorScheme).forEach(item => {
            if (item !== 'color_scheme') {
                data.push(item);
            }
        });

        return new Promise((resolve, reject) => {

            data.forEach(item => {

                let src = `${config.rootdir[stage]}/`+
                        `${item.type}/${item.gen_number}mask.png`;

                gm(src)
                .colorize(colors.r, colors.g, colors.b)
                .write(fragment, (err) => {
                    if (err) reject(err);
                    
                    if (!err) resolve({
                        status: 'done',
                        out: `${type}_${model}_${id}`
                    });
                });
            });
        });
    }
    onMultiColorize(obj, colors0, colors1) {
        let mask;
        let detail;
        let stage = 'eggs';

        return genGm.colorize(
            colors0, obj.gen_number,
            stage, obj.type, 'mask', this.id
        ).then(data => {
            mask = data.out;

            return genGm.colorize(
                colors1, obj.gen_number,
                stage, obj.type, 'detail', this.id
            );
        }).then(data => {
            detail = data.out;
            
            return genGm.composite(
                mask, detail, stage,
                obj.type, obj.gen_number,
                this.id
            );
        });
    }

    onColorize(obj) {
        /**
         * @param {obj}: aura: { gen_number: 0, gen_color: 1, chunk: null };
         */
        let buffers = {};

        let colors0 = ColorScheme.getColorFromSchema(this.colorScheme.color_scheme, obj.gen_color);
        let colors1;

        if (obj.chunk_color) {
            colors1 = ColorScheme.getColorFromSchema(this.colorScheme.color_scheme, obj.chunk_color);
            return this.onMultiColorize(obj, colors0, colors1);
        } else {
            return this.onSingleColorize(obj, colors0);
        }
    }

    onCreateFragment() {
        let data = [];

        Object.keys(this.colorScheme).forEach(item => {
            if (item !== 'color_scheme') {
                data.push(this.onColorize(this.colorScheme[item]));
            }
        });
        return data;
    }

};


module.exports = GenEggs;
