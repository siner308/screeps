var find_structures = require('find_structures');
var role_harvester = require('role_harvester');

var role_storager = {
    run: function(creep){
        var mycontainer = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        const linkFrom1 = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        const linkFrom2 = Game.rooms['W5N8'].lookForAt('structure', 22, 23)[0];
        var resourceType = []
        for(resourceType in creep.carry);

        if(linkFrom1.energy < linkFrom1.energyCapacity){
            if(!creep.carry.energy){
                if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage);
                }
            }
            else{
                if(creep.transfer(linkFrom1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkFrom1);
                }
            }
        }
        else if(linkFrom2.energy < linkFrom2.energyCapacity){
            if(!creep.carry.energy){
                if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage);
                }
            }
            else{
                if(creep.transfer(linkFrom2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkFrom2);
                }
            }
        }
        else{
            if(mycontainer){
                if(_.sum(creep.carry) == creep.carryCapacity){
                    if(mystorage){
                        if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                        }
                    }
                    else{
                        creep.say('!storage', true);
                        role_harvester.run(creep);
                    }
                }
                else{
                    if(creep.withdraw(mycontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mycontainer);
                    }
                }
            }
            else{
                role_harvester.run(creep);
            }
        }
    }
    
}
module.exports = role_storager;