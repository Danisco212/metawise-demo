import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { StartButton } from "../../components";
import Header from "../../components/Header";
import Pulser from "../../components/Pulser/Pulser";
import { SideMenu } from "../../components/SideMenu";

let notion:any
const TrackPage = (props: any) => {
    const [tracking, setTracking] = useState(false)
    const [trackedData, setTrackedData] = useState<any>([])
    const randomIntFromInterval = (min: number, max: number) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    useEffect(() => {
        return () => {
            if(notion){
                startReading()
            }
        }
    }, [])
    const startReading = () => {
        if(props.authData){
            setTracking(true)
            notion = props.authData.notion.brainwaves("powerByBand").subscribe((brainwaves: any) => {
                setTrackedData((prev: any) => [...prev, brainwaves])
            });
        }
    }

    const stopReading = () => {
        toast('Tracking completed')
        setTracking(false)
        notion.unsubscribe();
        console.log('the tracked data is', trackedData);
        // hard coded saving
        axios.post("localhost:5676", trackedData)
        .then(res => toast("Data saved successfully"))
        .catch(err => toast.error("Data failed to save"))
    }
    return(
        <div className="h-screen bg-slate-200">
            <Header />
            <div className="flex flex-row w-screen h-screen">
                <SideMenu />
                <div className="pt-24 px-5 flex-1">
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl p-5 h-72">
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