const WebSocket = require("ws");
//import WebSocket from "ws";

const socketUrl = "wss://localhost:6868";
const ws = new WebSocket(socketUrl);

// ws refers to one connection
// wss refers to the actual server

//const wss = new WebSocket.Server({port: 6868});

//subscribe to recieve response

//AF3, AF4, T7, T8, Pz

//<stream> contains array with data
//sid is a string with session id
// time is a number with timestamp of this sample. It is the number of seconds that has elapsed since 00:00:00 Thursday, 1 January 1970 UTC

//window.onload

// (DataSampleObject) stream : {"eeg": ["COUNTER","INTERPOLATED", "AF3", "T7", "Pz", "T8", "AF4", "RAW_CQ", "MARKER_HARDWARE", ["MARKERS"]], "sid": "", "time": number }
// {dev: ["Battery", "Signal", ['AF3', 'T7', 'Pz', 'T8', 'AF4', 'OVERALL'], "BatteryPercent"], "sid": "", "time": number }
// stream : {"eq": ["batteryPercent", "overall", "sampleRateQuality", "AF3", "T7", "Pz", "T8", "AF4"], "sid": "", "time": number }
// stream : { "pow": ['AF3/theta', 'AF3/alpha', 'AF3/betaL', 'AF3/betaH', 'AF3/gamma', 'T7/theta', 'T7/alpha', 'T7/betaL', 'T7/betaH', 'T7/gamma', 'Pz/theta', 'Pz/alpha', 'Pz/betaL', 'Pz/betaH', 'Pz/gamma', 'T8/theta', 'T8/alpha', 'T8/betaL', 'T8/betaH', 'T8/gamma', 'AF4/theta', 'AF4/alpha', 'AF4/betaL', 'AF4/betaH', 'AF4/gamma'], "sid": "", "time": number }


    let theta_af3 = [];
    let alpha_af3 = [];
    let lowBeta_af3 = [];
    let highBeta_af3 = [];
    let gamma_af3 = [];

    let theta_t7 = [];
    let alpha_t7 = [];
    let lowBeta_t7 = [];
    let highBeta_t7 = [];
    let gamma_t7 = [];

    let theta_pz = [];
    let alpha_pz = [];
    let lowBeta_pz = [];
    let highBeta_pz = [];
    let gamma_pz = [];

    let theta_t8 = [];
    let alpha_t8 = [];
    let lowBeta_t8 = [];
    let highBeta_t8 = [];
    let gamma_t8 = [];

    let theta_af4 = [];
    let alpha_af4 = [];
    let lowBeta_af4 = [];
    let highBeta_af4 = [];
    let gamma_af4 = [];

    let batteryPercent = [];
    let overallEEGQuality = [];
    let sampleRateQuality = [];
    let EEGQuality_AF3 = [];
    let EEGQuality_T7 = [];
    let EEGQuality_PZ = [];
    let EEGQuality_T8 = [];
    let EEGQuality_AF4 = [];


   

    //Initial time values.

    // -10.0
    let time = 0.0;

    let updateInterval = 100;
    let timewindow = 100;
    let data = JSON;

    // Fill the data point arrays with initial values (just zeroes).
    // let theta_t7 = []; let alpha_t7 = [] let lowBeta_t7 = [] let highBeta_t7 = [];t gamma_t7 = [];
    // let theta_pz = []; let alpha_pz = []; let lowBeta_pz = []; let highBeta_pz = []; let gamma_pz = [];
    // let theta_t8 = []; let alpha_t8 = []; let lowBeta_t8 = []; let highBeta_t8 = []; let gamma_t8 = [];
    // let batteryPercent = []; let overallEEGQuality = []; let sampleRateQuality = []; let EEGQuality_AF3 = []; let EEGQuality_T7 = []; let EEGQuality_PZ = []; let EEGQuality_T8 = []; let EEGQuality_AF4 = [];

    /*while (time < 0) {
        theta_af3.push({
            x: time,
            y: 0
        });

        alpha_af3.push({
            x: time,
            y: 0
        });

        lowBeta_af3.push({
            x: time,
            y: 0
        });

        highBeta_af3.push({
            x: time,
            y: 0
        });
        gamma_af3.push({
            x: time,
            y: 0
        });


        theta_t7.push({
            x: time,
            y: 0
        });

        alpha_t7.push({
            x: time,
            y: 0
        });

        lowBeta_t7.push({
            x: time,
            y: 0
        });

        highBeta_t7.push({
            x: time,
            y: 0
        });
        gamma_t7.push({
            x: time,
            y: 0
        });

       
        theta_pz.push({
            x: time,
            y: 0
        });

        alpha_pz.push({
            x: time,
            y: 0
        });

        lowBeta_pz.push({
            x: time,
            y: 0
        });

        highBeta_pz.push({
            x: time,
            y: 0
        });
        gamma_pz.push({
            x: time,
            y: 0
        });


        theta_t8.push({
            x: time,
            y: 0
        });

        alpha_t8.push({
            x: time,
            y: 0
        });

        lowBeta_t8.push({
            x: time,
            y: 0
        });

        highBeta_t8.push({
            x: time,
            y: 0
        });
        gamma_t8.push({
            x: time,
            y: 0
        });


        theta_af4.push({
            x: time,
            y: 0
        });

        alpha_af4.push({
            x: time,
            y: 0
        });

        lowBeta_af4.push({
            x: time,
            y: 0
        });

        highBeta_af4.push({
            x: time,
            y: 0
        });
        gamma_af4.push({
            x: time,
            y: 0
        });


        time += 0.1;
    }*/


