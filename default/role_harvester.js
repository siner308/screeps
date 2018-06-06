var find_structures = require('find_structures');
var role_miner = require('role_upgrader');

var role_harvester = {
    run: function(creep){
        var target = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);

        // 들고있는 에너지가 없다면, storage가 있는지 확인해라.
        if(!creep.carry.energy){
            // storage가 있다면, 위치를 확인해라.
            if (mystorage.store[RESOURCE_ENERGY]){
                // storage가 멀리있다면, 거기로 가라.
                if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mystorage);
                }
                // storage에 도착했다면, withdraw해라.
                else{
                    creep.withdraw(mystorage, RESOURCE_ENERGY);
                    creep.say('좀 쓸게여ㅎ', true);
                }
            }
            else{
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                }
                else{
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                    creep.say('내가캐고말지');
                }
            }
        }

        else {
            if(Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity){
                if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['spawn_first']);
                    creep.say('🏠', true);
                }
            }

            else{
                for(var room_name in Game.rooms);
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER)
                            && structure.energy < structure.energyCapacity;
                    }});

                //if(Game.rooms[room_name].energyAvailable == Game.rooms[room_name].energyCapacityAvailable){
                if(targets.length > 0){
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0]);
                        creep.say('🏠', true);
                    }
                }
                else{ creep.say('꽉찼다~', true);
                    creep.moveTo(25, 19);
                    // role_
                }
                // creep.moveTo(targets[0]);
                // creep.transfer(targets[0], RESOURCE_ENERGY);

            }
        }
    }
};

module.exports = role_harvester;
