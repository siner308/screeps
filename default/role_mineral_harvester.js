var role_harvester = require('role_harvester')

var role_mineral_harvester = {
    run: function(creep){
        var mystorage = creep.room.storage;
        var minerals = creep.room.find(FIND_MINERALS);
        // console.log(JSON.stringify(minerals, null, 2));
        console.log(minerals[0].mineralAmount);
        if(minerals[0].mineralAmount){
            if(creep.carry.energy){
                if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mystorage);
                }
            }
            else{
                if(_.sum(creep.carry) < creep.carryCapacity){
                    if(creep.harvest(minerals[0], RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
                        creep.moveTo(minerals[0]);
                        creep.say('💎', true);
                    }
                    else{
                        creep.harvest(minerals[0], RESOURCE_KEANIUM);
                        creep.say('💎', true);
                    }
                }
                else{
                    if(creep.transfer(mystorage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
                        creep.moveTo(mystorage);
                    }
                    else{
                        creep.transfer(mystorage, RESOURCE_KEANIUM);
                    }
                }
            }
        }
        else{
            role_harvester.run(creep);
            creep.say('!mineral', true);
        }
    }

}
module.exports = role_mineral_harvester;