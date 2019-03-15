var vars = require("vars");
var utils = require('utils');

var upgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {creep.memory.empty = false; creep.say('upgrade');}
        else if(creep.carry.energy == 0) {creep.memory.empty = true; creep.say('harvest');}

        if(creep.memory.empty) {
	    if(utils.pickup_dead(creep)){}
            else if(utils.collect(creep,choice=0)){}
        }
	else if(utils.upg_home_controller(creep)){}
	else {console.log('Upgrader '+creep.name+' failed to contribute');}
    }
};

module.exports = upgrader;
