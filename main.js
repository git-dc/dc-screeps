var harvester = require('role.harv');
var upgrader = require('role.upg');
var builder = require('role.bld');
var utils = require('utils');
var vars = require('vars');

var worker_parts = [];
// var roles = ['harv','upg','bld'];
var room_sources = Game.spawns["spn1"].room.find(FIND_SOURCES);
// var population;

module.exports.loop = function () {
    vars.vis.text("Dan's room",3,1);
    var population = utils.census(roles);
    if (population.total < 4){vars.best_parts = vars.emergency_parts}
    else{worker_parts=vars.best_parts}
    utils.routines();
    
    var tower = Game.getObjectById('5c88fd035bea8e153b922b11');
    if(tower) {
        // var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var interlopers = vars.home.find(FIND_CREEPS, {filter: (creep) => {return !creep.my}});
        if(interlopers.length > 0) {
            tower.attack(interlopers[0]);
        }
        else{
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
            if(closestDamagedStructure) {
		tower.repair(closestDamagedStructure);
            }
        }
        
    }
    
    if(population.builders.count < vars.target_bld) {utils.spawn_new('bld',vars.best_parts)}
    if(population.upgraders.count < vars.target_upg) {utils.spawn_new('upg',vars.best_parts)}
    if(population.harvesters.count < vars.target_harv) {utils.spawn_new('harv',vars.harv_parts)}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harv') {
            harvester.run(creep);
        }
        if(creep.memory.role == 'upg') {
            upgrader.run(creep);
        }
        if(creep.memory.role == 'bld') {
            builder.run(creep);
        }
    }
}




// if(Game.spawns['spn1'].spawning) {
//     var spawningCreep = Game.creeps[Game.spawns['spn1'].spawning.name];
//     Game.spawns['spn1'].room.visual.text(
//         spawningCreep.memory.role,
//         Game.spawns['spn1'].pos.x + 1,
//         Game.spawns['spn1'].pos.y,
//         {align: 'left', opacity: 0.8});
// }
