const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const Eegdata = require('../models/eegdata.js');

/* const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let eegDataSchema = new Schema({
    pow: { type: Number},
    sid: { type: String},
    time: { type: Number}
});

var User = mongoose.model('User', eegDataSchema); */

 let eegdata2 = [
    {
        id: "1",
        pow: [
          1.246,0.706,0.566,1.065,0.602,
          10.293,4.374,11.638,351.767,40.273,
          50.159,4.585,0.467,1.481,3.764,
          9.861,3.139,2.094,3.342,4.452,
          75.652,1.972,2.932,2.555,7.005
        ],
        sid: "ff0245d1-9531-424c-9f6d-9f736f465516",
        time: 1590403491.0307
      }
]; 

// Can Add Creator Id

const getEEGDataById = async (req, res, next) =>  {

    const eegDataId = req.params.eid;

    let eeg;

    try {
     eeg = await Eegdata.findById(eegDataId);
    } catch (err) {
      const error = new HttpError('Could not find eeg data', 500);
      return next(error);
    }
     
    if (!eeg) {
      const error = new HttpError('Could not find eeg data for the provided id', 404);
      return next(error);
    }

    res.json({eeg : eeg.toObject( {getters: true} )});
    //console.log('GET Request in EEGData');
    
};

const createEEGData = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    
     throw new HttpError('Invalid inputs passed, please check your data.', 422);

  }
  const { neurocitydelta, neurocitytheta,  neurocityalpha, neurocitybeta, neurocitygamma, signalquality, time } = req.body;
/*   neurocitydelta: { type: [[Number]], required: true },
  neurocitytheta: { type: [[Number]], required: true },
  neurocityalpha: { type: [[Number]], required: true },
  neurocitybeta: { type: [[Number]], required: true },
  neurocitygamma: { type: [[Number]], required: true },
  signalquality: { type: [[Number]], required: true },
  time: { type: [Number], required: true } */


  const createdEEGData = new Eegdata({
    neurocitydelta, 
    neurocitytheta,  
    neurocityalpha, 
    neurocitybeta, 
    neurocitygamma, 
    signalquality, 
    time
   });

   //console.log(req.body.Eegdata);

   console.log(req.body.neurocitydelta);
   console.log(req.body.neurocitytheta);
   console.log(req.body.neurocityalpha);
   console.log(req.body.neurocitybeta);
   console.log(req.body.neurocitygamma);
   console.log(req.body.signalquality);
   console.log(req.body.time);
   console.log(createdEEGData)



try {
  await createdEEGData.save();
 

} catch (err){
    const error = new HttpError(
      'Creating Eegdata failed, please try again.', 500 
    );
    return next(error);
}


 return res.status(201).json({eegdatamessage: createdEEGData});

};

const updateEEGData = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    
     throw new HttpError('Invalid inputs passed, please check your data.', 422);

  }

  const {neurocitygamma, time} = req.body;
  const eegId = req.params.eid;

  let eeg;

  try{

   eeg = await Eegdata.findById(eegId);    

  } catch (err) {

    const error = new HttpError(
      ' Could not update eeg data', 500
    );
    return next();

  }

 /*  const updateEEGData = { ...eegdata2.find(e => e.id === eegId)};

  const eggIndex = eegdata2.findIndex(e => e.id === eegId); */

  eeg.neurocitygamma = neurocitygamma; 
  eeg.time = time;

  try {
    await eeg.save();
  } catch (err) {
    const error = new HttpError(
      'Could not update egg data for the provided id', 500
    );
    return next(error);
  }

  // eegdata2[eggIndex] = updatedEEGData;

  res.status(200).json({eeg: eeg.toObject({ getters: true})});



};

const deleteEEGData = async (req, res, next) => {

    const eegId = req.params.eId;
   
    let eeg;
    try {
      eeg = await Eegdata.findById(eegId);
    } catch (err) {
      const error = new HttpError(
       'Could not delete eeg data', 500
      );
      return next(error);
    }

     try { //remove()
      await Eegdata.deleteOne();
    } catch (err) {
      const error = new HttpError(
       'Could not delete eeg data for provided id', 500
      );
      return next(error);
    } 

    res.status(200).json({message: 'Deleted eegData.'});


};

exports.getEEGDataById = getEEGDataById;
exports.createEEGData = createEEGData;

exports.updateEEGData = updateEEGData;
exports.deleteEEGData = deleteEEGData;
