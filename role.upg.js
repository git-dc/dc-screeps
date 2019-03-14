var vars = require("vars");
var utils = require('utils');
var upgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == creep.carryCapacity){creep.memory.empty = false;}
        else if (creep.carry.energy == 0){creep.memory.empty = true;}
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.empty = true;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.memory.empty = false;
            creep.say('upgrade');
        }

        if(creep.memory.upgrading) {
            if(utils.upg_home_controller(creep)){}
        }
        else if(utils.pickup_dead(creep)){}
        else if(utils.collect(creep,choice=0)){}
    }
};

module.exports = upgrader;
