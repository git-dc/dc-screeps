var vars = require('vars');
var utils = require('utils');

var miner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.empty=true;
        if(creep.memory.empty) {
            if (utils.mine(creep)){}
	    else {console.log('Miner '+creep.name+' failed to mine');}x
        }
    }
};

module.exports = miner;
