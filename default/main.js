var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');
var role_repairer = require('role.repairer');
var role_miner = require('role.miner');

module.exports.loop = function () {
    for(var room_name in Game.rooms);
    for(var name in Game.creeps){
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
            role_repairer.run(creep);
        }
        
        if(creep.memory.role == 'miner'){
            role_miner.run(creep);
        }
        
        // spawn creep
        if(Game.rooms[room_name].energyAvailable >= 400){
            // for(var room_name in Game.rooms){
            //     console.log(Game.rooms[room_name].energyAvailable);
            // }
            var role = 'harvester';
            
            var role_name = [
                    'harvester',
                    'upgrader',
                    'builder',
                    'repairer',
                    'miner'
                ]
                
            var role_type = [
                    'c_h_',
                    'c_u_',
                    'c_b_',
                    'c_r_',
                    'c_m_'
                ]
            
            var role_spec = [                
                    [WORK, WORK, CARRY, CARRY, MOVE], // harvester
                    [WORK, CARRY, CARRY, CARRY, MOVE], // upgrader
                    [WORK, WORK, CARRY, CARRY, MOVE], // builder
                    [WORK, CARRY, CARRY, MOVE, MOVE], // repairer
                    [WORK, WORK, WORK, CARRY, MOVE] // repairer
                ];
                
            var role_count_minimum = [
                    4,  // harvester
                    10, // upgrader
                    4,  // builder
                    3,  // repairer
                    5   // miner
                ]
        
            var get_role_count = [
                    _.filter(Game.creeps, (creep) => creep.memory.role == role_name[0]).length,
                    _.filter(Game.creeps, (creep) => creep.memory.role == role_name[1]).length,
                    _.filter(Game.creeps, (creep) => creep.memory.role == role_name[2]).length,
                    _.filter(Game.creeps, (creep) => creep.memory.role == role_name[3]).length,
                    _.filter(Game.creeps, (creep) => creep.memory.role == role_name[4]).length
                ]
            
            // check role count    
            for(var i = 0; i < 4; i++){
                console.log(get_role_count[i], role_count_minimum[i]);
            }
           
            // make creeps by role count
            if(get_role_count[0] < role_count_minimum[0]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[0], role_type[0] + Game.time, {memory: {role: role_name[0]}});
            }
            
            if(get_role_count[1] < role_count_minimum[1]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[1], role_type[1] + Game.time, {memory: {role: role_name[1]}});
            }
            
            if(get_role_count[2] < role_count_minimum[2]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[2], role_type[2] + Game.time, {memory: {role: role_name[2]}});
            }
            
            if(get_role_count[3] < role_count_minimum[3]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[3], role_type[3] + Game.time, {memory: {role: role_name[3]}});
            }
            
            if(get_role_count[4] < role_count_minimum[4]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[4], role_type[4] + Game.time, {memory: {role: role_name[4]}});
            }
            
            console.log(creep.memory.role);
        }
    }
}
