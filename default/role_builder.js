var find_structures = require('find_structures');

var role_builder = {
    run: function(creep){
        var container = find_structures.containers(creep);

        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }

        if(!creep.memory.building && (creep.carry.energy == creep.carryCapacity)){
            creep.memory.building = true;
            creep.say('🚧', true);
        }

        if(creep.memory.building){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('☄️', true);
                }
                else{
                    creep.say('☄️', true);
                }
            }
            else{
                creep.moveTo(24, 20);
                creep.say('할일없다~', true);
            }
        }
        else{
            for(var room_name in Game.rooms);
            var aaa = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN
                        || structure.structureType == STRUCTURE_CONTAINER)
                        && structure.energy != 0;
                }});

            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(container);
                creep.say('⛏️', true);
            }
            else{
                creep.say('⛏️', true);
            }
        }
    }
};

module.exports = role_builder;
