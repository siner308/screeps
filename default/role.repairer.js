var find_structures = require('find.structures');

var role_repairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container = find_structures.containers(creep);
        
	    if(creep.carry.energy < creep.carryCapacity) {
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
                creep.say('move to container', true);
            }
            else{
                creep.withdraw(container, RESOURCE_ENERGY);
                creep.say('withdraw', true);
            }
        }
        
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_ROAD) 
                         || (structure.structureType == STRUCTURE_EXTENSION) 
                         || (structure.structureType == STRUCTURE_SPAWN) 
                         || (structure.structureType == STRUCTURE_TOWER)
                        ) && (structure.energy < structure.energyCapacity);
                    }
            });
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                else{
                    creep.say('repairing', true);
                    creep.repair(targets[0]);
                }
            }
            else{
                creep.say('no-target', true);
            }
        }
	}
};

module.exports = role_repairer;
