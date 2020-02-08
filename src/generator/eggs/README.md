# Eggs generation.

## modules: 
    * aura: aura generation.
    * bodies: bodies generation.
    * horns: horns generation.
    * scales: scales generation.
    * spots: spots generation.
    * tails: tails generation.
    * wings: wings generation.
    * egg: egg generation from fragments;
    * main: async class.

## Generation order: 
    * /eggs/main.js: class:GenEggs; method:onGenerateFragments;
| param | value | fragments |
| ------ | ------ | ------ |
| orderAura | 0 | aura |
| orderBodies | 3 | bodies |
| orderHorns | 6 | horns |
| orderScales | 5 | scales |
| orderSpots | 4 | spots |
| orderWings | 1 | wings |
| orderTails | 2 | tails |

## class GenEggs:
    * /eggs/main.js: class:GenEggs;
    * constructor: gens, id: 
        - gens sample: 0-3-3-0-4-2-6-6-0-2-2-4-1-3-1-3-2-2-2-0-108-0-0-0-9-4-4-4-0-0-0-0
        - id (dragon id) sample: 100 