var find_structures = require('find_structures');
var role_miner = require('role_upgrader');

var role_harvester = {
    run: function(creep){
        var tower = find_structures.towers(creep);
        var mycontainer = find_structures.containers(creep);
        var container_full = find_structures.containers_full(creep);
        var mystorage = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
        var extensions = find_structures.extensions(creep);
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        var resourceType = [];
        for(resourceType in creep.carry);
        var containerResources = [];
        if(mycontainer){
            for(containerResources in mycontainer.store);
            // console.log('test : ' + containerResources);
        }
        var containerFullResources = [];
        if(container_full){
            for(containerFullResources in container_full.store);
            // console.log('test : ' + containerFullResources);
        }
        
        if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.flag = true;
        }
        
        if(_.sum(creep.carry) == 0){
            creep.memory.flag = false;
        }
        
        if(!creep.memory.flag){
            if(container_full){
                if(creep.withdraw(container_full, containerFullResources) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container_full, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                // container가 있는가.
                if (mycontainer){
                    if(creep.withdraw(mycontainer, containerResources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mycontainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                // container가 없다면, 직접 캐러가자.
                else{
                    console.log('container has not enough energy')
                    // 에너지가 멀리있다면, 거기로 가라.
                    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.say('내가캐고말지', true);
                    }
                }
            }
        }
        
        else{
            // to spawn
            if((Game.spawns['spawn_first'].energy != Game.spawns['spawn_first'].energyCapacity) && creep.carry.energy){
                // spawn에서 멀리 떨어져있다면, 거기로 가라
                if(creep.transfer(Game.spawns['spawn_first'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['spawn_first'], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('🏠', true);
                }
            }
            else{
                // to extensions
                if(extensions && creep.carry.energy){
                    if(creep.transfer(extensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(extensions, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else{
                    // to link
                    if(linkFrom.energy < linkFrom.energyCapacity && creep.carry.energy){
                        if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(linkFrom, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    else{
                        
                        // to tower
                        if(tower && creep.carry.energy){
                            if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                        else{
                            if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(mystorage, {visualizePathStyle: {stroke: '#ffaa00'}});
                                creep.say('success!!', true);
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = role_harvester;