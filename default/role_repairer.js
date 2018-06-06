var find_structures = require('find_structures');
var role_upgrader = require('role_upgrader');

var role_repairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container = find_structures.containers(creep);

        if(creep.carry.energy == 0) {
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
                // creep.say('energy!!', true);
            }
            else{
                creep.withdraw(container, RESOURCE_ENERGY);
                // creep.say('energy!!', true);
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
                        || (structure.structureType == STRUCTURE_CONTAINER)
                    ) && (structure.hits != structure.hitsMax);
                }
            });

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }

                else{
                    creep.say('repair!!', true);
                    creep.repair(targets[0]);
                }
            }
            else{
                creep.say('고칠게없당', true);
            }
        }
    }
};

module.exports = role_repairer;
