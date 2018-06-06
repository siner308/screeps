
module.exports = {
    get_role_name: function(){
        return [
            'harvester',
            'upgrader',
            'builder',
            'repairer',
            'miner1',
            'miner2',
            'cleaner'
            ]
    },
    
    get_role_type: function(){
        return [
            'c_h_',
            'c_u_',
            'c_b_',
            'c_r_',
            'c_m_',
            'c_m2_',
            'c_c_'
            ]
    },
    get_role_population_max: function(){
        return [
            2,  // harvester
            4, // upgrader
            2,  // builder
            2,  // repairer
            3,   // miner
            3,   // miner2
            2   // cleaner
            // 1   // cleaner2
          ]
    },
    
    get_body_spec: function(){
        return [
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0],
            [1,1,1,0,0,0,0,0]
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
        
        for (i = 0; i < 7; i++){
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
        console.log('role length : ' + this.get_role_name().length);
        for(i = 0; i < this.get_role_name().length; i++){
            role_count[i] = _.filter(Game.creeps, {memory: {role: this.get_role_name()[i]}}).length;   
        }
        
        return role_count;
    }
};