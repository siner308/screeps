module.exports = {
    get_storages: function(creep){
        let storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: c => (c.structureType == STRUCTURE_STORAGE)
                && (c.store[RESOURCE_ENERGY] != 0)
        });
        return storage;
    }
};