
import React, { useState, useEffect, useCallback} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Metawise from '../abis/Metawise.json';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import './App.css';

/*async loadWeb3() {
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

         mint = (metawiseNFTs) => {
        this.state.contract.methods.mint(metawiseNFTs).send({ from: this.state.account1 })
            .once('receipt', (receipt) => {
                this.setState({
                    metawiseNFT: [...this.state.metawiseNFT, metawiseNFTs]
                })
            })
    }
    
    
    */

function NFTData(props){

    const [NFTTotalSupply, setNFTTotalSupply] = useState();

    const [metawiseContract, setMetawiseContract] = useState();

    const [userAccount, setUserAccount] = useState("");

   let metawiseNFT= [];

   let metawiseNFTs = [];

 
 

//, [loadWeb3, loadBlockchainData]
    
   

    const loadWeb3 = useCallback( async() =>  {
        const provider = await detectEthereumProvider();
        if(provider){
            console.log('ethereum wallet is connected')
            var web3 = new Web3(provider);
        }
      
        else {
          console.log('no ethereum wallet is connected')
        }
    },[]);

   

    const loadBlockchainData = useCallback( async () => {
      
         if(window.ethereum)
         var web3 = new Web3(window.ethereum);

         await window.ethereum.send('eth_requestAccounts');

        var accounts = await web3.eth.getAccounts(); 
        
       // this.setState({ account1: accounts[0] });
       setUserAccount("0x222bD4087F288e9AEc8d0a2c200eb7F7D3AF4e56");

       
       console.log(userAccount);

        let accountBalance = await web3.eth.getBalance(userAccount);

        const networkId = await web3.eth.net.getId();
        const networkData = Metawise.networks[networkId]

        if (networkData) {
            const abi = Metawise.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);

            // const [metawiseContract, setMetawiseContract] = useState(contract);
            setMetawiseContract({contract});
            console.log(metawiseContract);
           // this.setState({ contract })
            //console.log(this.state.contract)
            // call the totalSupply
            const metawiseNFTTotalSupply = await contract.methods.totalSupply().call();
            setNFTTotalSupply(metawiseNFTTotalSupply)
            //const [NFTTotalSupply, setNFTTotalSupply] = useState(metawiseNFTTotalSupply);
            //this.setState({ metawiseNFTTotalSupply });
            for (let i = 1; i <= NFTTotalSupply; i++) {
                 metawiseNFTs = await contract.methods.metawiseNFT(i - 1).call();
                // How to handle state in front end of array
               /*  this.setState({//... is spread operator, allows to set our state then merge
                    metawiseNFT: [...this.state.metawiseNFT, metawiseNFTs]

                }) */
              setNFTTotalSupply({metawiseNFT:[...metawiseNFT, metawiseNFTs]});


            }

        } else {
            window.alert('Smart contract not deployed')

        }

    
    
        //const run = () => {


        

        //let addressInfo = await web3.eth.get(this.state.account1);

        //this.setState({ addressInfo: addressInfo });


       // this.setState({ accountBalance: accountBalance });

        //console.log(accounts)
    }, []);


    useEffect(() => { 
        console.log('hello')
        loadWeb3();
        loadBlockchainData();
    },[loadWeb3, loadBlockchainData]);

    const mint = (metawiseNFTs) => {
        metawiseContract.methods.mint(metawiseNFTs).send({ from: userAccount })
            .once('receipt', (receipt) => {
               /*  this.setState({
                    metawiseNFT: [...this.state.metawiseNFT, metawiseNFTs]
                }) */
                setNFTTotalSupply({metawiseNFT:[ ...NFTTotalSupply, metawiseNFTs]});
            })
    }


    return (
        <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main'
                            className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto'
                                style={{ opacity: '0.8' }}>
                                <h1 style={{ color: 'black' }}>MetawiseNFT</h1>
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const metawise = metawiseNFTs.value;
                                    mint(metawise)
                                }}>
                                    <input
                                        type='text'
                                        placeholder='Add Metawise NFT'
                                        className="form-control mb-1"
                                        ref={(input) => metawiseNFTs = input}
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
                        {metawiseNFT.map((metawise, key) => {
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

  
    
    )


}

export default NFTData;

