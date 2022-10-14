function drawCircle(canvas,currentLoad){
    if(canvas){
        let context = canvas.getContext('2d');
        // Draw Inner Circle
        context.clearRect(0,0,500,500)
        context.fillStyle = "#ccc";
        context.beginPath();
        context.arc(100,100,90,Math.PI*0,Math.PI*2);
        context.closePath();
        context.fill();

        // Draw the outter line
        // 10px wide line
        context.lineWidth = 10;
        if(currentLoad < 20){
            context.strokeStyle = '#d9534f';
        }else if(currentLoad < 40){
            context.strokeStyle = '#337ab7';
        }else if(currentLoad < 70){
            context.strokeStyle = '#f0ad4e';
        }else{
            context.strokeStyle = '#00ff00';
        }
        context.beginPath();
        context.arc(100,100,95,Math.PI*1.5,(Math.PI * 2 * currentLoad/100) + Math.PI*1.5);
        context.stroke();
    }
}

export default drawCircle;