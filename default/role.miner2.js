var find_structures = require('find.structures');

var role_miner2 = {
    run: function(creep){
        
        var structures = creep.room.find(FIND_MY_STRUCTURES);
        var i = 0;
        var sources = creep.room.find(FIND_SOURCES);
        var container = find_structures.containers(creep);
        
        // if not in workplace, moveTo workplace
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
            creep.moveTo(sources[0]);
            creep.say('마이너당', true);
        }
        
        // if arrived workplace, let's mining
        else{
            creep.harvest(sources[1]);
            creep.transfer(container, RESOURCE_ENERGY);
            creep.say('⛏', true);
            // if full, transfer to container
            // if(creep.carry.energy == creep.carryCapacity){
                
            //     // if is not near from container
            //     if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //         creep.transfer(container, RESOURCE_ENERGY);
            //         creep.say('transfer to container', true);
            //     }
                
            //     // go to container
            //     else{
            //         creep.moveTo(container);
            //     }
            // }
            
            // // if not full, keep mining
            // else{
            //     creep.harvest(sources[1]);
            //     creep.say('⛏', true);
            // }
        }
    }
};


module.exports = role_miner2;