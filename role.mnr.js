var vars = require('vars');
var utils = require('utils');


var miner = {
    run: function(creep){
        creep.memory.empty=true;
        if(creep.memory.empty) {
            if (utils.collect(creep)){}
	    else {console.log('Miner '+creep.name+' failed to mine')}
        }
    }
};

module.exports = miner;
