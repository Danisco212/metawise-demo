// @ts-nocheck
import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import UnconsciousEnergyToken from './abis/UnconsciousEnergyToken.json';
import TokenMint from "./TokenMint";

class TokenData extends Component {

    async componentDidMount() {

        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() { 

         const provider = await detectEthereumProvider();

        if(window.ethereum){
            
            window.web3 = new Web3(window.ethereum);
            
            await window.ethereum.enable();
        } else if (window.web3){
           window.web3 = new Web3(window.web3.currentProvider);

            } else {
                window.alert('No Ethereum browser detected! You can check out metamask')
            }
            

        }
    


    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.setState({ account1: accounts[0] });

        const networkId = await web3.eth.net.getId();

        const UETData = UnconsciousEnergyToken.networks[networkId];
        console.log(UETData)
        if (UETData) {
            const UET = new web3.eth.Contract(UnconsciousEnergyToken.abi, UETData.address);
            console.log(UETData.address)
            this.setState({ UET })



            let UETBalance = await UET.methods.balanceOf(this.state.account1).call();



            //let UETBalance2 = await UET.methods.getBalances(this.state.account1).call() 

            let UETTotalSupply = await UET.methods.totalSupply().call();


            this.setState({ UETBalance: UETBalance.toString() });
            // this.setState({ UETBalance2: UETBalance2.toString() });
            //console.log(UETBalance2)

            this.setState({ UETTotalSupply: UETTotalSupply.toString() });




        } else {
            window.alert('Error!  UnconsciousEnergyToken contract not deployed - no detected network!')

        }

        this.setState({ loading: false })
        console.log(this.state.UETbalance)

    }

    mintTokens = (amount) => {
        this.setState({ loading: true })
        this.state.UET.methods.mint2(this.state.account1, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
            
            
        })

    }

    constructor(props) {
        super(props);
        this.state = {
            unconsciousEnergyToken: {},
            UETbalance: '0',
            UETTotalSupply: '0',
            account1: '',
            loading: true,
            tokenCount: '5'
           

            
        }
    }

    render() {
      



        let content
        {
            this.state.loading ? content = <p id='loader' className='text-center' style={{ margin: '30px' }}>LOADING PLEASE...</p> : content = <TokenMint
                UETBalance={this.state.UETbalance}
                UETTotalSupply={this.state.UETTotalSupply}
                account1={this.state.account1}
                mintTokens={this.mintTokens}
                // overallEEGQuality={this.state.overallEEGQuality}
                tokenCount={this.state.tokenCount}
            />
        }
   
    return( 
        
        <div className = 'container-fluid mt-5' >
            <div className='row'>
                <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vm' }}>
                    <div>
                        {content}
                    </div>
                </main>
            </div>

        
        </div>
    )
    }




}

export default TokenData;