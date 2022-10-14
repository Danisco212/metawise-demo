const mongoose = require('moongoose')
const Schema = mongoose.Schema;

// Can pass in arrays in schema
/* EEGData.push({
    time: time,
    eqData: eqData.current,
    powData: powData.current
}) */

const EEGDataBase = new Schema({ 
        EEGData: {}
    })

const Database = new Schema({
    overallEEGQuality: Number,
            EEGPowData: Number,
            theta_af3: Number,
            alpha_af3: Number,
            lowBeta_af3: Number,
            highBeta_af3: Number,
            gamma_af3: Number,
            theta_t7: Number,
            alpha_t7: Number,
            lowBeta_t7: Number,
            highBeta_t7: Number,
            gamma_t7: Number,
            theta_pz: Number,
            alpha_pz: Number,            
            lowBeta_pz: Number,
            highBeta_pz: Number,
            gamma_pz: Number,
            theta_t8: Number, 
            alpha_t8: Number,
            lowBeta_t8: Number,           
            highBeta_t8: Number,
            gamma_t8: Number,
            theta_af4: Number,
            alpha_af4: Number,
            lowBeta_af4: Number, 
            highBeta_af4: Number,
            gamma_af4: Number,
            theta_af: Number,
            alpha_af3: Number,
            lowBeta_af3: Number,
            highBeta_af3: Number,
            gamma_af3: Number,
            theta_t7: Number,
            alpha_t7: Number,
            lowBeta_t7: Number,
            highBeta_t: Number,
            gamma_t7: Number,
            theta_pz: Number,
            alpha_pz: Number,
            lowBeta_pz: Number,
            highBeta_pz: Number,
            gamma_pz: Number,
            theta_t8: Number,
           alpha_t8: Number,
           lowBeta_t8: Number,
           highBeta_t8: Number,
           gamma_t8: Number,
           theta_af4: Number,
           alpha_af4: Number,
           lowBeta_af4: Number,
           highBeta_af4: Number,
           gamma_af4: Number
})

// module.exports = mongoose.model('Database', Database);

module.exports = mongoose.model('EEGDataBase', EEGDataBase);

