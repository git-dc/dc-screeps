
var role_names = ['harv','bld','upg','car','mnr','cln']; var roles = {};
for (var role in role_names){roles[role_names[role]] = require('role.'+role_names[role]);}

var utils = require('utils');
var vars = require('vars');

var worker_parts = [];
var room_sources = Game.spawns["spn1"].room.find(FIND_SOURCES);

module.exports.loop = function () {
    
    var population = utils.census(['harv','upg','bld']);

    if (population.total < 4){vars.best_parts = vars.emergency_parts;} else {worker_parts=vars.best_parts;}
    utils.routines();
    
    var towers = vars.home.find(FIND_STRUCTURES, {filter: (struct) => struct.structureType == STRUCTURE_TOWER});
    for (var tower in towers){
	utils.tower.run(tower);
	// console.log(tower);
        // var interlopers = vars.home.find(FIND_CREEPS, {filter: (creep) => {return !creep.my}});
        // if(interlopers.length > 0) {
	//     tower.attack(interlopers[0]);
        // }
        // else{
	//     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
	// 	filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
	//     });
	//     if(closestDamagedStructure) {
	// 	tower.repair(closestDamagedStructure);
	//     }
        // }
   	
    }
    
    if (population.harvesters.count < vars.target_harv*0.5) {utils.spawn_new('harv',vars.harv_parts);}
    else if(population.upgraders.count < 1) {utils.spawn_new('upg',vars.best_parts);}
    else if(population.builders.count < vars.target_bld) {utils.spawn_new('bld',vars.best_parts);}
    else if(population.harvesters.count < vars.target_harv) {utils.spawn_new('harv',vars.harv_parts);}
    else if(population.upgraders.count < vars.target_upg) {utils.spawn_new('upg',vars.best_parts);}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
	roles[creep.memory.role].run(creep);
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
