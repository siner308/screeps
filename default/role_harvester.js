var find_structures = require('find_structures');
var role_miner = require('role_upgrader');

var role_harvester = {
    run: function(creep){
        var mycontainer = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        // console.log(linkFrom);
        console.log('test : ' + mycontainer.store.K);

        // 에너지를 꽉 채워서 들고있지 않다면,
        if(_.sum(creep.carry) == 0){
            // container가 있는가.
            if (mycontainer){
                if(mycontainer.store[RESOURCE_GHODIUM_OXIDE]){
                    if(creep.withdraw(mycontainer, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mycontainer);
                        creep.say('bring mineral');
                    }
                    else{
                        creep.withdraw(mycontainer, RESOURCE_GHODIUM_OXIDE);
                        creep.say('bring mineral');
                    }
                }
                else{
                    // container가 멀리있다면, 거기로 가라.
                    if(creep.withdraw(mycontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mycontainer);
                    }
                    // container에 도착했다면, withdraw해라.
                    else{
                        creep.withdraw(mycontainer, RESOURCE_ENERGY);
                        creep.say('좀 쓸게여ㅎ', true);
                    }
                }
            }
            // container가 없다면, 직접 캐러가자.
            else{
                // 에너지가 멀리있다면, 거기로 가라.
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                    creep.say('내가캐고말지', true);
                }
                // 에너지에 도착했다면, 캐라.
                else{
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                    creep.say('내가캐고말지', true);
                }
            }
        }
        // 에너지를 꽉채워서 들고있다면,
        else {
            for(const resourceType in creep.carry){
                // if(resourceType != RESOURCE_ENERGY){
                    if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mystorage);
                    }
                    else{
                        creep.transfer(mystorage, resourceType);
                    }
                // }
            }
            // if(creep.carry.RESOURCE_KEANIUM != 0){
            //     if(creep.transfer(mystorage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
            //         creep.moveTo(mystorage);
            //         creep.say('m to s', true);
            //     }
            //     else{
            //         creep.transfer(mystorage, RESOURCE_KEANIUM);
            //     }
            // }
            // else{
                // spawn의 에너지가 꽉 차지 않았다면,
                if(Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity){
                    // spawn에서 멀리 떨어져있다면, 거기로 가라
                    if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.spawns['spawn_first']);
                        creep.say('🏠', true);
                    }
                    else{
                        creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY);
                        creep.say('🏠', true);
                    }
                }
                // spawn의 에너지가 꽉찼다면, 다른 곳을 찾아보자.
                else{
                    // tower, extension, link, storage 리스트를 만들어라.
                    var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                            return (((structure.structureType == STRUCTURE_EXTENSION)
                                || (linkFrom))
                                && structure.energy < structure.energyCapacity)
                                
                                || (structure.structureType == STRUCTURE_STORAGE
                                && _.sum(structure) < structure.storeCapacity);
                        }});
                    // 그중에서 가장 가까운 곳을 골라라.
                    var real_target = creep.pos.findClosestByPath(targets);
                    // 비어있는 타겟이 있다면,
                    if(linkFrom.energy < linkFrom.energyCapacity){
                        if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(linkFrom);
                        }
                        else{
                            creep.transfer(linkFrom, RESOURCE_ENERGY);
                        }
                    }else{
                        if(targets){
                            // 타겟에서 멀리 떨어져있다면, 거기로 가라.
                            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(targets);
                                creep.say('🏠?', true);
                            }
                            else{
                                creep.transfer(targets, RESOURCE_ENERGY);
                            }
                        }
                        // 타겟이 없다면. (structure도 꽉찼다면. 쉬자.)
                        else{ creep.say('꽉찼다~', true);
                            creep.moveTo(25, 19);
                        }    
                    }
                }
                
            // }
        }
    }
};

module.exports = role_harvester;
