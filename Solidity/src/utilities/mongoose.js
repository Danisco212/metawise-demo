const mongoose = require('mongoose');

const EEGData = require('./Mongodb');

mongoose.connect('mongodb+srv://MetawiseDB:MetawiseDB@metawisecluster.zgdr6qe.mongodb.net/MetawiseTest?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to Database')
}).catch(() => {
    console.log('Failed to connect to Database')
});



const createEEGData = async (req, res, next) => {
    const createEEGData = new EEGData({
        EEGData: req.body.EEGData
    });
    const result = await createdEEGData.save();
    //console.log(typeof createEEGData.id);

    res.json(result);
};

const getEEGData = async (req, res, next) => {
   const eegdata = await EEGDatabase.find().exec();
   res.json(eegdata);
}

exports.createEEGData = createEEGData; 
exports.getEEGData = getEEGData;