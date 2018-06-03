var role_upgrader = {
    
    run: function(creep){
        
        var sources = creep.room.find(FIND_SOURCES);
        
        // if far from upgrading place
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            
            // if empty, go harvest
            if(creep.carry.energy == 0){
                    creep.moveTo(source[1]);
                    creep.say('⛏️');
            }
            
            // if full, go to upgrading place
            else if(creep.carry.energy == creep.carryCapacity){
                creep.moveTo(creep.room.controller);
                creep.say('업글~');
            }
            
            // if harvesting, keep going
            else{
                creep.harvest(sources[1]);
                creep.say('⛏️');
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
                creep.say('⏫') ;  
            }
        }
    }
};

module.exports = role_upgrader;