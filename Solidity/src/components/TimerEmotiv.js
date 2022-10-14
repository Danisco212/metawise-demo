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


function TimerEmotiv(props) {

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const [tokenCount, setTokenCount] = useState(0);
    const perf = useRef();
    perf.current = props.eqData;
    const eqData = useRef();
    eqData.current = props.eqDataDabase;

    const powData = useRef();
    powData.current = props.powDataDatabase;

     const eqDataArray = useRef([]);
    const powDataArray = useRef([]);
    const timeDB = useRef([]);

    

   /*  let eqDataArray = [];
    let powDataArray = [];
    let timeDB = [];
 */
   const [eqState, setEqState] = useState([]);
   const [powState, setPowState] = useState([]);
   const [timeState, setTimeState] = useState([]);

 
    let getone = [1];
    let gettwo = [1];
    let getthree = [12, 12, 12, 12];



    const [EEGData, setEEGData] = useState([]);

    //const [timeDatabase, setTimeDatabase] = useState(0);

    let EEGDataArray = [];

   //let timeDatabase = 0.0;

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

   

  

  


   

    // const [tokenCount, setTokenCount] = useState(0);
    const overallEEGQuality = props.overallEEGQuality;
    //console.log(tokenCount) 

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

        
      eqDataArray.current.push(perf.current);

    powDataArray.current.push(powData.current);

    timeDB.current.push(updatedS);  

    setEqState(perf.current);



    //console.log(eqDataArray)
    //console.log(powDataArray)
    //console.log(timeDB)
        

            if ( perf.current >= 70){
                setTokenCount((currentNumber) => currentNumber + 1);
               /*  EEGData.push({
                    x: time,
                    y: data['pow']
                });
                //let array = JSON.parse(data['eq'])

                if(data.eq != undefined){
                overallEEGQuality.push({ x: time, y: data.eq[1] });
                } */
            }
          
        }
      
       
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    }

     const saveRecording = async () => {
      
      console.log(eqState);

        try {
       await sendRequest('http://localhost:5000/api/eegdata', 'POST', JSON.stringify({
            pow: powDataArray.current,
            eq: eqDataArray.current,
            time: timeDB.current   

           /*  pow: getone,
            eq: gettwo,
            time: getthree */
          
         
            

     }), {'Content-Type': 'application/json'});
    } catch (err) {
        console.log(err);
    }
    // timeDB.current = 0;
    powDataArray.current = [];
    eqDataArray.current = [];
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

export default TimerEmotiv;