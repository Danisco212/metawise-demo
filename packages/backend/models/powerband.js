const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powerbandSchema = new Schema({
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
                }
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