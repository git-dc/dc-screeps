var vars = require('vars');
var utils = require('utils');
var builder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.empty = true;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.empty = false;
            creep.say('build');
        }

        if(creep.memory.building) {
            if (utils.gobuild(creep)){}
            // else if(builder.gorepair(creep)){}
            else{utils.maintain(creep);}
        }
        else if(utils.collect(creep)){}
    },
};

module.exports = builder;
