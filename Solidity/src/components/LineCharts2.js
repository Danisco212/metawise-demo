import React, { useState, useEffect, useRef, PureComponent } from 'react'
import { BatChart, Bar, Line, LineChart, XAxis,
   YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
/* import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement,
   Title, Tooltip, Legend, Filler} from "chart.js";
   import { Line } from "react-chartjs-2"; */

function LineCharts2 (props){

   //const eqDataArray = useRef([]);

   //let gammaDataChart = useRef({});

   //gammaDataChart

 /*   const powData = useRef();
   powData.current = props.powDataDatabase; */

   const pzGammaData = useRef();
   pzGammaData.current = props.pzGamma;

   const time = useRef();

   time.current = Date.now();

   

   const pzGammaArray = useRef([]);

   const timeArray = useRef([]);



   const [data, setGammaData] = useState([]);

     /* let gammaDataChart = {
      time: Date.now(),
      value: props.pzGamma
     }; */
    //var gammaDataChart = {};
 

   //setGammaData(currentData => [...gammaData, gammaDataChart]); 

   //setGammaData(gammaDataChart)
   let tick = 0;
  
     useEffect(() => {

      const interval = setInterval(() => {

        timeArray.current.push(time.current);

        pzGammaArray.current.push(pzGammaData.current);


        var gammaDataChart = {
          time: time.current,
          value: pzGammaData.current
         };
      

   
     console.log(pzGammaData.current);

     console.log(gammaDataChart);

      setGammaData(currentData => [...currentData, gammaDataChart]);
      //console.log(props.pzGamma);

   }, 500); 



     return () => {
       clearInterval(interval);
   };  

   }, []);
 
//date.now()

return (
<div>
   <h1> Gamma Chart</h1>
     <ResponsiveContainer width="50%" height="50%" aspect={3}>  
    <LineChart width={1000} height={300} data={data} margin={{top: 15, right:30, left: 20, bottom: 5,}}>
    
    
    <CartesianGrid horizontal="true" vertical="" strokeDasharray="5 5" stroke="#243240"/>
    <XAxis dataKey="time"></XAxis>
    <YAxis  tick={{fill:"#fff"}}/>
    <Tooltip contentStyle={{ backroundColor: "8884d8", color:"fff"}} itemStyle={{color: "fff"}} cursor={false}/>
    <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth="5" dot={{fill:"2e4355", stroke:"#8884d8", strokeWidth:2, r:5}} 
    activeDot={{fill:"#2e4355", stroke:"8884d8", strokeWidth:5, r:10}}/>
  </LineChart>
  </ResponsiveContainer>
</div>


)


}

export default LineCharts2;