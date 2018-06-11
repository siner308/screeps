
module.exports = {
    get_role_name: function(){
        return [
            'harvester',
            'upgrader',
            'builder',
            'repairer',
            'miner1',
            'miner2',
            'cleaner',
            'storager',
            'pioneer',
            'mineral_harvester'
            ]
    },
    
    get_role_type: function(){
        // var dict = {
        //     harvester: "c_h_",
        //     upgrader : "c_u_",
        //     builder  : "c_b_",
        //     repairer : "c_r_",
        //     miner    : "c_m_",
        //     miner2   : "c_m2_",
        //     cleaner  : "c_c_",
        //     storager : "c_s_"
        // }
        // console.log(dict.harvester);
        return [
            "c_h_",
            "c_u_",
            "c_b_",
            "c_r_",
            "c_m_",
            "c_m2_",
            "c_c_",
            "c_s_",
            "c_p_",
            "c_m_h_"
            ]
    },
    get_role_population_max: function(){
        return [
            3,  // harvester
            2, // upgrader
            1,  // builder
            1,  // repairer
            1,   // miner
            1,   // miner2
            1,   // cleaner
            1,   // storager
            2,    // pioneer
            1   // mineral harvester
          ]
    },
    
    get_body_spec: function(){
        // MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, CLAIM, TOUGH
        return [
            [5,5,7,0,0,0,0,0], // harvester
            [5,6,3,0,0,0,0,0], // upgrader
            [5,5,3,0,0,0,0,0], // builder
            [5,5,3,0,0,0,0,0], // repairer
            [1,5,0,0,0,0,0,0], // miner
            [1,5,0,0,0,0,0,0], // miner2
            [5,5,5,0,0,0,0,0],  // cleaner
            [5,0,3,0,0,0,0,0],   // storager
            [6,3,3,0,0,0,0,0],   // pioneer
            [5,5,3,0,0,0,0,0]   // mineral_harvester
            ]
    },
    
    get_body_type: function(){
        return BODYPARTS_ALL;
    },
    
    get_role_spec: function(num_body){
        // MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, CLAIM, TOUGH
        var i = 0, j = 0, cnt = 0;
        var total_body = 0;
        
        for(i = 0; i < 8; i++){
            total_body += num_body[i];
        }
        var retList = [total_body];
        
        for (i = 0; i < this.get_role_name().length; i++){
            for(j = 0; j < num_body[i]; j++){
                retList[cnt] = BODYPARTS_ALL[i];
                cnt++;
            }
        }
        
        return retList;
    },
    
    get_role_count:function(){    
        var i = 0;
        var role_count = [];
        // console.log('role length : ' + this.get_role_name().length);
        for(i = 0; i < this.get_role_name().length; i++){
            role_count[i] = _.filter(Game.creeps, {memory: {role: this.get_role_name()[i]}}).length;   
        }
        
        return role_count;
    }
};