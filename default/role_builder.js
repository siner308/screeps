var find_structures = require('find_structures');
var role_harvester = require('role_harvester');

var role_builder = {
    run: function(creep){
        // var i = 0, cnt = 0;
        // var construction_sites = [];
        // var container = find_structures.containers(creep);
        // for (var room_name in Game.rooms);
        // // console.log('rooms : ' + room_name.length);
        // console.log(Game.rooms[room_name]);
        //     // if(Game.rooms[room_name].find(FIND_MY_CONSTRUCTION_SITES)){
        // for(j = 0; j < Game.rooms[room_name].find(FIND_MY_CONSTRUCTION_SITES).length; j++){
        //     construction_sites[cnt] = Game.rooms[room_name].find(FIND_MY_CONSTRUCTION_SITES)[j];
        //     cnt++;
        // }
            // }
        // }
        // console.log(construction_sites.length);
        // var mystorage2 = Game.rooms[room_name].find(FIND_MY_STRUCTURES, {filter : (s) => s.structureType == STRUCTURE_STORAGE});
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
                // 건설지에 도착했다면, 건설하자.
                else{
                    creep.build(targets[0]);
                    creep.say('☄️', true);
                }
            }
            // 지을 건물이 없다면, 휴식지로 가서 쉬자.
            else{
                creep.moveTo(24, 20);
                creep.say('할일없다~', true); 
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
                    else{
                        creep.withdraw(mystorage, RESOURCE_ENERGY);
                        creep.say('머냥', true)
                    }
                }
                else{
                    creep.say('머냥!', true);
                }
            }
            else{
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                    creep.say('내가캐고말지!', true);
                }
                else{
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                    creep.say('내가캐고있다!', true);
                }
            }
        }
    }
};

module.exports = role_builder;
