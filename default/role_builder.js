var find_structures = require('find_structures');
var role_harvester = require('role_harvester');

var role_builder = {
    run: function(creep){
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        // 짓고 싶은데, 에너지가 없다면, 일단 짓지말자.
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }
        // 에너지가 꽉찼다면, 건물을 지어보도록 하자.
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity){
            creep.memory.building = true;
            creep.say('🚧', true);
        }

        // 건물을 지을거라면, 지을것이 있는지 찾아보자.
        if(creep.memory.building){
            // 지을 건물이 있다면, 건설지가 어디에 있는지 찾아보자.
            if(targets.length){
                // 건설지가 멀리 있다면, 거기로 가자.
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('☄️', true);
                }
            }
            // 지을 건물이 없다면, 휴식지로 가서 쉬자.
            else{
                role_harvester.run(creep);  
            }
        }
        // 에너지가 없다면, 에너지를 withdraw할 장소를 찾아보자.
        else{
            // 에너지를 가져올 장소가 있다면, 멀리있는지 확인해보자.
            if(mystorage){
                if (_.sum(mystorage.store) < mystorage.storeCapacity){
                    if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mystorage.pos);
                        creep.say('가지러가즈아', true)
                    }
                }
                else{
                    creep.say('full storage', true);
                }
            }
            else{
                role_harvester.run(creep);
            }
        }
    }
};

module.exports = role_builder;
