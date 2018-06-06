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