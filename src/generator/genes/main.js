/**
 * @module: Color scheme interaction module.
 * @exports: method: scheme, method: getColorFromSchema.
 */
var colorScheme = require('../config/color_scheme.json');

var scheme = (gens) => {
    /**
     * @method: Receives genes and 
                distributes them
                according to the characteristics.
     * @param {gens}: 0-123-0-2-0-0-0-0-0-2-0-1-1-1-0-0-0-2-1-0-215-0-0-1-0-3-0-0-0-0-0-0.
     * @returns: Object.
     */

    this.gens = gens.split('-');

    if (typeof gens !== 'string') {
        throw new Error('genes are not a string!');
    }

    if (!gens) {
        throw new Error('genes can not be empty!');
    }

    if (this.gens.length !== 32) {
        throw new Error('The array of genes should consist of 32 elements!');
    }


    return {
        color_scheme: +this.gens[1],
        aura: {
            gen_number: +this.gens[2],
            gen_color: +this.gens[3],
            chunk_color: null,
            type: 'aura'
        },
        wings: {
            gen_number: +this.gens[4],
            gen_color: ++this.gens[11],
            chunk_color: +this.gens[6],
            type: 'wings'
        },
        tails: {
            gen_number: +this.gens[7],
            gen_color: +this.gens[11],
            chunk_color: +this.gens[9],
            type: 'tails'
        },
        bodies: {
            gen_number: +this.gens[10],
            gen_color: +this.gens[11],
            chunk_color: null,
            type: 'bodies'
        },
        spots: {
            gen_number: +this.gens[12],
            gen_color: +this.gens[13],
            chunk_color: null,
            type: 'spots'
        },
        scales: {
            gen_number: +this.gens[14],
            gen_color: +this.gens[15],
            chunk_color: null,
            type: 'scales'
        },
        horns: {
            gen_number: +this.gens[16],
            gen_color: +this.gens[11],
            chunk_color: +this.gens[17],
            type: 'horns'
        },
        head: {
            gen_number: +this.gens[18],
            gen_color: +this.gens[11],
            chunk_color: null,
            type: 'heads'
        },
        paws: {
            gen_number: Number(this.gens[21]) || 0,
            gen_color: Number(this.gens[11]),
            chunk_color: Number(this.gens[23]), // Claws.
            type: 'paws'
        },
        eyes: {
            gen_number: +this.gens[24],
            gen_color: +this.gens[11],
            chunk_color: +this.gens[25],
            type: 'eyes'
        },
        spins: {
            gen_number: +this.gens[26],
            gen_color: +this.gens[27],
            chunk_color: null,
            type: 'spins'
        }
    };
};

var getColorFromSchema = (commonColorScheme, numOfColorSchema) => {
    /**
     * @method: Converts the color scheme for gm.
     * @param {commonColorScheme}: Basic color scheme.
     * @param {numOfColorSchema}: Choice of color scheme.
     * @returns: RGB format color.
     */
    if (commonColorScheme > 336) {
        throw new Error(`Maximum length of color palette is ${colorScheme.length}`);
    }

    if (!numOfColorSchema && numOfColorSchema !== 0) {
        throw new Error(`numOfColorSchema is ${numOfColorSchema}`);
    }

    if (numOfColorSchema > 4) {
        numOfColorSchema = 4;
        // throw new Error('Maximum length of color schema is 4');
    }

    let colors = colorScheme[commonColorScheme];

    let r = colors[numOfColorSchema][0];
    let g = colors[numOfColorSchema][1];
    let b = colors[numOfColorSchema][2];

    r = Math.floor((1 - (r / 255)) * 100);
    g = Math.floor((1 - (g / 255)) * 100);
    b = Math.floor((1 - (b / 255)) * 100);

    return { r: r, g: g, b: b };
};


module.exports = {
    scheme: scheme,
    getColorFromSchema: getColorFromSchema
};