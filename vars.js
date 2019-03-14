/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('vars');
 * mod.thing == 'a thing'; // true
 */

var vars = {
    best_parts:  [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
    harv_parts: [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
    emergency_parts: [WORK,CARRY,MOVE],
    home: Game.rooms['E7N17'],
    vis: Game.rooms['E7N17'].visual,
    target_harv: 3,
    target_bld: 2,
    target_upg: 5,
    room_energy_cap: function(){return Game.spawns["spn1"].room.energyCapacityAvailable},
    room_energy_ava: function(){return Game.spawns["spn1"].room.energyAvailable}
}
module.exports = vars;
