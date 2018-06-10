var find_structures = require('find_structures');
var role_miner = require('role_upgrader');

var role_harvester = {
    run: function(creep){
        var mycontainer = find_structures.containers(creep);
        var container_full = find_structures.containers_full(creep);
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
        var extensions = find_structures.extensions(creep);
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        // console.log(linkFrom);
        // console.log('test : ' + mycontainer.store.K);
        // console.log(container_full);
        console.log(JSON.stringify(creep.carry, null, 2));
        // 에너지를 꽉 채워서 들고있지 않다면,
        if(_.sum(creep.carry) != creep.carryCapacity){
            if(container_full[0]){
                if(creep.withdraw(container_full[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container_full[0]);
                }
                else{
                    creep.moveTo(container_full[0]);
                }
            }
            else{
                // container가 있는가.
                if (mycontainer[0]){
                    // if(mycontainer.store[RESOURCE_GHODIUM_OXIDE]){
                    //     if(creep.withdraw(mycontainer, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    //         creep.moveTo(mycontainer);
                    //         creep.say('bring mineral');
                    //     }
                    //     else{
                    //         creep.withdraw(mycontainer, RESOURCE_GHODIUM_OXIDE);
                    //         creep.say('bring mineral');
                    //     }
                    // }
                    // else{
                        // container가 멀리있다면, 거기로 가라.
                        // console.log(creep.withdraw(mycontainer, RESOURCE_ENERGY));
                        if(creep.withdraw(mycontainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mycontainer[0]);
                        }
                        // container에 도착했다면, withdraw해라.
                        else{
                            creep.withdraw(mycontainer[0], RESOURCE_ENERGY);
                            creep.say('좀 쓸게여ㅎ', true);
                        }
                    // }
                }
                // container가 없다면, 직접 캐러가자.
                else{
                    console.log('nocontainer');
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
        }
        // 에너지를 꽉채워서 들고있다면,
        else {
            for(const resourceType in creep.carry){
                // to spawn
                if((Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity) && creep.carry.energy){
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
                else{
                    // to extensions
                    if(extensions && creep.carry.energy){
                        if(creep.transfer(extensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(extensions);
                        }
                        else{
                            creep.transfer(extensions, RESOURCE_ENERGY);
                        }
                    }
                    else{
                        // to link
                        if(linkFrom.energy < linkFrom.energyCapacity && creep.carry.energy){
                            if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(linkFrom);
                            }
                            else{
                                creep.transfer(linkFrom, RESOURCE_ENERGY);
                            }
                        }
                        else{
                            var tower = find_structures.towers(creep);
                            
                            // to tower
                            if(tower && creep.carry.energy){
                                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(tower);
                                }
                                else{
                                    creep.transfer(tower, RESOURCE_ENERGY);
                                }
                            }
                            else{
                                if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(mystorage);
                                }
                                else{
                                    creep.transfer(mystorage, resourceType);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = role_harvester;