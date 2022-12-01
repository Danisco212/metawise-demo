import { Router } from 'express'
import SessionData from '../../models/alt/session.cjs'
import SessionPowerbandData from '../../models/alt/sessionPowerband.cjs'
const {db} = SessionData
import { ObjectId } from 'bson'
import SessionEEGs from '../../models/alt/sessionRawEEG.cjs'
import UnclaimedTokeks from '../../models/unclaimedtokens.cjs'

const router = Router()

router.get('/sessions/all', async (req, res, next) => {
    let sessions = await db.collection('sessions').find().toArray()
    return res.json({data: sessions, status: true})
})

router.post('/sessions/add', async (req, res, next) => {
    const {userId, recordDate} = req.body
    const session = await SessionData.create({
        userId,
        recordDate
    })
    return res.json({status: true, message: "The session is saved", data: session})
})

router.get("/session/get-bands", async (req, res, next) => {
    const {session_id} = req.query
    let session = await SessionData.findById(session_id)
    let aggregation = [
        {
            $match: {
                session_id: new ObjectId(session_id),
            },
        }
    ]
    let data = await SessionPowerbandData.aggregate(aggregation)
    if(session){
        return res.json({status: true, data: {session, bands: data}})
    } else {
        return res.json({status: false, error: "There is no session with that id"})
    }
})

router.post("/session/add-bands", async (req, res, next) =>{
    const {bands, session_id} = req.body
    await SessionPowerbandData.insertMany(bands.map(item => {
        let newData = {band: item, session_id: session_id}
        return newData
    }))
    return res.json({status: true, message: "The session band is saved"})
})

router.post("/session/add-eegs", async (req, res, next) =>{
    const {eegArray, session_id} = req.body
    await SessionEEGs.insertMany(eegArray.map(item => {
        let newData = {raw_eeg: item, session_id: session_id}
        return newData
    }))
    return res.json({status: true, message: "The session eeg is saved"})
})

router.post("/unclaimed-token/add", async (req, res, next) =>{
    const {walletId, amount} = req.body
    let unclaimed = await UnclaimedTokeks.find({wallet_id: walletId})
    if(unclaimed.length === 0){
        let savedData = await UnclaimedTokeks.create({
            wallet_id: walletId,
            current_amount: amount,
            lifetime_amount: amount,
        })
        return res.json({status: true, message: "Stored unclaimed tokens", data: savedData})
    } else {
        let initialUnclaimed = unclaimed[0].toObject()
        await UnclaimedTokeks.updateOne(
            { wallet_id: walletId },
            { 
                lifetime_amount: initialUnclaimed.lifetime_amount + amount,
                current_amount: initialUnclaimed.current_amount + amount,
            }
        )
        let savedData = await UnclaimedTokeks.find({wallet_id: walletId})
        return res.json({status: true, message: "Updated unclaimed tokens", data: savedData[0].toObject()})
    }
})

router.post("/unclaimed-token/claim", async (req, res, next) =>{
    const {walletId} = req.body
    let unclaimed = await UnclaimedTokeks.find({wallet_id: walletId})
    if(unclaimed.length > 0){
        await UnclaimedTokeks.updateOne(
            { wallet_id: walletId },
            {
                current_amount: 0,
            },
        )
        let savedData = await UnclaimedTokeks.find({wallet_id: walletId})
        return res.json({status: true, message: "Stored unclaimed tokens", data: savedData[0].toObject()})
    } else {
        return res.json({status: false, message: "You have no unclaimed tokens"})
    }
})

router.get("/unclaimed-token", async (req, res, next) =>{
    const {walletId} = req.query
    let unclaimed = await UnclaimedTokeks.find({wallet_id: walletId})
    if(unclaimed.length > 0){
        return res.json({status: true, message: "Your unclaimed tokens", data: unclaimed[0].toObject()})
    } else {
        return res.json({status: false, message: "You have no unclaimed tokens"})
    }
})

export default router