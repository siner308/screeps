var find_structures = require('find.structures');

var role_upgrader = {
    
    run: function(creep){
        
        var sources = creep.room.find(FIND_SOURCES);
        var container = find_structures.containers(creep);
        // if(container){        // if far from upgrading place
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                
                // if empty, withdraw
                if(creep.carry.energy != creep.carryCapacity){
                    
                    // moveTo container
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container);
                        creep.say('⛏️<<⏫', true);
                    }
                    
                    // withdraw
                    else{
                        creep.withdraw(container, RESOURCE_ENERGY);
                        creep.say('⛏️', true);
                    }
                }
                
                // go to upgrade
                else{
                    creep.moveTo(creep.room.controller);
                    creep.say('⛏️>>⏫', true);
                }
    
            }
            
            else{
                // if empty, go harvest
                if(creep.carry.energy == 0){
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container);
                        creep.say('⛏️<<⏫', true);
                    }
                    
                    else{
                        creep.withdraw(container, RESOURCE_ENERGY);
                        creep.say('⛏️', true);
                    }
                }
                
                // if not empty, upgrade it
                else{
                    creep.upgradeController(creep.room.controller);
                    creep.say('⏫', true);
                }
            }
            
        // }
        // else{
            // creep.moveTo(25,21);
        // }

    }
};

module.exports = role_upgrader;