const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
//const jsonRoutes = require('./routes/jsonfile')
const Grid = require('gridfs-stream');


// get routes
const eegRoutes = require('./routes/eegdata.route');
const { application } = require('express');



// create the express application
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();

});
// the database URI TODO: move it to environment variables

const dbURI = process.env.MONGO_URI


// setup mongoose, connect to the mongodb
//let bucket;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((res) => { 
        console.log('Connected to db')
    
        app.listen(5676)
     })
    .catch((err) => { console.log('Error connecting to db', err)})

// setup middlewares
app.use(express.static('public'))
 app.use(
    bodyParser.json({
      limit: "500mb",
    })
  ); 
 

  const conn = mongoose.createConnection(dbURI, {useNewUrlParser: true, useUnifiedTopology:true});

let gfs;

conn.once('open', ()=> {
    
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

const port = 5676;

const storage = new GridFsStorage({
    url: dbURI,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo);

            });
        });
    }
})

const upload = multer({
    storage: storage,
  limits: { fileSize: '500mb' },
  dest: './upload'
})

//const upload = multer({ dest: './public/data/uploads/' })
app.post('/upload', upload.single('jsonfile'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file, req.body)
});

 

/* app.post('/upload', upload.single('jsonfile'), (req, res) => {
  
    res.json({file: req.file})
    console.log('Hello')
    console.log("uploaded file:", file);

    return res.send(file.id);
}) */
app.use(morgan('dev'))
app.use('/api/v1/', eegRoutes)
//app.use('/api/jasonfile/', jsonRoutes);
/*    app.get('/', function(req, res) {
      res.render('index')
    }); */
      //limits: {fileSize: 50000000}
    /*,
    fileFilter : function(req, file, cb) {
        checkFile
    } */
     //app.use(bodyParser.json());
       //const {file} = req;
    //const {id} = file;