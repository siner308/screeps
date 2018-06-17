var find_structures = require('find_structures');
var define_resources = require('define_resources');
var role_harvester = require('role_harvester');

module.exports = {
    run: function (creep) {

        // 컨테이너의 위치를 찾는다.
        var container = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        // 채굴 가능한 에너지원의 위치를 찾는다.
        var sources = creep.room.find(FIND_SOURCES, {filter : (s) => s.energy != 0});
        var tombstone = creep.room.find(FIND_TOMBSTONES);
        // 가장 가까이에 떨어진 reousrce 위치를 찾는다.
        var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES || FIND_TOMBSTONES);
        // spawn, extension, storage, container중, 에너지가 꽉차있지 않은 곳을 찾는다.
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (((structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_EXTENSION)
                    && (structure.energy != structure.energyCapacity))
                    );
            }
        });
        var real_target = creep.pos.findClosestByPath(targets);
        // console.log(JSON.stringify(real_target, null, 2));

        var resourceType = []
        for (resourceType in creep.carry);

        console.log(droppedResource);

        // 떨어진 에너지가 있는지 확인해서 마이너, 클리너 중 진로를 정한다.
        if(droppedResource){
            // 에너지를 꽉 채워서 들고있지 않다면, 떨어진 리소스가 있는지 확인하자.
            if (_.sum(creep.carry) < creep.carryCapacity){
                // 떨어진 리소스가 멀리 있다면, 거기로 간다.
                if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('가지러간당', true);
                }
            }
            // 에너지를 들고있다면, 전달할 장소가 멀리있는지 확인한다.
            else {
                if(creep.carry.energy && real_target){
                    console.log('2')
                    // 타겟이 멀리 있다면, 거기로 간다.
                        console.log(creep.transfer(real_target, RESOURCE_ENERGY));
                    if (creep.transfer(real_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(real_target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('에너지준당', true);
                    }
                }
                else{
                    console.log('3');
                    if(mystorage){
                        if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                        }
                    }
                }
            }
        }
        // 떨어진 에너지가 없다면, 마이너의 행동을 하자.
        else{
            role_harvester.run(creep);
        }
    }
};