var vars = require('vars');
var utils = require('utils');

var cleaner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {creep.memory.empty = false; creep.say('full of remains');}
        else if(creep.carry.energy == 0) {creep.memory.empty = true; creep.say('pick up remains');}

        if(creep.memory.empty) {
            if (utils.pickup_dead(creep)){}
	    else {console.log('Cleaner '+creep.name+' failed to clean');}
        }
        else if(utils.maintain(creep)){}
        else if(utils.upg_home_controller(creep)){}
	else {console.log('cleaner '+creep.name+' failed to contribute');}
    }
};

module.exports = cleaner;
