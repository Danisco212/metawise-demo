import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

function EEGData(props) {
    const canvas = document.querySelector('canvas');
    drawCircle(canvas, props.eegdata);
    //console.log(props.eegdata)
        return (
            <div className='col-sm-3 cpu'>
            <h3>EEG Quality</h3>
            <div className='canvas-wrapper'>
                <canvas className='canvas' width="200" height="200"></canvas>
                <div className="cpu-text">{props.eegdata}</div>
            </div>
            </div>
        )
    
}

export default EEGData;