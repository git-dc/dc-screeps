/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('vars');
 * mod.thing == 'a thing'; // true
 */

var vars = {
    default_population: {
	'miners': {
	    role: 'mnr',
	    count: 0,
	    trg: 0,
	    min: 0,
	    parts: [WORK,WORK,WORK,WORK,CARRY,MOVE],
	    resps: []
	},
	'carriers': {
	    role: 'car',
	    count: 0,
	    trg: 0,
	    min: 0,
	    parts: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
	    resps: []
	},
	'harvesters': {
	    role: 'harv',
	    count: 0,
	    trg: 3,
	    min: 1,
	    parts: [WORK,CARRY,MOVE],
	    resps: [STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN]
	},
	'upgraders': {
	    role: 'upg',
	    count: 0,
	    trg: 5,
	    min: 1,
	    parts: [WORK,CARRY,MOVE],
	    resps: []
	},
	'builders': {
	    role: 'bld',
	    count: 0,
	    trg: 2,
	    min: 0,
	    parts: [WORK,CARRY,MOVE],
	    resps: [STRUCTURE_TOWER]
	},
	'total': {
	    role: 'all',
	    count: 0,
	    trg: 0
	}
    },

    population: {
	'miners': {
	    role: 'mnr',
	    count: 0,
	    trg: 0,
	    min: 0,
	    parts: [WORK,WORK,WORK,WORK,CARRY,MOVE],
	    resps: [STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN]
	},
	'carriers': {
	    role: 'car',
	    count: 0,
	    trg: 0,
	    min: 0,
	    parts: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
	    resps: []
	},
	'harvesters': {
	    role: 'harv',
	    count: 0,
	    trg: 3,
	    min: 1,
	    parts: [WORK,CARRY,MOVE],
	    resps: [STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN]
	},
	'upgraders': {
	    role: 'upg',
	    count: 0,
	    trg: 5,
	    min: 1,
	    parts: [WORK,CARRY,MOVE],
	    resps: []
	},
	'builders': {
	    role: 'bld',
	    count: 0,
	    trg: 2,
	    min: 0,
	    parts: [WORK,CARRY,MOVE],
	    resps: [STRUCTURE_TOWER]
	},
	'total': {
	    role: 'all',
	    count: 0,
	    trg: 0
	}
    },
    stage: 0,
    // best_parts:  [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
    best_parts:  [WORK,CARRY,MOVE],
    harv_parts: [WORK,CARRY,MOVE],
    resps: {
	"bld": [STRUCTURE_TOWER],
	"harv": [STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN]
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
	for (var typ in this.population){
	    if (typ!='total'){total+=this.population[typ].trg;}
	};
	this.population.total.trg = total;
	return total;
    }

}

module.exports = vars;
