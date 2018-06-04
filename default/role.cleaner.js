var find_structures = require('find.structures');

module.exports = {
    run: function(creep) {
        var container = find_structures.containers(creep);
        
        if (creep.memory.cleaning && (creep.carry.energy == creep.carryCapacity)) {
            creep.memory.cleaning = false;
            creep.say('📦', true);
        }
        
        if (!creep.memory.cleaning && _.sum(creep.carry) == 0) {
            creep.memory.cleaning = true;
            creep.say('🛁', true);
        }
        
        if (creep.memory.cleaning) {
            let droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES
            || FIND_TOMBSTONES);
            console.log(droppedResource);
            if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('가지러간당', true);
            }
            else{
                creep.pickup(droppedResource);
            }
            
        }
        
        else
        // (!creep.memory.cleaning && (_.sum(creep.carry) == creep.carryCapacity)) 
        {                
            for(var room_name in Game.rooms);
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER
                    || structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_EXTENSION) 
                    && structure.energy < structure.energyCapacity;
                }});
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('돌려준당', true);
            }
            else{
                creep.transfer(targets[0], RESOURCE_ENERGY);
                creep.say('옮긴당', true);
            }
        }
    }
};