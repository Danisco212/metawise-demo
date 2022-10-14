import React, { Component} from 'react';
import EEGData from './EEGData';
import './widget.css'
import TimerEmotiv from './TimerEmotiv';
import TimerNeurocity from './TimerNeurocity';


class Widget extends Component {
 constructor(props) {
    super(props);
    this.state = {};

 }

 render() {
  /*  <div>
         <TimerEmotiv eqData = {this.props.eqData} eqDataDatabase={this.props.eqDataDatabase}  powDataDatabase={this.props.powDataDatabase}
            pzGamma={this.props.pzGamma}/>
         </div> */

    return(
        <div>
          
    
        <EEGData eegdata = {this.props.eqData}/>
        <br></br>
      
         <div>
         <TimerNeurocity NeurocityDelta={this.props.NeurocityDelta} 
                NeurocityTheta={this.props.NeurocityTheta}
                NeurocityAlpha={this.props.NeurocityAlpha}
                NeurocityBeta={this.props.NeurocityBeta}
                NeurocityGamma={this.props.NeurocityGamma}
                signalQuality={this.props.signalQuality} />
         </div>
        
        </div>
        
    )
 }
}

export default Widget;