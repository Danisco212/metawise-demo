import React, { Component } from 'react'
import Timer from './TimerEmotiv'

class Main extends Component {

   

    render() {
        //console.log(this.props.UETBalance.toString())
        //console.log(this.props.decentralBankBalance.toString())  

        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{ color: 'white' }}>
                            <th scope='col'>UEC Balance</th>
                            <th scope='col'>UE Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ color: 'white' }}>
                            <td>{this.props.tokenCount} Unconscious Energy Coins</td>
                            <td>{window.web3.utils.fromWei(this.props.UETBalance, 'Ether')} Unconscious Energy</td>
                        </tr>


                    </tbody>
                </table>
                <div className='card mb-2' style={{ opacity: '.9' }}>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        let amount = this.props.tokenCount.toString();
                        // amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')

                        this.props.mintTokens(amount)
                        //this.setState({ props.tokenCount = 0 })
                        //bind.(this)
                    
                            
                      }}
                        className='mb-3' >
                        <div style={{ borderSpacing: '0 1em' }}>
                            <label className='float-left' style={{ marginLeft: '15px' }}><b>Reward Tokens</b></label>
                            {/* <span className='float-right' style={{ marginRight: '8px' }}> */}
                                Total Supply: {window.web3.utils.fromWei(this.props.UETTotalSupply, 'Ether')}
                            {/* </span> */}
                            {/*   <div className='input-group mb-4'>
                                <input
                                  ref={(input)=>{this.input = input}}
                                    type='text'
                                    placeholder='0'
                                    required>
                                </input>
                                <div className='input-group-open'>
                                    <div className='input-group-text'>UET
                                    </div>

                                </div> 
                        </div>*/}
                        <button type='submit'  className='btn btn-primary btn-lg btn-block'>Mint Tokens</button>




                </div>


            </form>
                     {/*   <button className='btn btn-info btn-lg btn-block'>Connect Headset</button>
                    {/* <button className='btn btn-success btn-lg btn-block'>Start Record</button>
                    <button className='btn btn-danger btn-lg btn-block'>Stop Record</button> */}

                   {/*   <div className='card-body text-center' style={{color:'black'}}>
                        
                        <Timer overallEEGQuality={this.props.overallEEGQuality}/> 
    
                    </div> */ }
                
                 
                </div >
            </div >
        )
    }
}

export default Main;