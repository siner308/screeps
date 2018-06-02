var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');

module.exports.loop = function () {
    for(var room_name in Game.rooms);
    
    if(Game.rooms[room_name].energyAvailable >= 300){
        // for(var room_name in Game.rooms){
        //     console.log(Game.rooms[room_name].energyAvailable);
        // }
        var role = 'upgrader';
        
        var role_spec = [                
                [WORK, CARRY, MOVE, MOVE], // harvester
                [WORK, CARRY, MOVE, MOVE], // upgrader
                [WORK, CARRY, MOVE, MOVE]  // builder
            ];
    
        
        if(role == 'harvester'){
            Game.spawns['spawn_first'].spawnCreep(role_spec[0], 'c_h_' + Game.time, {memory: {role: 'harvester'}});
        }
        
        else if(role == 'upgrader'){
            Game.spawns['spawn_first'].spawnCreep(role_spec[1], 'c_u_' + Game.time, {memory: {role: 'upgrader'}});
        }
        
        else if(role == 'builder'){
            Game.spawns['spawn_first'].spawnCreep(role_spec[2], 'c_b_' + Game.time, {memory: {role: 'builder'}});
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester'){
            role_harvester.run(creep);
        }
        
        if(creep.memory.role == 'upgrader'){
            role_upgrader.run(creep);
        }
        
        if(creep.memory.role == 'builder'){
            role_builder.run(creep);
        }
    }
}
