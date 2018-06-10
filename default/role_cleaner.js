var find_structures = require('find_structures');
var define_resources = require('define_resources');
module.exports = {
    run: function (creep) {

        // 컨테이너의 위치를 찾는다.
        var container = find_structures.containers(creep);
        // 채굴 가능한 에너지원의 위치를 찾는다.
        var sources = creep.room.find(FIND_SOURCES, {filter : (s) => s.energy != 0});
        // 가장 가까이에 떨어진 reousrce 위치를 찾는다.
        var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES || FIND_TOMBSTONES || FIND_DROPPED_ENERGY);
        // spawn, extension, storage, container중, 에너지가 꽉차있지 않은 곳을 찾는다.
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (((structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_EXTENSION)
                    && (structure.energy < structure.energyCapacity))
                    
                    || ((structure.structureType == STRUCTURE_STORAGE)
                    && (_.sum(structure.store) < structure.storeCapacity))
                    && (structure.hits != 0));
            }
        });
        var real_target = creep.pos.findClosestByPath(targets);
        var exist_resources = []
        var i = 0, cnt = 0;
        // resources
        var all_resources = define_resources.resources();
        // exist resources
        for (i = 0; i < all_resources.length; i++){
            if(creep.pickup(all_resources[i]) == (OK || ERR_FULL || ERR_BUSY || ERR_NOT_IN_RANGE)){
                exist_resources[cnt] = all_resources[i];
                cnt++;
            }
        }
        // console.log(all_resources.length);
        // console.log(exist_resources.length);

        // 떨어진 에너지가 있는지 확인해서 마이너, 클리너 중 진로를 정한다.
        if(droppedResource){
            // 에너지를 꽉 채워서 들고있지 않다면, 떨어진 리소스가 있는지 확인하자.
            if (_.sum(creep.carry) < creep.carryCapacity){
                // 떨어진 리소스가 멀리 있다면, 거기로 간다.
                if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('가지러간당', true);
                }
                // 떨어진 리소스 위치에 도착했다면, 줍는다.
                else {
                    creep.pickup(droppedResource);
                }
            }
            // 에너지를 들고있다면, 전달할 장소가 멀리있는지 확인한다.
            else {
                if(real_target){
                // 타겟이 멀리 있다면, 거기로 간다.
                    if (creep.transfer(real_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(real_target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('에너지준당', true);
                    }
                    // 타겟에 도착했다면, 전달한다.
                    else {
                        if(real_target.structureType == STRUCTURE_STORAGE){
                            if(creep.carry.RESOURCE_KEANIUM){
                                creep.transfer(real_target, RESOURCE_KEANIUM);
                            }
                        }
                        creep.transfer(real_target, RESOURCE_ENERGY);
                        creep.say('에너지준당', true);
                    }
                }
                else{
                    // if(creep.room.storage){
                    //     if(_.sum(creep.room.storage.store) < storage.storeCapacity){
                    //         if(creep.transfer())
                    //     }
                    // }
                    creep.say('no target', true);
                }
            }
        }
        // 떨어진 에너지가 없다면, 마이너의 행동을 하자.
        else{
            // 에너지를 꽉 채워서 들고있지 않다면, 에너지의 위치를 확인하자.
            if(_.sum(creep.carry) != creep.carryCapacity){
                if(sources){                
                    // console.log(creep.harvest(sources[0], RESOURCE_ENERGY));
                    // 에너지가 멀리 있다면, 거기로 가자.
                    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0]);
                        creep.say('내가캐고말지!', true);
                    }
                    // 에너지에 도착했다면, 채굴을 시작하자.
                    else{
                        creep.harvest(sources[0], RESOURCE_ENERGY);
                        creep.say('내가캐고말지!', true);
                    }
                }
                else{
                    creep.say('no sources', true);    
                }
            }
            // 에너지를 꽉 채워서 들고있다면, 전달할 위치를 확인하자.
            else{
                // 전달할 곳이 멀다면, 거기로 가자.
                if(creep.transfer(real_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(real_target);
                    creep.say('내가캤다!', true);
                }
                // 전달할 곳에 도착했다면, 전달하자.
                else{
                    if(real_target.structureType == STRUCTURE_STORAGE){
                        if(creep.carry.RESOURCE_KEANIUM){
                            creep.transfer(real_target, RESOURCE_KEANIUM);
                        }
                    }
                    creep.transfer(real_target, RESOURCE_ENERGY);
                    creep.say('내가캤다!', true);
                }
            }
        }

        // 에너지를 꽉 채워서 들고있다면, 에너지를 전달한다.

    }
};