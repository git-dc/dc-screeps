/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils');
 * mod.thing == 'a thing'; // true
 */
var vars = require('vars');
var utils = {
    /** 
     * @param {string} msg
     * @param {Object} next_to_object 
     **/
    display: function(msg, next_to_object,posit=0,colr='white') {
        msg = msg.split('\n');
        var linum = 0;
        for (var item in msg){
            next_to_object.room.visual.text(msg[item], next_to_object.pos.x+4, next_to_object.pos.y-2+linum*0.75+posit, {size:'0.75', align: 'left', opacity: 1, color:colr});           
            linum+=1;
        }
    },
    
    /** @param {} **/
    census: function (){
	var msg = "Tick: " + Game.time + " Energy: " + vars.room_energy_ava() + '/' + vars.room_energy_cap();
	switch (utils.spawnable(vars.best_parts)){
	case 0: msg+=' - OK'; break;
	case 1: msg+=' - NOT OK'; break;
	case 2: msg+=' - VERY NOT OK'; break;
	case 3: msg+=' - SO BAD, SO VERY BAD'; break;	    
	}
        var popul = vars.population;
	popul.total.count = 0;
	vars.target_popul();
        for (var typ in popul){
	    if (typ != 'total'){
		popul[typ].count = _.filter(Game.creeps, (creep) => creep.memory.role == popul[typ].role).length;
		popul.total.count += popul[typ].count;
	    }
	    msg+='\n'+typ+': '+popul[typ].count + '/' + popul[typ].target_num;
        }
	// msg+='\nTotal population: ' + popul['total'] +'/'+ vars.target_popul();
        utils.display(msg,Game.spawns['spn1']);
        return popul;
    },

    /** 
     * @param {string} typ 
     * @param {Array} parts
     **/
    spawn_new: function(typ,parts=vars.best_parts){
        var newName = typ + Game.time%10000;
        var spawn = Game.spawns['spn1'];
        // console.log('trying to spawn '+typ+' with parts: '+parts)
        if (spawn.spawnCreep(parts, newName,{memory: {role: typ, empty: true}, dryRun: true})==0){
            // spawn.saying('Spawning new: ' + newName);
            spawn.spawnCreep(parts, newName,{memory: {role: typ, empty: true, resps: vars.resps[typ]}});
        }
    },
    
    /** @param {} **/
    routines: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    /** @param {Creep} creep **/
    pickup_dead: function(creep){
        var sources = creep.room.find(FIND_TOMBSTONES
        // ,{
            // filter: (tomb) => {return (tomb.store["RESOURCE_ENERGY"] > 0)}
        // }
        );
        if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0;
    },
    
    /** 
     * @param {Creep} creep 
     * @param {int} choice
     **/
    take: function(creep,choice=1){
        var sources = vars.home.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER && structure.store > creep.carryCapacity;}});
        if(creep.withdraw(sources[choice]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[choice], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0;
    },
    
    /** 
     * @param {Creep} creep 
     * @param {int} choice
     **/
    collect: function(creep,choice=1){
        var sources = vars.home.find(FIND_SOURCES);
        if(creep.harvest(sources[choice]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[choice], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0;
    },
    
    /** 
     * @param {Creep} creep 
     * @param {int} choice
     **/
    mine: function(creep,choice=1){
        var sources = vars.home.find(FIND_SOURCES);
        if(creep.harvest(sources[choice]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[choice], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0;
    },
    
    /** @param {Creep} creep **/
    maintain: function(creep){
        var targets = vars.home.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (creep.memory.resps.includes(structure.structureType)) && structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'white'}});
            }
        }
        return targets.length > 0;
    },

    /** @param {Creep} creep **/
    upg_home_controller: function(creep){
        if(creep.upgradeController(vars.home.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(vars.home.controller, {visualizePathStyle: {stroke: 'white'}});
        }
    },

    /** @param {Array} parts **/
    spawnable: function(parts){
	if (Game.spawns['spn1'].spawnCreep(parts, 'test',{dryRun: true})==0){return 0;}
	else if (utils.spawn_cost(parts)>vars.room_energy_ava() && utils.spawn_cost(parts)<vars.room_energy_cap()){return 1;}
	else if (utils.spawn_cost(parts)>vars.room_energy_cap()){return 2;}
	return 3;
    },

    /** @param {Array} parts **/
    spawn_cost: function(parts){
        var spawn_cost = 0;
        for (var part in parts){
            if (parts[part] == WORK){spawn_cost+=100}
            else if (parts[part] == CARRY){spawn_cost+=50}
            else if (parts[part] == MOVE){spawn_cost+=50}
        }
        return spawn_cost;
    },

    /** 
     * @param {Creep} creep
     * @param {Object} location 
     **/
    l2dist: function(creep, location){
        var targetx = location.pos.x;
        var targety = location.pos.y;
        dist = ((creep.x-targetx)**2 + (creep.y-targety)**2)**0.5;
	return dist;
    },
    
    /** 
     * @param {Creep} creep
     * @param {Object} location 
     **/
    l1dist: function(creep, location){
        var targetx = location.pos.x;
        var targety = location.pos.y;
        dist = (creep.x-targetx) + (creep.y-targety);
	return dist;
    },
    
    /** 
     * @param {Creep} creep
     * @param {Object} location 
     **/
    l8dist: function(creep, location){
        var targetx = location.pos.x;
        var targety = location.pos.y;
        dist = Math.max(creep.x-targetx, creep.y-targety);
	return dist;
    },
    
    /** @param {Creep} creep **/
    gobuild: function (creep){
        var targets = vars.home.find(FIND_CONSTRUCTION_SITES);
        if(targets.length>0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'white'}});
            }    
        }
        return targets.length > 0;
    },

    /** @param {Creep} creep **/
    gorepair: function (creep){
        console.log("repairing");
        var targets = vars.home.find(
            FIND_STRUCTURES, {filter: (structure) => {
		return (creep.memory.resps.includes(structure.structureType)) && structure.hits < structure.hitsMax;}
			     }
        );
        if(targets.length > 0) {
            if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'white'}});
            }
        }
        return targets.length > 0;
    }
    
};

module.exports = utils;


