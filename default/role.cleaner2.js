var role_cleaner2 = {
    run: function(creep){
        creep.say('cleaner2');
        // find resources
        targets = creep.findClosestByPath(
            FIND_DROPPED_ENERGY
            || FIND_DROPPED_RESOURCES
            || FIND_TOMBSTONES, 'W5N8');
        
        storerooms = creep.findClosestByPath(
            STRUCTURE_SPAWN
            || STRUCTURE_EXTENSION);

        if (targets.length > 0){
            if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
            }
            else{
                creep.pickup(targets[0]);
            }
        }
        else{
            if(creep.carry == creep.carryCapacity){
                if(storerooms.length > 0){
                    if(storerooms[0].storeCapacity > storerooms[0].store){
                        if(creep.transfer(storerooms[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storerooms[0]);
                        }
                        else{
                            creep.transfer(storerooms[0], RESOURCE_ENERGY);
                        }
                    }
                    else{
                        creep.say('넣을공간이없당');
                    }
                }
                else{
                    creep.say('넣을데가없당');
                }
            }
            else{
                creep.withdraw(targets[0], RESOURCE_ENERGY);
            }
        }
    }
}

module.exports = role_cleaner2;