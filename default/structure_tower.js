/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('structure.tower');
 * mod.thing == 'a thing'; // true
 */

var structure_tower = {
    run: function(tower_id){
        var tower = Game.getObjectById(tower_id);
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            // if(closestDamagedStructure) {
            //     tower.repair(closestDamagedStructure);
            // }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};

module.exports = structure_tower;