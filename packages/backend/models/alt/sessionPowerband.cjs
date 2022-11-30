const mongoose = require('mongoose')

const sessionPowerBandSchema = new mongoose.Schema({
    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sessions',
    },
    band: {
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
    }
    
}, {timestamps: true})

const SessionPowerbandData = mongoose.model('sessionPowerbands', sessionPowerBandSchema)

module.exports = SessionPowerbandData