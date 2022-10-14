import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Metawise from '../abis/Metawise.json';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import './App.css';
import UnconsciousEnergyToken from '../abis/UnconsciousEnergyToken.json';
import DecentralBank from '../abis/DecentralBank.json';
import Main from './Main';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
//import Cortex from "../Client/emotivclient";
//const WebSocket = require('ws');
//const ws = new WebSocket("wss://localhost:6868")
import Widget from './Widget';
//const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1/MetawiseDB', {useNewUrlParser: true, useUnifiedTopology:true});


//var ws = new WebSocket.Client(url, protocols, options);

const client = new W3CWebSocket('wss://localhost:6868');
//const client2 = new WebSocket('wss://localhost:6868')
//import client from '../utilities/websocketConnection';

//When importing ../ goes out from the current directory
//HTML - is the markup language for writing basic text website
// CSS - Styles the website (colors, fonts, sizes)
// javascript allows the websites to be dynamic

class App extends Component {

    //Cortex lib/cortex  json file

      

     
        /*  client.addEventListener('error', function (event) {}
         ) */

        

        
   // }

   


    //}

   /* async loadEEGData() {
        //const ws = new WebSocket("wss://localhost:6868")

        //let clientId = "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le";
        //let clientSecret = "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT";
 

        
 let request = {"id": 1, "jsonrpc": "2.0", "method": "getCortexInfo"}
    
 let requestAccess = { "id": 1, "jsonrpc": "2.0", "method": "requestAccess", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT"}}
                 
 let authorize = { "id": 1, "jsonrpc": "2.0", "method": "authorize", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT" }}
    
 let queryHeadsets = { "id": 1, "jsonrpc": "2.0", "method": "queryHeadsets" }
    
let createSession = { "id": 1, "jsonrpc": "2.0", "method": "createSession", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjU5NzMwMDUyLCJuYmYiOjE2NTk0NzA4NTIsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ==.OXVJaRWm+oBr72zLlDBnLI70cDKuCeiz4JAp0YwAGGc=", "headset": "INSIGHT2-A3D200C5", "status": "active"} }
    
//let activateSession = { "id": 1, "jsonrpc": "2.0", "method": "updateSession",  "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjU5NzMwMDUyLCJuYmYiOjE2NTk0NzA4NTIsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ==.OXVJaRWm+oBr72zLlDBnLI70cDKuCeiz4JAp0YwAGGc=", "session": "e106a91d-13a2-413d-a2ac-5a71f8721a1f", "status": "active" }} 

//let subscribe = { "id": 1, "jsonrpc": "2.0", "method": "subscribe", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjU5NzMwMDUyLCJuYmYiOjE2NTk0NzA4NTIsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ==.OXVJaRWm+oBr72zLlDBnLI70cDKuCeiz4JAp0YwAGGc=", "session": sessionId, "streams": ["eq", "pow"] }}
function requestAccess1() {
        
    return new Promise(function(resolve, reject) {
        const REQUEST_ACCESS_ID = 1

        let requestAccess = { "id": 1, "jsonrpc": "2.0", "method": "requestAccess", "params": { "clientId":clientId , "clientSecret": clientSecret}}
        ws.send(JSON.stringify(requestAccess));


        ws.addEventListener('message', function (event) {
            try{
                if(JSON.parse(event.data)['id']==REQUEST_ACCESS_ID) {
                     resolve(event.data.toString())
            } 
        } catch (error) {}  
    })
    })
}

    

        //let streams = ['eq', 'eeg']
        //c.sub(streams);

    };*/

  
   
        

