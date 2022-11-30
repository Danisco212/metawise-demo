import express from 'express'
import PowerbandData from '../models/powerband.cjs'
const { db } = PowerbandData;
const eegRouter = express.Router()

eegRouter.get('/eeg/view', async (req, res, next) => {
    return res.json({status: true, data: [1,2,3,4]})
})

eegRouter.post('/powerband/save', async (req, res, next) => {
    const {powerband} = req.body
    await PowerbandData.create({
        powerband: powerband
    })
    return res.json({status: true, message: "The powerband is saved"})
})

eegRouter.get('/powerband/view', async (req, res, next) => {
    let bands = await db.collection("powerbands").find().toArray()
    return res.json({status: true, data: bands})
})

export default eegRouter