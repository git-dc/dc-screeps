var vars = require('vars');
var utils = require('utils');

var carrier = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == creep.carryCapacity){creep.memory.empty = false;}
        else if (creep.carry.energy == 0){creep.memory.empty = true;}
        
        if(creep.memory.empty) {
            if (utils.take(creep)){}
	    else {console.log('Carrier ' + creep.name + ' failed to take');}
            // else if (utils.collect(creep)){}
        }
        else if(utils.maintain(creep)){}
        else if(utils.upg_home_controller(creep)){}
	else {console.log('Carrier ' + creep.name + ' failed to contribute');}
    }
};

module.exports = carrier;
