var role_harvester = require('role_harvester');

var role_harvester_origin = {
    run: function(creep){
        var sources = creep.room.find(FIND_SOURCES);
        
        if(creep.carry.energy < creep.carryCapacity){
            if(creep.harvest(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[1]);
            }
        }
        else{
            if(creep.transfer(Game.spawns['spwan_first'], RESOURCE_ENERGY) == ERR_FULL){
                role_harvester.run(creep);
            }
            else{
                if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.spawns['spawn_first']);
                }
            }
        }
    }
}


module.exports = role_harvester_origin;