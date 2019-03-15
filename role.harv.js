var vars = require('vars');
var utils = require('utils');

var harvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {creep.memory.empty = false; creep.say('full');}
        else if(creep.carry.energy == 0) {creep.memory.empty = true; creep.say('harvest');}

        if(creep.memory.empty) {
            if (utils.pickup_dead(creep)){}
            else if (utils.collect(creep)){}
	    else {console.log('Harvester '+creep.name+' failed to harvest');}
        }
        else if(utils.maintain(creep)){}
        else if(utils.upg_home_controller(creep)){}
	else {console.log('Harvester '+creep.name+' failed to contribute');}
    }
};

module.exports = harvester;
