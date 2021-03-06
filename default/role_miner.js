var find_structures = require('find_structures');

var role_miner = {
    run: function(creep){

        var structures = creep.room.find(FIND_MY_STRUCTURES);
        var i = 0;
        var sources = creep.room.find(FIND_SOURCES);
        var container = find_structures.containers_for_miner(creep);

        // if not in workplace, moveTo workplace
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
            creep.moveTo(sources[1]);
        }

        // if arrived workplace, let's mining
        else{
            source = Game.getObjectById('9fa9077331385d3');
            // console.log(source.energy);
            // console.log(creep.pos, container.pos);
            if(source.energy == 0){
                creep.say(source.ticksToRegeneration, true);
            }
            else{
                if(creep.pos == container){
                    creep.harvest(sources[1]);
                    creep.transfer(container, RESOURCE_ENERGY);
                    // creep.say('⛏', true);
                }
            }
        }
    }
};


module.exports = role_miner;