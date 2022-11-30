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

const TrackPage = (props: any) => {
    const notion = useNotion()
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
                            // <div className="flex flex-col items-center justify-center">
                            //     <LineGraph />
                            //     <button className="text-white text-sm px-2 py-1 rounded-2xl bg-purple-500" onClick={stopReading}>Stop Tracking</button>
                            // </div>
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