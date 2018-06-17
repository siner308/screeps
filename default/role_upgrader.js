var find_structures = require('find_structures');

var role_upgrader = {
    run: function(creep){

        // var sources = creep.room.find(FIND_SOURCES); // container가 없을떄 자원을 캐러 가기 위한 소스
        var container = find_structures.containers(creep); // 자원이 있는 컨테이너를 반환해줌
        var mystorage = creep.room.storage;
        
        // get link pos
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 38, 33)[0];
        
        var sources = creep.room.find(FIND_SOURCES);
        // controller가 멀리 있다면, 에너지 상태를 확인하고, withdraw하거나 controller로 이동한다.
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            // 들고있는 에너지가 없다면, container의 위치를 확인한다.
            if(creep.carry.energy != creep.carryCapacity){
                // 에너지를 가져올 장소가 있다면, 멀리있는지 확인해보자.
                if(linkFrom.energy){
                    if(creep.withdraw(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(linkFrom);
                    }
                }
                else{
                    if (mystorage.store[RESOURCE_ENERGY]){
                        if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                            creep.say('⛏️<<⏫', true);
                        }
                    }
                    else{
                        if(creep.harvest(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(sources[1]);
                            creep.say('내가캐고말지!', true);
                        }
                    }
                }
            }
            // withdraw 한 상태라면, controller로 이동한다.
            else{
                creep.moveTo(creep.room.controller);
                creep.say('⛏️>>⏫', true);
            }
        }
        // controller가 근처에 있다면 에너지 상태를 보고, transfer하거나, container로 이동한다.
        else{
            // 들고있는 에너지가 없다면, container의 위치를 확인한다.
            if(creep.carry.energy == 0){
                if(linkFrom.energy){
                    if(creep.withdraw(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(linkFrom);
                        creep.say('가깝군!', true);
                    }
                }
                else{
                    // 에너지를 가져올 장소가 있다면, 멀리있는지 확인해보자.
                    if (mystorage.store[RESOURCE_ENERGY]){
                        if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                            creep.say('⛏️<<⏫', true);
                        }
                    }
                    else{
                        if(creep.harvest(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(sources[1]);
                            creep.say('내가캐고말지!', true);
                        }
                    }
                }
            }
            // 들고있는 에너지가 있다면, controller로 transfer한다.
            else{
                creep.upgradeController(creep.room.controller);
                creep.say(creep.carry.energy/10, true);
            }
        }
    }
};

module.exports = role_upgrader;