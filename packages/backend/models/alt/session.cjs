const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    recordDate: {
        type: Date
    }
}, { timestamps: true })

const SessionData = mongoose.model('sessions', sessionSchema)
module.exports = SessionData