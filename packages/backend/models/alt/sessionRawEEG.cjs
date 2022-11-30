const mongoose = require('mongoose')

const sessionEEGSchema = new mongoose.Schema({
    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sessions',
    },
    raw_eeg: {
        data: [[Number]],
        label: {
            type: String
        },
        info: {
            type: {
                channelNames: {
                    type: [String],
                },
                notchFrequency: {
                    type: String,
                },
                samplingRate: {
                    type: Number,
                },
                startTime: {
                    type: Number,
                }
            }
        }
    }
    
}, {timestamps: true})

const SessionEEGs = mongoose.model('sessioneegs', sessionEEGSchema)

module.exports = SessionEEGs