    //async componentDidMount() {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        const provider = await detectEthereumProvider();
        if (window.eth) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non ethereum browser detected. You should consider Metamask!')
        }
        

        //modern browsers
        //if there is a provider then lets
        //log that its working and access the window from the docs
        //to set Web3 to the provider

        if (provider) {
            console.log('ethereum wallet is connected')
            window.web3 = new Web3(provider)

        } else {
            console.log('No Ethereum wallet provider')
        }
    }

    //First up is to detect ethereum provider
    /*     async loadWeb3() {
            const provider = await detectEthereumProvider();
    
            //modern browsers
            //if there is a provider then lets
            //log that its working and access the window from the docs
            //to set Web3 to the provider
    
            if (provider) {
                console.log('ethereum wallet is connected')
                window.web3 = new Web3(provider)
    
            } else {
                console.log('No Ethereum wallet provider')
            }
        } */

    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.setState({ account1: accounts[0] });

        let accountBalance = await web3.eth.getBalance(this.state.account1);

        //let addressInfo = await web3.eth.get(this.state.account1);

        //this.setState({ addressInfo: addressInfo });


        this.setState({ accountBalance: accountBalance });

        //console.log(accounts)

        //this.setState({ account2: accounts[1] });

        //Coneccting with Ganache network Id
        const networkId = await web3.eth.net.getId();
        const networkData = Metawise.networks[networkId]



        const UETData = UnconsciousEnergyToken.networks[networkId];
        console.log(UETData)
        if (UETData) {
            const UET = new web3.eth.Contract(UnconsciousEnergyToken.abi, UETData.address);
            console.log(UETData.address)
            this.setState({ UET })



            let UETBalance = await UET.methods.balanceOf(this.state.account1).call();



            //let UETBalance2 = await UET.methods.getBalances(this.state.account1).call() 

            let UETTotalSupply = await UET.methods.totalSupply().call();

            let UETTotalSupply2 = await UET.methods.totalSupply2().call();

            this.setState({ UETBalance: UETBalance.toString() });
            // this.setState({ UETBalance2: UETBalance2.toString() });
            //console.log(UETBalance2)

            this.setState({ UETTotalSupply: UETTotalSupply.toString() });

            this.setState({ UETTotalSupply2: UETTotalSupply2.toString() });



        } else {
            window.alert('Error!  UnconsciousEnergyToken contract not deployed - no detected network!')

        }

        console.log(this.state.UETbalance)



        const decentralBankData = DecentralBank.networks[networkId];
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
            this.setState({ decentralBank })
            // let decentralBankBalance = await decentralBank.methods.stakingBalance(this.state.account1).call()
            let decentralBankBalance = await decentralBank.methods.balanceOf(this.state.decentralBank.address).call()
            let accountBankBalance = await decentralBank.methods.balanceOf(this.state.account1).call()
            let bankTotalSupply = await decentralBank.methods.totalSupply().call();

            this.setState({ decentralBankBalance: decentralBankBalance.toString() })
            this.setState({ bankTotalSupply: bankTotalSupply.toString() });
            this.setState({ accountBankBalance: accountBankBalance.toString() });



        } else {
            window.alert('Error!  DecentralBank contract not deployed - no detected network!')

        }

        if (networkData) {
            const abi = Metawise.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);

            this.setState({ contract })
            console.log(this.state.contract)
            // call the totalSupply
            const metawiseNFTTotalSupply = await contract.methods.totalSupply().call();
            this.setState({ metawiseNFTTotalSupply });


            //set up array to keep track of NFTs
            for (let i = 1; i <= metawiseNFTTotalSupply; i++) {
                const metawiseNFTs = await contract.methods.metawiseNFT(i - 1).call();
                // How to handle state in front end of array
                this.setState({//... is spread operator, allows to set our state then merge
                    metawiseNFT: [...this.state.metawiseNFT, metawiseNFTs]

                })


            }

        } else {
            window.alert('Smart contract not deployed')
        }

        //console.log(this.state.decentralBank.address)
        //console.log(this.state.UET.address)
        //console.log(this.state.decentralBankBalance)
        console.log(this.state.UETbalance)
        console.log(this.state.UETTotalSupply)
        console.log(this.state.UETTotalSupply2)
        console.log(this.state.accountBankBalance)
        console.log(this.state.accountBalance)
        //console.log(this.state.addressInfo)

        this.setState({ loading: false })
    }


   


    //With minting we are sending information and we need to specify the account.

    

    mint = (metawiseNFTs) => {
        this.state.contract.methods.mint(metawiseNFTs).send({ from: this.state.account1 })
            .once('receipt', (receipt) => {
                this.setState({
                    metawiseNFT: [...this.state.metawiseNFT, metawiseNFTs]
                })
            })
    }

    transferTokens = (amount) => {
        this.setState({ loading: true })
        this.state.UET.methods.approve(this.state.decentralBank.address, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
            this.state.decentralBank.methods.transferFrom(this.state.decentralBank.address, this.state.account1, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
                this.setState({ loading: false })

            })
        })

    }



    withdrawMoney = (amount) => {
        this.setState({ loading: true })
        this.state.decentralBank.methods.withdrawMoney(this.state.account1, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })

    }

    mintTokens = (amount) => {
        this.setState({ loading: true })
        this.state.UET.methods.mint2(this.state.account1, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })

    }

    //Look in transfer function to see how banksupply can be transfered to account1
    claimTokens = (amount) => {
        this.setState({ loading: true })
        //this.state.unconsciousEnergyToken.methods.approve(this.state.decentralBank.address, amount).send({from: this.state.account1}).on('transactionHash', (hash) => {
        // this.state.decentralBank.methods.transferFrom(this.state.decentralBank.address, this.state.account1 , amount).send({from: this.state.account1}).on('transactionHash', (hash) => {
        //this.state.unconsciousEnergyToken.methods.mint2(this.state.account1, amount).send({from: this.state.account1}).on('transactionHash', (hash) => {
        this.state.decentralBank.methods.transfer(this.state.account1, amount).send({ from: this.state.account1 }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })
        //})
    }

    constructor(props) {
        super(props);
        this.state = {
            account1: '',
            account2: '',
            account1Balance: '0',
            account2Balance: '0',
            contract: null,
            metawiseNFTTotalSupply: 0,
            metawiseNFT: [],
            decentralBank: {},
            unconsciousEnergyToken: {},
            decentralBankBalance: '0',
            bankTotalSupply: '0',
            UETbalance: '0',
            UETBalance2: '0',
            UETTotalSupply: '0',
            UETTotalSupply2: '0',
            accountBalance: '0',
            EEGDataFrequency: {},
            overallEEGQuality: {},
            EEGPowData: {},
            theta_af3: {},
            alpha_af3: {},
            lowBeta_af3: {},
            highBeta_af3: {},
            gamma_af3: {},
            theta_t7: {},
            alpha_t7: {},
            lowBeta_t7: {},
            highBeta_t7: {},
            gamma_t7: {},
            theta_pz: {},
            alpha_pz: {},            
            lowBeta_pz: {},
            highBeta_pz: {},
            gamma_pz: {},
            theta_t8: {}, 
            alpha_t8: {},
            lowBeta_t8: {},           
            highBeta_t8: {},
            gamma_t8: {},
            theta_af4: {},
            alpha_af4: {},
            lowBeta_af4: {}, 
            highBeta_af4: {},
            gamma_af4: {},
            theta_af: {},
            alpha_af3: {},
            lowBeta_af3: {},
            highBeta_af3: {},
            gamma_af3: {},
            theta_t7: {},
            alpha_t7: {},
            lowBeta_t7: {},
            highBeta_t: {},
            gamma_t7: {},
            theta_pz: {},
            alpha_pz: {},
            lowBeta_pz: {},
            highBeta_pz: {},
            gamma_pz: {},
            theta_t8: {},
           alpha_t8: {},
           lowBeta_t8: {},
           highBeta_t8: {},
           gamma_t8: {},
           theta_af4: {},
           alpha_af4: {},
           lowBeta_af4: {},
           highBeta_af4: {},
           gamma_af4: {},
           tokenCount: 1,
            loading: true

        }

    }

    componentDidMount() {
        //await this.loadEEGData();
         
        
 
          let clientId = "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le";
          let clientSecret = "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT";
   
          let request = {"id": 1, "jsonrpc": "2.0", "method": "getCortexInfo"}
          let requestAccess = { "id": 1, "jsonrpc": "2.0", "method": "requestAccess", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT"}}
          let authorize = { "id": 1, "jsonrpc": "2.0", "method": "authorize", "params": { "clientId": "MwiUyq5sCJH00XwDvJ2CjMJ4I2kH9IT5l9VPe0Le", "clientSecret": "6FMgDmJlJ9YdMUv5knPC2Rs31cNgO71wSlkhefLuuZidsGXfbYNGHP8U9tvq8hIMrJ4nh7sotXNXjALbOEP1NTe28lfJ5Mpnyg01rJTiu4bG6jqobKs4kzShP3UNVjUT" }}
         let queryHeadsets = { "id": 1, "jsonrpc": "2.0", "method": "queryHeadsets" }
         let createSession = { "id": 1, "jsonrpc": "2.0", "method": "createSession", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjYwNjU0MjI1LCJuYmYiOjE2NjAzOTUwMjUsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ==.7FivD1lxg6O1qu6oN8vYJ5NAp5q8+erWqkV65SKGFZA=", "headset": "INSIGHT2-A3D200C5", "status": "open"} }
         let overallEEGQuality;

         /*useEffect(() =>{
            const identifier = setTimeout(() => { 
            //code here
         
          },1000 );*/
 
          client.addEventListener('open', function (event) {
        console.log('Websocket connected');
        client.send(JSON.stringify(request));
        client.send(JSON.stringify(requestAccess));
        client.send(JSON.stringify(authorize));
          })
     
          client.onopen = function() {
             
          }
             
 
      client.onmessage = function(event){
         console.log(event.data)
      }
      client.onopen = function() {
         
         
       
      }
      client.onmessage = function(event){
         console.log(event.data)
      }
 
      client.onopen = function() {
         
        
         client.onmessage = function(event){
             console.log(event.data)
             console.log('cortexToken')
          }
         
      }
     
      client.onopen = function() {
     
         client.send(JSON.stringify(createSession));
      }
     
      /*client.addEventListener('message', function (event) {
         let data1 = JSON.parse(event.data);
         console.log(data1);
        // console.log('onMessage3')
      })*/
      
      client.onmessage = function(event){
        
 
         let data1 = JSON.parse(event.data);
         try{
        // console.log(data1['result']['id'])
         if (data1['result']['id'] !== undefined){ //if (data1['result']['id'] != undefined){
             let subscribe = { "id": 1, "jsonrpc": "2.0", "method": "subscribe", "params": { "cortexToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5TY2FuYWx5emVyLm1ldGF3aXNlcHJvdG8iLCJhcHBWZXJzaW9uIjoiMS4wIiwiZXhwIjoxNjYwNjU0MjI1LCJuYmYiOjE2NjAzOTUwMjUsInVzZXJJZCI6ImI5NmY1ZWE2LTMxMTQtNGU0Ni1hMmQxLWRlNGIxODdiOWU2ZiIsInVzZXJuYW1lIjoiU2NhbmFseXplciIsInZlcnNpb24iOiIyLjAifQ==.7FivD1lxg6O1qu6oN8vYJ5NAp5q8+erWqkV65SKGFZA=", "session": data1['result']['id'], "streams": ["eq", "pow"] }}
             client.send(JSON.stringify(subscribe))
         } }catch (error) {}
     
         
         
         client.addEventListener('message', (event) => {
             let data1 = JSON.parse(event.data);
             //console.log(data1);

             //if(this.state.overallEEGQuality !== undefined){
             const currentState = ({...this.state.overallEEGQuality});
             const powDataCurrentState = ({... this.state.EEGPowData});

             if(data1['pow'] !== undefined){ //if(data1['pow'] != undefined){
                let powDataCurrentState = data1['pow'];
                this.setState({EEGPowData: powDataCurrentState});
             }

             //}
            //const currentState = Object.assign(this.state.overallEEGQuality, {})
            //currentState[data1['eq'][1]] = data1;
            if(data1['eq'] !== undefined){ //if(data1['eq'] != undefined){
            let currentState = data1['eq'];
             this.setState({
                overallEEGQuality: currentState
             })
            }
            
 
             //console.log('onMessage3')
            /*  if(data1['eq'] != undefined){
                let overallEEGQuality.push(data['eq'][1]);
                 } */
                
     
          });
      }.bind(this)
    }

    render() {
        //console.log(this.state.overallEEGQuality);
        let widgets = [];
        const eqData = this.state.overallEEGQuality;
        const powData = this.state.EEGPowData;
        //console.log(data[1])
        widgets.push(<Widget eqData={eqData[1]} pzGamma={powData[14]} />)

        Object.values(eqData).forEach((value) => {
            //console.log(value);
            //console.log(key);
            //console.log(key)
           //console.log(Object.keys(data));

           //console.log(Object.values(data));
          
            console.log(eqData[1])
            
           
           
           //console.log(Object.values['eq'][1])
           //console.log(Object.entries(data));

            //console.log(value)
            

            
        })
       


        let content
        {
            this.state.loading ? content = <p id='loader' className='text-center' style={{ margin: '30px' }}>LOADING PLEASE...</p> : content = <Main
                UETBalance={this.state.UETbalance}
                UETBalance2={this.state.UETbalance2}
                UETTotalSupply={this.state.UETTotalSupply}
                bankTotalSupply={this.state.bankTotalSupply}
                decentralBankBalance={this.state.decentralBankBalance}
                withdrawMoney={this.withdrawMoney}
                claimTokens={this.claimTokens}
                transferTokens={this.transferTokens}
                account1={this.state.account1}
                mintTokens={this.mintTokens}
                accountBalance={this.state.accountBalance}
                overallEEGQuality={this.state.overallEEGQuality}

            />
        }
        return (

            
            <div className="container-filled">

                <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-o shadow'>
                    <div className='navbar-brand col-sm-3 col-md-3 mr-0 ' style={{ color: 'white' }}>

                        Metawise
                    </div>
                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrap
                    d-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                                {this.state.account1}
                            </small>
                           
                        </li>

                    </ul>

                </nav>

                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main'
                            className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto'
                                style={{ opacity: '0.8' }}>
                                <h1 style={{ color: 'black' }}>MetawiseNFT</h1>
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const metawise = this.metawiseNFTs.value
                                    this.mint(metawise)
                                }}>
                                    <input
                                        type='text'
                                        placeholder='Add Metawise NFT'
                                        className="form-control mb-1"
                                        ref={(input) => this.metawiseNFTs = input}
                                    />
                                    <input style={{ margin: '6px' }}
                                        type='submit'
                                        className='btn btn-primary btn-black'
                                        value='MINT' />
                                </form>
                            </div>
                        </main>

                    </div>


                    <hr></hr>   {/*hr gives space */}

                    <div className='row textCenter'>
                        {this.state.metawiseNFT.map((metawise, key) => {
                            return (
                                <div>
                                    <div>
                                        <MDBCard className='token img' style={{ maxWidth: '22rem' }} >

                                            <MDBCardBody>
                                                <MDBCardTitle> Metawise NFT </MDBCardTitle>
                                                <MDBCardText> A Metawise NFT that gives user access
                                                    to the platform. The NFT enables user to connect
                                                    the headset and be rewarded tokens for sending in
                                                    EEG data to the blockchain.

                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                </div>
                            )
                        })}

                    </div>




                </div>


                <div>
                    <div className='container-fluid mt-5'>
                        <div className='row'>
                            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vm' }}>
                                <div>
                                    {content}
                                </div>
                            </main>
                        </div>

                    </div>
                </div>

                <div>
                {widgets}
                </div>

            </div>
           



        )
    }
}

export default App;