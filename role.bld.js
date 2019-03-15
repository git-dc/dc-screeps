var vars = require('vars');
var utils = require('utils');

var builder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {creep.memory.empty = false; creep.say('build');}
        else if(creep.carry.energy == 0) {creep.memory.empty = true; creep.say('harvest');}

        if(creep.memory.empty) {
	    if(utils.collect(creep)){}
	    else {console.log('Builder '+creep.name+' failed to harvest');}
	}
	else{
            if (utils.gobuild(creep)){}
            // else if(builder.gorepair(creep)){}
            else if(utils.maintain(creep)){}
	    else {console.log('Builder '+creep.name+' failed to contribute');}
        }
    }
};

module.exports = builder;
