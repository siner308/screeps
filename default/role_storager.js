var find_structures = require('find_structures');

var role_storager = {
    run: function(creep){
        var container = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        const linkFrom = Game.rooms['W5N8'].lookForAt('structure', 21, 22)[0];
        
        if(linkFrom.energy < linkFrom.energyCapacity){
            if(!creep.carry.energy){
                if(creep.withdraw(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage);
                }
                else{
                    creep.withdraw(mystorage, RESOURCE_ENERGY);
                }
            }
            else{
                if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkFrom);
                    creep.say('to link', true);
                }
                else{
                    creep.transfer(linkFrom, RESOURCE_ENERGY);
                    creep.say('to link', true);
                }
            }
        }
        else{
            if(container){
                if(creep.carry.energy){
                    if(mystorage){
                        if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mystorage);
                        }
                        else{
                            creep.transfer(mystorage, RESOURCE_ENERGY);
                        }
                    }
                    else{
                        creep.say('!storage', true);
                    }
                }
                else{
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container);
                    }
                    else{
                        creep.withdraw(container, RESOURCE_ENERGY);
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