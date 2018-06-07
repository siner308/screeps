var find_structures = require('find_structures');
var role_miner = require('role_upgrader');

var role_harvester = {
    run: function(creep){
        var mycontainer = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        // console.log(linkFrom);

        // 들고있는 에너지가 없다면, storage가 있는지 확인해라.
        if(!creep.carry.energy){
            // storage가 있다면, 위치를 확인해라.
            if (mycontainer){
                // storage가 멀리있다면, 거기로 가라.
                if(creep.withdraw(mycontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mycontainer);
                }
                // storage에 도착했다면, withdraw해라.
                else{
                    creep.withdraw(mycontainer, RESOURCE_ENERGY);
                    creep.say('좀 쓸게여ㅎ', true);
                }
            }
            else{
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                }
                else{
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                    creep.say('내가캐고말지', true);
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
                        return ((structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER
                            || linkFrom)
                            && structure.energy < structure.energyCapacity)
                            
                            || (structure.structureType == STRUCTURE_STORAGE
                            && _.sum(structure) < structure.storeCapacity);
                    }});
                var real_target = creep.pos.findClosestByPath(targets);

                //if(Game.rooms[room_name].energyAvailable == Game.rooms[room_name].energyCapacityAvailable){
                if(real_target){
                    if(creep.transfer(real_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(real_target);
                        creep.say('🏠', true);
                    }
                }
                else{ creep.say('꽉찼다~', true);
                    creep.moveTo(25, 19);
                    // role_
                }
            }
        }
    }
};

module.exports = role_harvester;
