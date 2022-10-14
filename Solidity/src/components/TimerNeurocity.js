import React, { Component, useState, useEffect, useRef } from 'react'
import DisplayComponent from './DisplayComponents';
import BtnComponent from './BtnComponent';
import './App.css';
import './Main';
import TokenData from './TokenData';
import {useHttpClient} from './http-hook/http-hook';
import LineCharts from './LineCharts';
import LineCharts2 from './LineCharts2';
import LineCharts3 from './LineCharts3';


function TimerNeurocity(props) {
    /* NeurocityDelta={this.props.NeurocityDelta} 
    NeurocityTheta={this.props.NeurocityTheta}
    NeurocityAlpha={this.props.NeurocityAlpha}
    NeurocityBeta={this.props.NeurocityBeta}
    NeurocityGamma={this.props.NeurocityGamma} */

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const [tokenCount, setTokenCount] = useState(0);

    const NeurocityDeltaRef = useRef();
    NeurocityDeltaRef.current = props.NeurocityDelta;

    const NeurocityThetaRef = useRef();
    NeurocityThetaRef.current = props.NeurocityTheta;

    const NeurocityAlphaRef = useRef();
    NeurocityAlphaRef.current = props.NeurocityAlpha;

    const NeurocityBetaRef = useRef();
    NeurocityBetaRef.current = props.NeurocityBeta;
    
    const NeurocityGammaRef = useRef();
    NeurocityGammaRef.current = props.NeurocityGamma;

    const signalQualityRef = useRef();
    signalQualityRef.current = props.signalQuality;
    

     const NeurocityDeltaArray = useRef([]);
    const NeurocityThetaArray = useRef([]);
    const NeurocityAlphaArray = useRef([]);
    const NeurocityBetaArray = useRef([]);
    const NeurocityGammaArray = useRef([]);
    const signalQualityArray = useRef([]);

    const timeDB = useRef([]);



   const {isLoading, error, sendRequest, clearError} = useHttpClient();

   const [showCharts, setShowCharts] = useState(false);

   const onShowCharts = () => {

    setShowCharts(true);

   };

   const onHideCharts = () => {

    setShowCharts(false);

   }



    const [showTokenData, setShowTokenData] = useState(false);

    const onShowTokenData = () => {
        setShowTokenData(true);

    };

    const hideTokenData = () => {

        setShowTokenData(false);
    };


    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    };



    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h, updatedTokenCount = tokenCount;


    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100){
            updatedS++;
            updatedMs = 0;

            let time = new Date();

    NeurocityDeltaArray.current.push(NeurocityDeltaRef.current)
    NeurocityThetaArray.current.push(NeurocityThetaRef.current)
    NeurocityAlphaArray.current.push(NeurocityAlphaRef.current)
    NeurocityBetaArray.current.push(NeurocityBetaRef.current) 
    NeurocityGammaArray.current.push(NeurocityGammaRef.current)
    signalQualityArray.current.push(signalQualityRef.current)
  
  console.log(NeurocityDeltaArray.current)
  console.log(NeurocityThetaArray.current)
  console.log(NeurocityAlphaArray.current)
  console.log(NeurocityBetaArray.current)
  console.log(NeurocityGammaArray.current)
  console.log(signalQualityArray.current)

    timeDB.current.push(time);  
    console.log(timeDB.current)

     // Here tokencount is gonna be connected to the neurocity signalQuality data

            if ( 10 >= 70){
                setTokenCount((currentNumber) => currentNumber + 1);
          

            }
          
        }
      
       
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    }

     const saveRecording = async () => {
      /*   NeurocityDeltaArray.current.push(NeurocityDeltaRef.current)
        NeurocityThetaArray.current.push(NeurocityThetaRef.current)
        NeurocityAlphaArray.current.push(NeurocityAlphaRef.current)
        NeurocityBetaArray.current.push(NeurocityBetaRef.current) 
        NeurocityGammaArray.current.push(NeurocityGammaRef.current) */

        try {
       await sendRequest('http://localhost:5000/api/eegdata', 'POST', JSON.stringify({
            neurocitydelta: NeurocityDeltaArray.current,
            neurocitytheta: NeurocityThetaArray.current,
            neurocityalpha: NeurocityAlphaArray.current,
            neurocitybeta: NeurocityBetaArray.current,
            neurocitygamma: NeurocityGammaArray.current, 
            signalquality: signalQualityArray.current,
            time: timeDB.current   
         
            

     }), {'Content-Type': 'application/json'});
    } catch (err) {
        console.log(err);
    }
 
    NeurocityDeltaArray.current = [];
    NeurocityThetaArray.current = [];
    NeurocityAlphaArray.current = [];
    NeurocityBetaArray.current = [];
    NeurocityGammaArray.current = [];
    signalQualityArray.current = [];
    timeDB.current = [];
           
        }; 

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 });
    };

    const resume = () => start();

    return (
        <div>
            <div >{tokenCount}</div>
            <div>{props.eqData}</div>

            
                <div className='stopwatch'>

                    <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start} />

                    <DisplayComponent  time={time} />
                   
                    <button className='btn btn-primary btn-lg btn-block' onClick={onShowTokenData}>Claim Tokens</button>
                    
                      <button className='btn btn-primary btn-lg btn-block' onClick={saveRecording}>Save Recording</button>  

                      <button className='btn btn-primary btn-lg btn-block' onClick={onShowCharts}>Show Charts</button>  
                </div>

                <div>
                    {showCharts && <LineCharts pzGamma={props.pzGamma}></LineCharts>}

                </div>


                <div>
                {showTokenData && <TokenData tokenCount={tokenCount}  />}
                
            
            </div>
             {/*    <button className='btn btn-primary btn-lg btn-block' onClick={onShowEEGData}>Connect Headset</button>
            <button className='btn btn-primary btn-lg btn-block' onClick={hideEEGData}>Disconnect</button>
            <div>
                {showEEGData && <Widget eqData={overallEEGQuality[1]} pzGamma={powDataCurrentState[14]}/>}
            
            </div> */}
            
        </div>
    )
    


}

export default TimerNeurocity;