var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');
var role_repairer = require('role.repairer');
var role_miner = require('role.miner');
var role_miner2 = require('role.miner2');
var role_cleaner = require('role.cleaner');
var role_cleaner2 = require('role.cleaner2');
// var role_name = require('define.role');
// var role_spec = require('define.role');
// var role_type = require('define.role');
// var role_population_max = require('define.role');
// var define_role = require('define.role');

module.exports.loop = function () {
    for (var r in Game.rooms);
        // console.log(r.controller.progress);
    // mycontroller = Game.rooms.find(STRUCTURE_CONTROLLER);
    // console.log(mycontroller.progress);
    // temporary tower code
    var tower = Game.getObjectById('5b14744c931ce5002cd5e775');
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
    // end of tower code

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
        
        if(creep.memory.role == 'cleaner'){
            role_cleaner.run(creep);
        }        
        
        // if(creep.memory.role == 'cleaner2'){
        //     // role_cleaner2.run(creep);
        // }
    }
    
    // spawn creep
    // if(Game.rooms[room_name].energyAvailable >= 400){
    //     for(var room_name in Game.rooms){
    //         console.log(Game.rooms[room_name].energyAvailable);
    //     }
    var role_name = [
            'harvester',
            'upgrader',
            'builder',
            'repairer',
            'miner1',
            'miner2',
            'cleaner',
            // 'cleaner2'
        ]
        
    var role_type = [
            'c_h_',
            'c_u_',
            'c_b_',
            'c_r_',
            'c_m_',
            'c_m2_',
            'c_c_',
            // 'c_c2_'
        ]
    
    var role_spec = [                
            [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // harvester
            [WORK, WORK, WORK, CARRY, MOVE, CARRY, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, MOVE, WORK, CARRY], // upgrader
            [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], // builder
            [WORK, WORK, CARRY, MOVE, CARRY, WORK, MOVE, MOVE], // repairer
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], // miner
            [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], // miner2
            [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // cleaner
            // [CARRY, MOVE] // cleaner2
        ];
        
    var role_population_max = [
            2,  // harvester
            4, // upgrader
            2,  // builder
            2,  // repairer
            1,   // miner
            2,   // miner2
            2,   // cleaner
            // 1   // cleaner2
        ]

    var get_role_count = [
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[0]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[1]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[2]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[3]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[4]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[5]).length,
            _.filter(Game.creeps, (creep) => creep.memory.role == role_name[6]).length
            // _.filter(Game.creeps, (creep) => creep.memory.role == role_name[7]).length
        ]
    
    // check role count    
    for(var i = 0; i < role_name.length; i++){
        // console.log(role_name[i], get_role_count[i], role_population_max[i]);
    }
   
    for(var i = 0; i < role_name.length; i++){
        if(get_role_count[i] < role_population_max[i])
        Game.spawns['spawn_first'].spawnCreep(role_spec[i], role_type[i] + Game.time, {memory: {role: role_name[i]}});
    }
}