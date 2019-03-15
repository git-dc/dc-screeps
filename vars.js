/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('vars');
 * mod.thing == 'a thing'; // true
 */

var vars = {
    population: {'miners': {role: 'mnr', count: 0, target_num: 4},
		 'carriers': {role: 'car', count: 0, target_num: 2},
		 'harvesters': {role: 'harv', count: 0, target_num: 3},
		 'builders': {role: 'bld', count: 0, target_num: 2},
		 'upgraders': {role: 'upg', count: 0, target_num: 5},
		 'total': {role: 'all', count: 0, target_num: 0}
		},
    // best_parts:  [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
    best_parts:  [WORK,CARRY,MOVE],
    harv_parts: [WORK,CARRY,MOVE],
    resps: {
	"bld": [STRUCTURE_TOWER],
	"harv": [STRUCTURE_TOWER,STRUCTURE_EXTENSION]
    },
    emergency_parts: [WORK,CARRY,MOVE],
    home: Game.spawns['spn1'].room,
    vis: Game.spawns['spn1'].room.visual,
    target_harv: 3,
    target_bld: 2,
    target_upg: 5,
    room_energy_cap: function(){return Game.spawns["spn1"].room.energyCapacityAvailable;},
    room_energy_ava: function(){return Game.spawns["spn1"].room.energyAvailable;},
    target_popul: function() {
	var total = 0;
	for (var typ in vars.population){
	    if (typ!='total'){total+=vars.population[typ].target_num;}
	};
	vars.population.total.target_num = total;
	return total;
    }

}

module.exports = vars;
