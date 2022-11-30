import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// get routes
import eegRouter from './routes/eegdata.js'
import oauthRouter from './routes/neurosityAuth.js'
import sessionRouter from './routes/alt/session.js'

// create the express application
const app = express()

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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});
app.use(express.static('public'))
app.use(
    bodyParser.json({
      limit: "10000kb",
    })
  );
app.use(morgan('dev'))
app.use('/api/v1/', eegRouter)
app.use('/api/v1/', oauthRouter)
app.use("/api/v1/", sessionRouter)