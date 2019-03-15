var vars = require('vars');
var utils = require('utils');
var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == creep.carryCapacity){creep.memory.empty = false;}
        else if (creep.carry.energy == 0){creep.memory.empty = true;}
        
        if(creep.memory.empty) {
            if (utils.pickup_dead(creep)){}
            else if (utils.collect(creep)){}
        }
        else if(utils.maintain(creep)){}
        else if(utils.upg_home_controller(creep)){}
    }
};

module.exports = harvester;
