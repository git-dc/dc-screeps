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
    /** @param {string} msg, {Object} next_to_object **/
    display: function(msg, next_to_object,posit=0,colr='white') {
        msg = msg.split('\n');
        var linum = 0;
        for (var item in msg){
            next_to_object.room.visual.text(msg[item], next_to_object.pos.x+4, next_to_object.pos.y-2+linum*0.75+posit, {size:'0.75', align: 'left', opacity: 1, color:colr});           
            linum+=1
        }
    },
    
    /** @param {} **/
    census: function (){
	var msg = "Tick: "+ Game.time + " Energy: "+vars.room_energy_ava()+'/'+vars.room_energy_cap();
	switch (utils.spawnable(vars.best_parts)){
	case 0: msg+=' - OK'; break;
	case 1: msg+=' - EH'; break;
	case 2: msg+=' - NOT OK'; break;
	case 3: msg+=' - undefined'; break;
	    
	}
        // if (utils.spawnable(vars.best_parts)){msg+=' - OK'}
        // else if (utils.spawn_budget(vars.best_parts)<vars.room_energy_ava()){msg+=' - EH'}
        // else if (utils.spawn_budget(vars.best_parts)>vars.room_energy_cap()){msg+=' - NOT OK'}
	
        var popul = vars.population;
        for (var typ in popul){
            popul[typ].count = _.filter(Game.creeps, (creep) => creep.memory.role == popul[typ].role).length;
	    popul.total+=popul[typ].count;
	    if (typ != 'total'){
	    	msg+='\n'+typ+': '+popul[typ].count + '/' + vars.target_nums[typ].count;
	    }
        }
	msg+='\nTotal population: ' + popul.total +'/'+ vars.target_popul();
        // population.total =  population.harvesters.count+population.builders.count+population.upgraders.count;

        // msg+='\nHarvesters: ' + population.harvesters.count +'/'+ vars.target_harv;
        // msg+='\nBuilders: ' + population.builders.count +'/'+ vars.target_bld;
        // msg+='\nUpgraders: ' + population.upgraders.count +'/'+ vars.target_upg;
        
        utils.display(msg,Game.spawns['spn1']);
        return population;
    },
    /** @param {string} typ **/
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
    collect: function(creep,choice=1){
        var sources = vars.home.find(FIND_SOURCES);
        if(creep.harvest(sources[choice]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[choice], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return sources.length > 0;
    },
    maintain: function(creep){
        var targets = vars.home.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (creep.memory.resps.includes(structure.structureType)) && structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        return targets.length > 0;
    },
    upg_home_controller: function(creep){
        if(creep.upgradeController(vars.home.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(vars.home.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },
    spawnable: function(parts){
	if (Game.spawns['spn1'].spawnCreep(parts, 'test',{memory: {role: 'harv'}, dryRun: true})==0){return 0;}
	else if (utils.spawn_cost(parts)<vars.room_energy_ava()){return 1;}
	else if (utils.spawn_cost(parts)>vars.room_energy_cap()){return 2;}
	return 3;
    },
    spawn_cost: function(parts){
        spawn_cost = 0;
        for (var part in parts){
            if (parts[part] == WORK){spawn_cost+=100}
            else if (parts[part] == CARRY){spawn_cost+=50}
            else if (parts[part] == MOVE){spawn_cost+=50}
        }
        return spawn_cost;
    },
    l2dist: function(creep, location){
        var targetx = location.pos.x;
        var targety = location.pos.y;
        dist = ((creep.x-targetx)**2 + (creep.y-targety)**2)**0.5;
	return dist;
    },
    l1dist: function(creep, location){
        var targetx = location.pos.x;
        var targety = location.pos.y;
        dist = (creep.x-targetx) + (creep.y-targety);
	return dist;
    },
    
    // #################################################################################
    gobuild: function (creep){
        var targets = vars.home.find(FIND_CONSTRUCTION_SITES);
        if(targets.length>0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }    
        }
        return targets.length > 0;
    },
    gorepair: function (creep){
        console.log("repairing");
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
        return targets.length > 0;
    }
    
};

module.exports = utils;


