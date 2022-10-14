import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Timer from './TimerEmotiv';
import Widget from './Widget';

function ConnectHeadset() {


    const [overallEEGQuality, setOverallEEGQuality] = useState({});
    const [powDataCurrentState, setPowDataCurrentState] = useState({});
    
    const [showEEGData, setShowEEGData] = useState(false);

    const onShowEEGData = () => {
        setShowEEGData(true);

    };

    const hideEEGData = () => {

        setShowEEGData(false);
    };





    useEffect(() => {

        const interval = setInterval(() => {
            const client = new W3CWebSocket('wss://localhost:6868');
            console.log('hello useEffect')
            let clientId = "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le";
            let clientSecret = "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT";
            let request = { "id": 1, "jsonrpc": "2.0", "method": "getCortexInfo" }
            let requestAccess = { "id": 1, "jsonrpc": "2.0", "method": "requestAccess", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT" } }
            let authorize = { "id": 1, "jsonrpc": "2.0", "method": "authorize", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT" } }
            let queryHeadsets = { "id": 1, "jsonrpc": "2.0", "method": "queryHeadsets" }
            let createSession = { "id": 1, "jsonrpc": "2.0", "method": "createSession", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjY1MDQ1MDEyLCJuYmYiOjE2NjQ3ODU4MTIsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ.C4V7PMTPhUm2PGb9Yi9b67Q-CQ8oR1IumItmJiF4faw", "headset": "INSIGHT2-A3D200C5", "status": "open" } }
            let overallEEGQuality;

            client.addEventListener('open', function (event) {
                console.log('Websocket connected');
                client.send(JSON.stringify(request));
                client.send(JSON.stringify(requestAccess));
                client.send(JSON.stringify(authorize));
            })

            /* client.onopen = function () {
    
            } */

            client.onmessage = function (event) {
                console.log(event.data)
            }
            /*  client.onopen = function () {
     
     
     
             } */
            client.onmessage = function (event) {
                console.log(event.data)
            }

            /*  client.onopen = function () {
     
     
                 client.onmessage = function (event) {
                     console.log(event.data)
                     console.log('cortexToken')
                 }
     
             } */

            client.onopen = function () {

                client.send(JSON.stringify(createSession));
            }

              /*client.addEventListener('message', function (event) {
                 let data1 = JSON.parse(event.data);
                 //console.log(data1);
                 // console.log('onMessage3')
             }) */

            client.onmessage = function (event) {


                let data1 = JSON.parse(event.data);
                try {
                    // console.log(data1['result']['id'])
                    if (data1['result']['id'] !== undefined) { //if (data1['result']['id'] != undefined){
                        let subscribe = { "id": 1, "jsonrpc": "2.0", "method": "subscribe", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjY1MDQ1MDEyLCJuYmYiOjE2NjQ3ODU4MTIsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ.C4V7PMTPhUm2PGb9Yi9b67Q-CQ8oR1IumItmJiF4faw", "session": data1['result']['id'], "streams": ["eq", "pow"] } }
                        client.send(JSON.stringify(subscribe))
                    }
                } catch (error) { }

            }

            client.addEventListener('message', (event) => {
                let data1 = JSON.parse(event.data);
                //console.log(data1);



                if (data1['eq'] !== undefined) { //if(data1['pow']
                    let eqDataCurrentState = data1['eq'];
                    setOverallEEGQuality(eqDataCurrentState);
                    //console.log(eqDataCurrentState)
                }
                //console.log(overallEEGQuality)

                if (data1['pow'] !== undefined) { //if(data1['pow'] != undefined){
                    let powCurrentState = data1['pow'];
                    //console.log(powCurrentState)
                    //this.setState({EEGPowData: powDataCurrentState});
                    setPowDataCurrentState(powCurrentState);
                    //console.log(powCurrentState)
                    setTimeout(function () {
                        //console.log(powDataCurrentState)
                       // console.log(powCurrentState)
                    }, 2000);
                }
                //console.log(powDataCurrentState[1])


            }
            )
        }, 1000);



        return () => {
            clearInterval(interval);
        };



    });

    function WidgetHandler() {

        return (
            <div>
                <Widget  eqData={overallEEGQuality[1]} pzGamma={powDataCurrentState[14]} />
            </div>
        )
    }


    return (
        /*  let widgets = [];
         const eqData = this.state.overallEEGQuality;
         const powData = this.state.EEGPowData;
         //console.log(data[1])
         widgets.push(<Widget eqData={eqData[1]} pzGamma={powData[14]} />) */
        <div>
            <button className='btn btn-primary btn-lg btn-block' onClick={onShowEEGData}>Connect Headset</button>
            <button className='btn btn-primary btn-lg btn-block' onClick={hideEEGData}>Disconnect</button>
            <div>
                {showEEGData && <Widget eqDataDatabase={overallEEGQuality} powDataDatabase={powDataCurrentState} eqData={overallEEGQuality[1]} pzGamma={powDataCurrentState[14]}/>}
            
            </div>

        </div>
    )

}

export default ConnectHeadsetEmotiv;