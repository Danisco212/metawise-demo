const { Notion } = require('@neurosity/notion');
require('dotenv').config();
const express = require('express');
const app = express();
//const socketio = require('socket.io');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
app.use(cors());
//const expressServer = app.listen(9000);




const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization', 'my-custom-header', 'access-control-allow-origin'],
    credentials: true
  }
});



server.listen(3001, () => {
  console.log('listening on *:3001');
});

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();

}); */

/* io.on('connections', (socket)=>{
  socket.emit('message', {data: 'welcome to server'});
  socket.on('message', (data)=>{
    console.log(data);
})
}) */

let brainwavesData = null;
let signalData = null;

const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

 const verifyEnvs = (email, password, deviceId) => {
  const invalidEnv = (env) => {
    return (env === "");
  }
  if (invalidEnv(email) || invalidEnv(password) || invalidEnv(deviceId)) {
      console.error("Please verify deviceId, email and password are in .env file, quitting...");
      process.exit(0);
  }
}
verifyEnvs(email, password, deviceId);
console.log(`${email} attempting to authenticate with ${deviceId}`);

const notion = new Notion({
  deviceId
});

const main = async () => {
  await notion.login({
    email,
    password
  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  });
  console.log("Logged in");

  notion.brainwaves("powerByBand").subscribe((brainwaves) => {
    
      console.log(brainwaves);
      brainwavesData = brainwaves;
    });

      notion.signalQuality().subscribe(signalQuality => {
        console.log(signalQuality);
        signalData = signalQuality;
      });
    

}

main(); 

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(function(){
    socket.emit('data', brainwavesData);
    
    socket.emit('signalData', signalData);
}, 2000);
 

  socket.on("send_message", (data) => {
   socket.emit('send_message', 'message');

  })
})