var find_structures = require('find.structures');

var role_upgrader = {
    
    run: function(creep){
        
        var sources = creep.room.find(FIND_SOURCES);
        var container = find_structures.containers(creep);
        
        // if far from upgrading place
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            
            // if empty, go harvest
            if(creep.carry.energy == 0){
                    creep.moveTo(sources[1]);
                    creep.say('⛏️<<⏫', true);
            }
            
            // if full, go to upgrading place
            else if(creep.carry.energy == creep.carryCapacity){
                creep.moveTo(creep.room.controller);
                creep.say('⛏️>>⏫', true);
            }
            
            // if harvesting, keep going
            else{
                creep.harvest(sources[1]);
                creep.say('⛏️', true);
            }
        }
        
        else{
            
            // if empty, go harvest
            if(creep.carry.energy == 0){
                creep.moveTo(sources[1]);
                creep.harvest(sources[1]);
            }
            
            // if not empty, upgrade it
            else{
                creep.upgradeController(creep.room.controller);
                creep.say('⏫', true);
            }
        }
    }
};

module.exports = role_upgrader;