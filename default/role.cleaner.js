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
            let droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            console.log(droppedResource);
            if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
        if (!creep.memory.cleaning && _.sum(creep.carry) == creep.carryCapacity) {
            let storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity
            });
            if (container) {
                for(const resourceType in creep.carry) {
                    if (creep.transfer(container, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    }
};