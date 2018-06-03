var find_structures = {
    containers: function(creep){
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER) 
            && (s.store[RESOURCE_ENERGY] != 0)});
        return container;
    }
};

module.exports = find_structures;