import React, { useEffect, useState } from 'react';
import Timer from './TimerEmotiv';
import Widget from './Widget';

import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function ConnectHeadsetNeurocity() {
   // delta: [0.1, 4], // NOTE: Bandpass attenuates signal below 2 Hz
    //theta: [4, 7.5],
    //alpha: [7.5, 12.5],
    //beta: [12.5, 30],
    //gamma: [30, 100] // NOTE: Bandpass attenuates signal above 45 Hz
  

    const [NeurocityDelta, setNeurocityDelta] = useState();
    const [NeurocityTheta, setNeurocityTheta] = useState();
    const [NeurocityAlpha, setNeurocityAlpha] = useState();
    const [NeurocityBeta, setNeurocityBeta] = useState();
    const [NeurocityGamma, setNeurocityGamma] = useState();
    const [signalQuality, setSignalQuality] = useState();

    
    const [showEEGData, setShowEEGData] = useState(false);

    const onShowEEGData = () => {
        setShowEEGData(true);

    };

    const hideEEGData = () => {

        setShowEEGData(false);
    };





    useEffect(() => {

        const interval = setInterval(() => {
        socket.emit('hello from react');

        socket.on("signalData", (data) => {
        //console.log(data);
        setSignalQuality(data);
        });


       socket.on("data", (data) => {
       //console.log(data);
       //console.log(data[0].status);
    /*    info: {
        channelNames: [
          'CP3', 'C3',
          'F5',  'PO3',
          'PO4', 'F6',
          'C4',  'CP4'
        ], */
       
       /* console.log(data.data.alpha[1]);
       console.log(data.data.alpha[2]);
       console.log(data.data.alpha[3]);
       console.log(data.data.alpha[4]);
       console.log(data.data.alpha[5]);
       console.log(data.data.alpha[6]);
       console.log(data.data.alpha[7]);
     */

       //console.log(data.data.delta);
       //console.log(data.data.theta);
       //console.log(data.data.alpha);
       //console.log(data.data.beta);
       //console.log(data.data.gamma);

       setNeurocityDelta(data.data.delta);
       setNeurocityTheta(data.data.theta);
       setNeurocityAlpha(data.data.alpha);
       setNeurocityBeta(data.data.beta);
       setNeurocityGamma(data.data.gamma);
       
  });
          
        }, 2000);



        return () => {
            clearInterval(interval);
        };



    });

    function WidgetHandler() {

        return (
            <div>
                <Widget   />
            </div>
        )
    }


    return (
      
        <div>
            <button className='btn btn-primary btn-lg btn-block' onClick={onShowEEGData}>Connect Headset</button>
            <button className='btn btn-primary btn-lg btn-block' onClick={hideEEGData}>Disconnect</button>
            <div>
                {showEEGData && <Widget NeurocityDelta={NeurocityDelta} 
                NeurocityTheta={NeurocityTheta}
                NeurocityAlpha={NeurocityAlpha}
                NeurocityBeta={NeurocityBeta}
                NeurocityGamma={NeurocityGamma}
                signalQuality={signalQuality}/>}
            
            </div>

        </div>
    )

}

export default ConnectHeadsetNeurocity;