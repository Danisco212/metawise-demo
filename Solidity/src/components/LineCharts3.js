import React, { useState, useEffect, useRef } from 'react';

 import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement,
    Title, Tooltip, Legend, Filler, LineElement} from "chart.js"; 
    import { Line, Chart } from "react-chartjs-2"; 
    import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
    // import 'chartjs-adapter-moment';
    import 'chartjs-adapter-luxon';

     ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        StreamingPlugin,
        RealTimeScale
    ) 

   //Chart.register(StreamingPlugin);



    function LineCharts3 (props) {

      var updateInterval = 20;

      var numberOfElements = 10;

      var updateCount = 0;

        const pzGammaData = useRef();
   pzGammaData.current = props.pzGamma;

   const pzGammaArray = useRef([]);

   const time = useRef([]);



   const [gammaData, setGammaData] = useState([]);
   const [timeData, setTimeData] = useState([]);

 /*   useEffect(() => {

     const interval = setInterval(() => {

     /* var gammaDataChart = {
        time: time.current,
        value: pzGammaData.current,
        
       }; */

       
  /* time.current.push(Date.now());
    
   pzGammaArray.current.push(pzGammaData.current); 

 
 
   console.log(pzGammaData.current);

   //console.log(gammaDataChart);

    setGammaData(currentData => [...gammaData, pzGammaData.current]);
    //setTimeData(currentData => [...timeData, time.current]);

    //console.log(props.pzGamma);

 }, 500); 



   return () => {
     clearInterval(interval);
 };  

 }, []); */

 const data = {
    // labels: time.current,
    datasets: [
      {
        label: "Time",
        data: [],
        backgroundColor: 
          "'#f26c6d'",
        backround: 'transparent',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        borderDash: [8, 4],
        fill: true
 }]
};

 const options = {
    plugins: {
        legend: {
            position: 'top',
        }
    },
    responsive: true,
    responsiveAnimationDuration: 50,
    scales: {
        x: {
            type : 'realtime',
            realtime: {
                onRefresh: chart => {
              
                    chart.data.datasets.forEach(dataset => {
                        dataset.data.push({
                            x: Date.now(),
                            y: Math.random()
                            
                        });
                        console.log(dataset.data);
                    })
                    
                    
            
            },
            delay: 2000
        }
        
        }
      
    }
 };



 return (

    <div style={{width: '40%', height: '40%', marginLeft:'5%'}}>

    <Line data={data} options={options} ></Line>

    </div>
 )


    }

    export default LineCharts3;