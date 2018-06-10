var find_structures = {
    containers: function(creep){
        var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_CONTAINER)
                && (_.sum(c.store) != 0)
        });
        
        // var retVal = containers[0];
        
        // for(var container in containers){
        //     if(_.sum(container.store) > _.sum(retVal.store)){
        //         retVal = container;
        //     }
        // }
        // console.log(retVal);
        return containers;
    },    
    
    containers_full: function(creep){
        var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_CONTAINER)
                && (_.sum(c.store) == c.storeCapacity)

        });
        return containers;
    },
    
    containers_for_miner: function(creep){
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_CONTAINER)
                && (_.sum(c.store) != c.storeCapacity)

        });
        return container;
    },
    
    extensions: function(creep){
        var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_EXTENSION)
                && (c.energy != c.energyCapacity)

        });
        return extension;
    },
    
    towers: function(creep){
        var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_TOWER)
                && (c.energy != c.energyCapacity)

        });
        return tower;
    }
    
    
    
    // storages: function(creep){
    //     var mystorage = creep.room.storage;
    //     return mystorage;
    // }

    // spawns: function(creep){
    //     var spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //         filter: s => (s.structureType == STRUCTURE_SPAWN)
    //         && (s.store[RESOURCE_ENERGY] != 0)
    //     });
    //     return spawn;
    // }

    // extensions: function(creep){
    //     var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //         filter: e => (e.structureType == STRUCTURE_EXTENSION)
    //         && (e.store[RESOURCE_ENERGY] != 0)
    //     });
    //     return extension;
    // }

    // find_structures: function(creep){
    //     // console.log('123123123');
    //     var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //         filter: s => (s.structureType == STRUCTURE_CONTAINER)
    //         && (s.store[RESOURCE_ENERGY] != 0)
    //     });
    //     // console.log('321321321');
    //     return structure;
    // }
};

module.exports = find_structures;