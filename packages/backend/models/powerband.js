const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powerbandSchema = new Schema({

    signalquality: { type: [[{}]], required: true },

    raweeg: {
        type: [{
            data: [
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
                {
                    type: [Number],
                    required: true
 
                },
            ],
            info: {
                channelNames: {
                    type: [String],
                    required: true
 

                },
                notchFrequency: {type: String},
                samplingRate: {type: Number, required: true},
                startTime: {type: Number, required: true}
            },
            label: {
                type: String
            },

        }]

    },
    powerband: {
        type: [{
            data: {
                delta: {
                    type: [Number],
                    required: true,
                },
                alpha: {
                    type: [Number],
                    required: true,
                },
                beta: {
                    type: [Number],
                    required: true,
                },
                gamma: {
                    type: [Number],
                    required: true,
                },
                theta: {
                    type: [Number],
                },


            },
            label: {
                type: String
            },
            timestamp: {
                type: Number,
            },
        }]
    }
    
}, { timestamps: true })

var PowerbandData = mongoose.model('powerbands', powerbandSchema);
module.exports = PowerbandData ;