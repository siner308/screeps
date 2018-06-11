var find_structures = require('find_structures');

var role_storager = {
    run: function(creep){
        var mycontainer = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        var resourceType = []
        for(resourceType in creep.carry);
        
        var containerResources = []
        for(containerResources in mycontainer.store);
        
        if(linkFrom.energy < linkFrom.energyCapacity){
            if(!creep.carry.energy){
                if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage);
                }
                else{
                    console.log('storager / 1');
                }
            }
            else{
                if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkFrom);
                    creep.say('to link', true);
                }
                else{
                    console.log('storager / 2');
                }
            }
        }
        else{
            if(mycontainer){
                if(_.sum(creep.carry) == creep.carryCapacity){
                    if(mystorage){
                        if(creep.transfer(mystorage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                            creep.say('!aaaaaaa', true);
                        }
                        else{
                            console.log('storager / 3');
                        }
                    }
                    else{
                        creep.say('!storage', true);
                    }
                }
                else{
                    if(creep.withdraw(mycontainer, containerResources) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mycontainer);
                        creep.say('!test', true);
                    }
                    else{
                        console.log('storager / 4');
                    }
                }
            }
            else{
                creep.say('!container', true);
            }
        }
    }
    
}
module.exports = role_storager;