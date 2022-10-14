const WebSocket = require('ws');
//import {WebSocketServer} from 'ws';
const express = require('express');
const app = express();
const path = require('path');
 //const wss = new WebSocket(`ws://127.0.0.1:6868`)
//const wss = new WebSocket('wss://localhost:6868');
const wss = new WebSocket('ws://localhost:8080');

//const wss = new WebSocket.Server({ port : 6868 });

wss.onmessage = (evt) => {
    console.log(evt)
}

/*wss.on('connection', function connection(ws){
    ws.on('message', function message(data){
        console.log(data);
    });
    
})*/




/*socket.send(JSON.stringify(subRequest))
        socket.on('message', (data)=>{
            try {
                 if(JSON.parse(data)['id']==SUB_REQUEST_ID){
                   // console.log('SUB REQUEST RESULT --------------------------------')
                    //console.log(data)
                    //console.log('\r\n')
                 }
            } catch (error) {}*/

//app.use('/', express.static(path.resolve(__dirname, '../client')))
//const server = app.listen(6868)

//const _server = require('http').createServer()

/*const wss = new WebSocket.Server({
   // port : 8080
   // port 9876
   //port : 6868
   //server: server
   server : server 
   /*,verifyClient: (info) =>{
    console.log(info)
    return true

   }

}) */
/*wss.on('connection', function(ws) {
    console.log(data)
    console.log(streams)
    // ws.on whenever theres a message
    ws.on('message', function (data){
        console.log(data)
    })
});

wss.on('connection', function(ws){
    ws.on('message', function(data) {
        wss.clients.forEach(function each(client){
            if (client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
})

/*server.on('upgrade', async function upgrade(request, socket, head){
    
    let args;

    try {
        args = await getDataAsync()

    }catch (e) {
        socket.destroy()
        return
    }

    wss.handleUpgrade(request, socket, head, function done(ws){
        wss.emit('connection', ws, request, ...args)
    })
})*/