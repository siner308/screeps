var role_harvester = require('role_harvester');
var role_upgrader = require('role_upgrader');
var role_builder = require('role_builder');
var role_repairer = require('role_repairer');
var role_miner = require('role_miner');
var role_miner2 = require('role_miner2');
var role_cleaner = require('role_cleaner');
var role_cleaner2 = require('role_cleaner2');
var structure_tower = require('structure_tower');
var define_role = require('define_role');

module.exports.loop = function () {
    // work tower
    structure_tower.run('5b14744c931ce5002cd5e775');

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
    }

    // spawn creeps
    for(var i = 0; i < define_role.get_role_name().length; i++){
        if(define_role.get_role_count()[i] < define_role.get_role_population_max()[i]){
            console.log(define_role.get_role_count()[i], ' ', define_role.get_role_population_max()[i]);
            // console.log(define_role.get_role_name()[i]);
            var type_body = define_role.get_role_spec(define_role.get_body_spec()[i]);            
            // console.log(define_role.get_body_spec()[i]);
            // console.log(type_body);
            // console.log(define_role.get_role_type()[i]);
            // console.log(define_role.get_role_name()[i]);
            Game.spawns['spawn_first'].spawnCreep(type_body, define_role.get_role_type()[i] + Game.time, {memory: {role: define_role.get_role_name()[i]}});

        }
    }
}

//  Game.spawns['spawn_first'].spawnCreep([WORK, CARRY, MOVE], 'c_h_' + Game.time, {memory: {role: 'harvester'}});