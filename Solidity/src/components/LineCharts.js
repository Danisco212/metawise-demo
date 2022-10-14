import React, { useState, useEffect, useRef } from 'react';

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement,
    Title, Tooltip, Legend, Filler, LineElement} from "chart.js";
    import { Line, Chart } from "react-chartjs-2"; 

    ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement
    )

    
   

    function LineCharts (props) {

      var updateInterval = 20;

      var numberOfElements = 9;

      var updateCount = 0;

        const pzGammaData = useRef();
   pzGammaData.current = props.pzGamma;

   const [state, setState] = useState([]);

   const pzGammaArray = useRef([]);

   const time = useRef([]);

  
   



   const [gammaData, setGammaData] = useState([]);
   const [timeData, setTimeData] = useState([]);
   
   function myChart()  {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let myTime = hour +":" + minutes + ":" + seconds;

    time.current.push(myTime);
 
    pzGammaArray.current.push(pzGammaData.current); 

     //setGammaData( [ pzGammaArray.current.push(pzGammaData.current)]);

    

if (updateCount > numberOfElements) {
 time.current.shift();
 pzGammaArray.current.shift();
 //pzGammaArray.current.push(pzGammaData.current);
 //updateCount = 0;
 console.log(pzGammaArray.current);
    console.log(time.current);
}
else {
 updateCount++;
 
 //var yInstance = ChartJS.update();
 //Chart.update();
 //myChart();
 //pzGammaArray.current.push(pzGammaData.current); 
/*  time.current.push(myTime);
 

 time.current.shift();
 pzGammaArray.current.shift(); */
 //chart.update();
 
}
}


  // myChart();

   useEffect(() => {

     const interval = setInterval(() => {

     /* var gammaDataChart = {
        time: time.current,
        value: pzGammaData.current,
        
       }; */

    
    
    myChart()
/*    if (time.current.length > 10 ) {
    time.current.shift();
    //pzGammaArray.current.shift();
   } */
 
  /*  setData({  labels: time.current,
    datasets: [
      {
        data: pzGammaArray.current,
        backround: 'transparent',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4
  }] */

   //})
   console.log(pzGammaData.current);

   //const chart = pzGammaData.current.chartInstance;
   //chart.update();
   //myChart();
   //console.log(gammaDataChart);

    //setGammaData(currentData => [...gammaData, pzGammaData.current]);
    //setTimeData(currentData => [...timeData, time.current]);

    //console.log(props.pzGamma);

 }, 1000); 



   return () => {
     clearInterval(interval);
 };  

 }, []);

/*  const chart = new ChartJS(
  {
        type: 'line',
        data: { 
          labels: time.current,
          datasets: [
            {
              data: pzGammaArray.current,
              backround: 'transparent',
              borderColor: '#f26c6d',
              pointBorderColor: 'transparent',
              pointBorderWidth: 4
            }]}}); */

 //myChart();

  const [data, setData] = useState({
  labels: time.current,
  datasets: [
    {
      data: pzGammaArray.current,
      backround: 'transparent',
      borderColor: '#f26c6d',
      pointBorderColor: 'transparent',
      pointBorderWidth: 4
}]
}); 

 const options = {
  responsive: true,
    plugins: {
        legend: false
    },
    scales: {
        x: {
           type: 'time',
           /*  time: {
            displayFormats: {
              milliseconds: 'mm:ss.SSS',
            } */

         // } 
        },
        y: {
          display : true,
           ticks: {
            
            beginAtZero: true,
            //callback : function (value) { return value}
            //callback: function (value) { if (Number.isInteger(value)) { return value; } },
                    //suggestedMax: maxValue,
          } 
          //ChartJS.update
            /* min: 10,
            max: 20 */
        }
    }
 };



 return (

    <div style={{width: '40%', height: '40%', marginLeft:'5%'}}>

    <Line data={data}  options={options}  ></Line> 

    </div>
 )


    }

    export default LineCharts;