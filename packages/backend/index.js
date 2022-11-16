const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// get routes
const eegRoutes = require('./routes/eegdata.route')

// create the express application
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();

});
// the database URI TODO: move it to environment variables
const dbURI = 'mongodb+srv://gustav:gustav123@metawisecluster.zgdr6qe.mongodb.net/eegdata?retryWrites=true&w=majority'

// setup mongoose, connect to the mongodb
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((res) => { 
        console.log('Connected to db')
        // port to listen for requests
        app.listen(5676)
     })
    .catch((err) => { console.log('Error connecting to db', err)})

// setup middlewares
app.use(express.static('public'))
app.use(
    bodyParser.json({
      limit: "10000kb",
    })
  );
app.use(morgan('dev'))
app.use('/api/v1/', eegRoutes)
