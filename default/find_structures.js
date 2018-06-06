var find_structures = {
    containers: function(creep){
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_CONTAINER)
                && (c.store[RESOURCE_ENERGY] != 0)

        });
        return container;
    },
    storages: function(creep){
        var mystorage = creep.room.storage;
        return mystorage;
    }

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