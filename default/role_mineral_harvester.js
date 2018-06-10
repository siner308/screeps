var role_harvester = require('role_harvester')

var role_mineral_harvester = {
    run: function(creep){
        var mystorage = creep.room.storage;
        var minerals = creep.room.find(FIND_MINERALS);
        if(minerals[0]){
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
        else{
            creep.say('!mineral', true);
            role_harvester.run(creep);
        }
    }

}
module.exports = role_mineral_harvester;