var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');
var role_repairer = require('role.repairer');
var role_miner = require('role.miner');
var role_miner2 = require('role.miner2');

module.exports.loop = function () {
    
    // temporary tower code
    var tower = Game.getObjectById('dffac25fcf957005e55d5cd2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    // end of tower code
    
    for(var room_name in Game.rooms);
    
    // clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    
    // let work to creeps
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
        
        if(creep.memory.role == 'miner1'){
            role_miner.run(creep);
        }
        
        if(creep.memory.role == 'miner2'){
            role_miner2.run(creep);
        }
    }
    
    // spawn creep
    // if(Game.rooms[room_name].energyAvailable >= 400){
    //     for(var room_name in Game.rooms){
    //         console.log(Game.rooms[room_name].energyAvailable);
    //     }
        var role = 'harvester';
        
        var role_name = [
                'harvester',
                'upgrader',
                'builder',
                'repairer',
                'miner1',
                'miner2'
            ]
            
        var role_type = [
                'c_h_',
                'c_u_',
                'c_b_',
                'c_r_',
                'c_m_',
                'c_m2_'
            ]
        
        var role_spec = [                
                [WORK, WORK, CARRY, CARRY, MOVE], // harvester
                [WORK, CARRY, CARRY, CARRY, MOVE], // upgrader
                [WORK, WORK, CARRY, CARRY, MOVE], // builder
                [WORK, CARRY, CARRY, MOVE, MOVE], // repairer
                [WORK, WORK, WORK, WORK, MOVE], // miner
                [WORK, WORK, WORK, WORK, MOVE] // miner2
            ];
            
        var role_count_minimum = [
                2,  // harvester
                10, // upgrader
                3,  // builder
                3,  // repairer
                3,   // miner
                2   // miner2
            ]
    
        var get_role_count = [
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[0]).length,
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[1]).length,
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[2]).length,
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[3]).length,
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[4]).length,
                _.filter(Game.creeps, (creep) => creep.memory.role == role_name[5]).length
            ]
        
        // check role count    
        for(var i = 0; i < 6; i++){
            console.log(role_name[i], get_role_count[i], role_count_minimum[i]);
        }
       
        // make creeps by role count

        // miner1
        if(get_role_count[4] < role_count_minimum[4]){
            Game.spawns['spawn_first'].spawnCreep(role_spec[4], role_type[4] + Game.time, {memory: {role: role_name[4]}});
        }
        
        // miner2
        else{
            if(get_role_count[5] < role_count_minimum[5]){
                Game.spawns['spawn_first'].spawnCreep(role_spec[5], role_type[5] + Game.time, {memory: {role: role_name[5]}});
            }
            
            // harvester
            else{  
                if(get_role_count[0] < role_count_minimum[0]){
                    Game.spawns['spawn_first'].spawnCreep(role_spec[0], role_type[0] + Game.time, {memory: {role: role_name[0]}});
                }
                
                else{
                    if(get_role_count[1] < role_count_minimum[1]){
                        Game.spawns['spawn_first'].spawnCreep(role_spec[1], role_type[1] + Game.time, {memory: {role: role_name[1]}});
                    }
                    
                    if(get_role_count[2] < role_count_minimum[2]){
                        Game.spawns['spawn_first'].spawnCreep(role_spec[2], role_type[2] + Game.time, {memory: {role: role_name[2]}});
                    }
                    
                    if(get_role_count[3] < role_count_minimum[3]){
                        Game.spawns['spawn_first'].spawnCreep(role_spec[3], role_type[3] + Game.time, {memory: {role: role_name[3]}});
                    }
                }  
            }
            
        }
        
        
        
        console.log(creep.memory.role);
    // }
}
