var role_repairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            creep.say('repairer');
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
            creep.say(targets[0]);
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                else{
                    creep.say('repairing');
                    creep.transfer(targets[0], RESOURCE_ENERGY);
                }
            }
            else{
                creep.say('no-target');
            }
        }
	}
};

module.exports = role_repairer;
