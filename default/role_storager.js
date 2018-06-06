var find_structures = require('find_structures');

var role_storager = {
    run: function(creep){
        var container = find_structures.containers(creep);
        var mystorage = creep.room.storage;
        
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
                    creep.say('!storage');
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
module.exports = role_storager;