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
            creep.say('⚡ build');
        }

        if(creep.memory.building) {
            if (builder.gobuild(creep)){}
            // else if(builder.gorepair(creep)){}
            else{builder.maintain(creep)}
        }
        else if(utils.collect(creep)){}
    },
    
    
    
    
    
    // #################################################################################
    gobuild: function (creep){
        var targets = vars.home.find(FIND_CONSTRUCTION_SITES);
        if(targets.length>0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }    
        }
        return targets.length > 0
    },
    // #################################################################################
    maintain: function (creep){
        var targets = vars.home.find(
            FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)
                && structure.energy < structure.energyCapacity;}
            }
        );
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        return targets.length > 0
    },
    // #################################################################################
    gorepair: function (creep){
        console.log("repairing")
        var targets = vars.home.find(
            FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_CONTAINER)
                && structure.hits < structure.hitsMax;}
            }
        );
        if(targets.length > 0) {
            if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        return targets.length > 0
    }
    
};

module.exports = builder;
