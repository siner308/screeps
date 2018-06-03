var role_miner = {
    run: function(creep){
        
        var structures = creep.room.find(FIND_MY_STRUCTURES);
        var i = 0;
        var sources = creep.room.find(FIND_SOURCES);
        
        for (var containers in structures){
            if(structures.structureType == STRUCTURE_CONTAINER){
                var target = containers[i];    
            }
            
            i++;
        } 
        
        // if not in workplace, moveTo workplace
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
            creep.moveTo(sources[0]);
            creep.say('mv');
        }
        
        // if arrived workplace, let's mining
        else{
            
            // if full, transfer to container
            if(creep.carry.energy == creep.carryCapacity){
                
                // if is not near from container
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.transfer(target, RESOURCE_ENERGY);
                    creep.say('transfer to container');
                }
                
                // go to container
                else{
                    creep.moveTo(target);
                }
            }
            
            // if not full, keep mining
            else{
                creep.harvest(sources[0]);
                creep.say('harvesting');
            }
        }
    }
    
};


module.exports = role_miner;