/*performanceData().then((allPerformanceData) => {
    console.log(allPerformanceData)
   // socket.emit('perfData', allPerformanceData);
})*/

    // Communicate to the server when the web page is opened.
   /* socket.addEventListener('open', (event) => {
        socket.send('Hello Server!');
      });*/
    /*{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "authorize",
    "params": {
        "clientId": "xxx",
        "clientSecret": "xxx"
    }
}  
    / ws.send(JSON.stringify({
        event: "PlAYER_MOVEMENT",
        payload: {
            x: 250,
            y: 160
        }
    // }));*/
    
      ws.on('open', function open() {
        ws.send(JSON.stringify({
            
        }));
      });

    ws.onopen = (evt) => {
        ws.send("Web application connected ... " + Date.now());
        //console.log(evt)
        data = JSON.parse(evt.data);
        //console.log(evt.streams.data['pow'])
        //console.log(evt.data['pow'])
        console.log(evt)
        //console.log(streams)
       // console.log('data.pow: ', data.pow);
        //console.log(EEGQuality_AF3)


    };

    // Every time the server responds to brain data requests,
    // Update the datapoints with the most recent data.
    ws.onmessage = (evt) => {
        data = JSON.parse(evt);

        console.log(evt.data)

        theta_af3.push({
            x: time,
            y: data['pow'][0]
        });

        alpha_af3.push({
            x: time,
            y: data['pow'][1]
        });

        lowBeta_af3.push({
            x: time,
            y: data['pow'][2]
        });

        highBeta_af3.push({
            x: time,
            y: data['pow'][3]
        });

        gamma_af3.push({
            x: time,
            y: data['pow'][4]
        });


        theta_t7.push({
            x: time,
            y: data['pow'][5]
        });

        alpha_t7.push({
            x: time,
            y: data['pow'][6]
        });

        lowBeta_t7.push({
            x: time,
            y: data['pow'][7]
        });

        highBeta_t7.push({
            x: time,
            y: data['pow'][8]
        });

        gamma_t7.push({
            x: time,
            y: data['pow'][9]
        });

        theta_pz.push({
            x: time,
            y: data['pow'][10]
        });

        alpha_pz.push({
            x: time,
            y: data['pow'][11]
        });

        lowBeta_pz.push({
            x: time,
            y: data['pow'][12]
        });

        highBeta_pz.push({
            x: time,
            y: data['pow'][13]
        });

        gamma_pz.push({
            x: time,
            y: data['pow'][14]
        });

        theta_t8.push({
            x: time,
            y: data['pow'][15]
        });

        alpha_t8.push({
            x: time,
            y: data['pow'][16]
        });

        lowBeta_t8.push({
            x: time,
            y: data['pow'][17]
        });

        highBeta_t8.push({
            x: time,
            y: data['pow'][18]
        });

        gamma_t8.push({
            x: time,
            y: data['pow'][19]
        });


        theta_af4.push({
            x: time,
            y: data['pow'][20]
        });

        alpha_af4.push({
            x: time,
            y: data['pow'][21]
        });

        lowBeta_af4.push({
            x: time,
            y: data['pow'][22]
        });

        highBeta_af4.push({
            x: time,
            y: data['pow'][23]
        });

        gamma_af4.push({
            x: time,
            y: data['pow'][24]
        });




        time += 0.1;



        // Update the graph renders with the new data.
        // splineGraph_af3.render();
        //splineGraph_af4.render();
    }

    // Request data from the server.
    requestData = () => {
        if (ws.readyState == ws.OPEN) {
            ws.send("Requesting brain data ... " + Date.now());
        }
    }

    // Request data on an updateInterval.
    setInterval(() => {
        requestData();
    }, updateInterval);




