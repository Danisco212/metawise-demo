const mongoose = require('mongoose')
const Schema = mongoose.Schema

const unclaimedSchema = new Schema({
    wallet_id: {
        type: String 
    },
    current_amount: {
        type: Number
    },
    lifetime_amount: {
        type: Number
    }
    
}, { timestamps: true })

const UnclaimedTokeks = mongoose.model('unclaimedtokens', unclaimedSchema);
module.exports = UnclaimedTokeks