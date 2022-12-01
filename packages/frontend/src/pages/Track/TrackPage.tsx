// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { StartButton } from "../../components";
import Header from "../../components/Header";
import Pulser from "../../components/Pulser/Pulser";
import { SideMenu } from "../../components/SideMenu";
import { useStopwatch } from 'react-timer-hook';
import { useNotion } from "../../contexts/NotionContext";
//import LineGraph from "./components/LineGraph";
import { CONFIG } from "../../utils/ApiHelper";
import detectEthereumProvider from "@metamask/detect-provider";
import UnconsciousEnergyToken from '../Web3/abis/UnconsciousEnergyToken.json';
import Web3 from "web3";

const TrackPage = (props: any) => {
    const [account1, setAccount1] = useState()
    const [UET, setUET] = useState()
    const [UETBalance, setUETBalance] = useState()
    const [UETTotalSupply, setUETTotalSupply] = useState()
    const [loadingWeb3, setLoadingWeb3] = useState(false)

    const mintTokens = (time) => {
        let amount = time * 1
        setLoadingWeb3(true)
        UET.methods.mint2(account1, amount).send({from: account1}).on('transactionHash', (hash) => {
            setLoadingWeb3(false)
            toast('Congrats! You have minted some $UE')
        })
    }

    useEffect(() => {
        // @ts-ignore
        loadAllData()
    }, [])

    const loadAllData = async() => {
        await loadWeb3()
        await loadBlockchainData()
    }

    // web3 stuffs
    const loadWeb3 = async () => {
        await detectEthereumProvider();
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3){
           window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No Ethereum browser detected! You can check out metamask')
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        setAccount1(accounts[0])

        const networkId = await web3.eth.net.getId();

        const UETData = UnconsciousEnergyToken.networks[networkId];
        if (UETData) {
            const mUET = new web3.eth.Contract(UnconsciousEnergyToken.abi, UETData.address);
            setUET(mUET)
            let mUETBalance = await mUET.methods.balanceOf(accounts[0]).call();
            let mUETTotalSupply = await mUET.methods.totalSupply().call();
            setUETBalance(window.web3.utils.fromWei(mUETBalance.toString(), 'Ether'))
            setUETTotalSupply(window.web3.utils.fromWei(mUETTotalSupply.toString(), 'Ether'))
        } else {
            alert('Error!  UnconsciousEnergyToken contract not deployed - no detected network!')
        }
        setLoadingWeb3(false)
    }
    const [notion, setNotion] = useState(null)
    useEffect(() => {
        try {
            setNotion(props.authData.notion)
        } catch (error) {
            console.log(error)
        }
    }, [props])
    // const notion = useNotion()
    const [tracker, setTracker] = useState<any>()
    const [eegTracker, setEEGTracker] = useState<any>()
    const [tracking, setTracking] = useState(false)
    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });
    const [trackedData, setTrackedData] = useState<any>([])
    const [trackedEEG, setTrackedEEG] = useState<any>([])
    const startReading = () => {
        // mintTokens(10) // minting for 10 minutes
        // return
        setTracking(true)
        reset()
        start()
        setTracker(notion.brainwaves("powerByBand").subscribe((brainwaves: any) => {
            setTrackedData((prev: any) => [...prev, brainwaves])
        }))
        setEEGTracker(notion.brainwaves("raw").subscribe((eeg: any) => {
            setTrackedEEG((prev: any) => [...prev, eeg])
        }))
    }

    const savePowerbands = (sessionId: string) => {
        axios.post(CONFIG.addBands, {session_id: sessionId, bands: trackedData})
        .then(res => {
            console.log(res)
            toast("Powerbands saved successfully")
        })
        .catch(err => toast.error("Powerbands failed to save"))
    }

    const saveRawEEGS = (sessionId: string) => {
        axios.post(CONFIG.addEEG, {session_id: sessionId, eegArray: trackedEEG})
        .then(res => {
            console.log(res)
            toast("EEG saved successfully")
        })
        .catch(err => toast.error("EEG failed to save"))
    }

    const saveSession = () => {
        toast('Saving data')
        let session = {
            userId: notion?.api?.user?.uid,
            recordDate: new Date()
        }
        axios.post(CONFIG.addSession, session)
        .then(data => {
            let sessionId = data.data.data._id
            savePowerbands(sessionId)
            saveRawEEGS(sessionId)
        })
    }

    const stopReading = () => {
        toast('Tracking completed')
        setTracking(false)
        pause()
        reset()
        tracker.unsubscribe();
        eegTracker.unsubscribe();
        // hard coded saving
        saveSession()
    }
    return(
        <div className="h-screen bg-slate-200">
            <Header />
            <div className="flex flex-row w-screen h-screen">
                <SideMenu />
                <div className="pt-24 px-5 flex-1">
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl p-5">
                        {tracking && (
                            <div style={{textAlign: 'center'}}>
                                <div style={{fontSize: '20px'}}>
                                    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                                </div>
                            </div>
                        )}
                        {tracking 
                        ?
                            <Pulser onClick={stopReading} />
                        :
                            <>
                                <p className="mb-3">Click the button below to begin EEG data collection </p>
                                <StartButton onClick={startReading} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { authData } = state.neurosityAuth
    return {
        authData
    }
}

export default connect(mapStateToProps)(TrackPage)