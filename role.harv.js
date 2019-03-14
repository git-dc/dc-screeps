var vis = Game.rooms['E7N17'].visual;
var utils = require('utils');
var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == creep.carryCapacity){creep.memory.empty = false;}
        else if (creep.carry.energy == 0){creep.memory.empty = true;}
        
        if(creep.memory.empty) {
            if (utils.pickup_dead(creep)){}
            else if (harvester.collect(creep)){}
        }
        else if(harvester.maintain(creep)){}
        else if(harvester.upg_controller(creep)){}
    },
    
    
    
    // ############################################################################
    pickup_dead: function(creep){
        var sources = creep.room.find(FIND_TOMBSTONES,{
            filter: (tomb) => {return (tomb.store["RESOURCE_ENERGY"] > 0)}
        });
        if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0
    },
    collect: function(creep){
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0
    },
    maintain: function(creep){
        var targets = Game.rooms["E7N17"].find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                    || structure.structureType == STRUCTURE_CONTAINER 
                    // || structure.structureType == STRUCTURE_TOWER 
                    ) && structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        return targets.length > 0
    },
    upg_controller: function(creep){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    
};

module.exports = harvester;
