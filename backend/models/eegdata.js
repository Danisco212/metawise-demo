const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let eegDataSchema = new Schema({

  neurocitydelta: { type: [[Number]], required: true },
  neurocitytheta: { type: [[Number]], required: true },
  neurocityalpha: { type: [[Number]], required: true },
  neurocitybeta: { type: [[Number]], required: true },
  neurocitygamma: { type: [[Number]], required: true },
  signalquality: { type: [[{}]], required: true },
  time: { type: [Date], required: true }
   
});

/* {
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
  } */

  module.exports = mongoose.model('Eegdata', eegDataSchema);