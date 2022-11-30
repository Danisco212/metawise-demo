const express = require('express')
const { db } = require('../models/powerband')
const PowerbandData = require('../models/powerband')

//const fileupload = require('../middleware/file-upload')



const router = express.Router()

router.get('/eeg/view', async (req, res, next) => {
    return res.json({status: true, data: [1,2,3,4]})
})

router.post('/powerband/save', async (req, res, next) => {
    const {signalquality, raweeg, powerband} = req.body
    /*  await PowerbandData.create({
        signalquality: signalquality,
        raweeg: raweeg,
        powerband: powerband
    })  */

    //fileupload.single('jsonfiles'),


     PowerbandData.insertMany([{
        signalquality: signalquality,
        raweeg: raweeg,
        powerband: powerband
    }
       ]).then(function(){
        console.log('data inserted')
    }).catch(error => console.log(error)); 


    return res.json({status: true, message: "The powerband is saved"})
})

router.get('/powerband/view', async (req, res, next) => {
    let bands = await db.collection("powerbands").find().toArray()
    return res.json({status: true, data: bands})
})

module.exports = router