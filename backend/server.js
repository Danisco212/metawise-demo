const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const mongoose = require('mongoose');

const EEGDataRoutes = require('./routes/EEGData-routes');
const HttpError = require('./models/http-error');

const app = express();

const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();

});

app.use('/api/eegdata' , EEGDataRoutes);

app.use((req, res, next) => {
const error = new HttpError('Could not find this route.', 404);
throw error;

});


app.use((error, req, res, next) => {
  if (res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred'
  });
});

mongoose
.connect('mongodb+srv://gustav:gustav123@metawisecluster.zgdr6qe.mongodb.net/eegdata?retryWrites=true&w=majority', {useNewUrlParser: true}) //, {useNewUrlParser: true, useUnifiedTopology: true}
.then(() => {
  app.listen(5000);
  console.log('DB Connected')
})
.catch(err => {
  console.log(err);
});


 // start Node + Express server on port 5000
