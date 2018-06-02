var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');
var role_repairer = require('role.repairer');

module.exports.loop = function () {
    for(var room_name in Game.rooms);
    
    if(Game.rooms[room_name].energyAvailable >= 300){
        // for(var room_name in Game.rooms){
        //     console.log(Game.rooms[room_name].energyAvailable);
        // }
        var role = 'harvester';
        
        var role_name = [
                'harvester',
                'upgrader',
                'builder',
                'repairer'
            ]
        
        var role_spec = [                
                [WORK, WORK, CARRY, MOVE], // harvester
                [WORK, WORK, CARRY, MOVE], // upgrader
                [WORK, WORK, CARRY, MOVE], // builder
                [WORK, CARRY, CARRY, MOVE] // repairer
            ];
            
        var role_count_minimum = [
                4, // harvester
                2, // upgrader
                2, // builder
                2  // repairer
            ]
    
        var get_role_count = [
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[0]),
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[1]),
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[2]),
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[3])
            ]
            
        if(get_role_count[0] < role_count_minimum[0]){
            Game.spawns['spawn_first'].spawnCreep(role_spec[0], 'c_h_' + Game.time, {memory: {role: 'harvester'}});
        }
        
        else if(get_role_count[1] < role_count_minimum[1]){
            Game.spawns['spawn_first'].spawnCreep(role_spec[1], 'c_u_' + Game.time, {memory: {role: 'upgrader'}});
        }
        
        else if(get_role_count[2] < role_count_minimum[2]){
            Game.spawns['spawn_first'].spawnCreep(role_spec[2], 'c_b_' + Game.time, {memory: {role: 'builder'}});
        }
        
        else if(get_role_count[3] < role_count_minimum[3]){
            Game.spawns['spawn_first'].spawnCreep(role_spec[3], 'c_r_' + Game.time, {memory: {role: 'repairer'}});
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
        
        if(creep.memory.role == 'repairer'){
            role_builder.run(creep);
        }
    }
}
