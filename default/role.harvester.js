/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var role_harvester = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            
            else{
                creep.say('⛏️');
            }
        }
        
        else {
            if(Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity){    
                if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {            
                    creep.moveTo(Game.spawns['spawn_first']);
                    creep.say('🏠');
                }
                
                    creep.say('🏠');
            }
            
            else{
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                creep.moveTo(targets[0]);
                creep.transfer(targets[0], RESOURCE_ENERGY);
                
                creep.say('🏠');
            }
        }
    }
};

module.exports = role_harvester;