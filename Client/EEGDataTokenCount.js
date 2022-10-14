const WebSocket = require("ws");

// ws refers to one connection
// wss refers to the actual server

const wss = new WebSocket.Server({port: 8080});

function parseMessage(message){
    //const object = JSON.parse(message);

    if(!("event" in object)){

        throw new Error("Event property not provided");
    }

    if(!("payload" in object)){

        throw new Error("Payload property not provided");
    }
   
    return object;
}

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        console.log(message);
        let data;

        try {
            data = parseMessage(message);
        } catch (err){
            console.log(`INVALID MESSAGE: ${e.message}`);
            return;
        }
        console.log(data);

        switch (data.event){
            case "PLAYER_MOVEMENT":
                console.log("OK... recieved player movement");
                break;
        }
    });
});