import React from 'react';
import styles from './App.css';

function BtnComponent(props) {

    return (
        <div>
            {(props.status === 0) ?
            <button className='btn btn-success btn-lg btn-block' onClick={props.start}>Start Record</button> : ""
          }
            {(props.status === 1)?
           <div>
             <button className='btn btn-info btn-lg btn-block' onClick={props.stop}>Pause Record</button> 
             <button className='btn btn-danger btn-lg btn-block' onClick={props.reset}>Stop Record</button> 

            </div> : ""
        }
           {(props.status === 2)?
           <div>
             <button className='btn btn-success btn-lg btn-block' onClick={props.resume}>Resume Record</button> 
             <button className='btn btn-danger btn-lg btn-block' onClick={props.reset}>Stop Record</button> 

            </div> : ""
        }
        
        </div>
    );
}

export default BtnComponent;