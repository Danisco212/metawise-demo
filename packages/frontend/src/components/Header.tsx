// @ts-nocheck
import React, { useEffect, useState } from "react";
import { logo, profileImg } from "../assets";
import { AiOutlineLogout } from 'react-icons/ai'
import { useCookies } from "react-cookie"
import { connect } from "react-redux";
import { useNotion } from "../contexts/NotionContext";
import  MetaMaskAuth  from "./Metamaskauth"


type NotionStatus = {
    battery: number
    charging: boolean
    claimedBy: string
    lastHeartbeat: number
    onlineSince: number
    sleepMode: boolean
    ssid: string
    state: string
}
export const Header = (props: any) => {
    const notion = useNotion()
    const [notionStatus, setNotionStatus] = useState<NotionStatus>({
        battery: 0,
        charging: false,
        claimedBy: '',
        lastHeartbeat: 0,
        onlineSince: 0,
        sleepMode: false,
        ssid: '',
        state: 'connecting...'
    })
    useEffect(() => {
        notion.status().subscribe((status: any) => {
            console.log('notion status', status)
            setNotionStatus(status)
        })
    }, [notion])
    const [cookie, setCookie] = useCookies(['metawise_auth', 'metawise_user'])
    const logout = async () => {
        setCookie('metawise_auth', '', {path: '/'})
        setCookie('metawise_user', '', {path: '/'})
        await notion.logout()
        window.location.href = '/'
    }
    return(
        <header className="shadow z-10 fixed bg-white p-10 max-h-10 w-screen flex flex-row items-center justify-between">
            <div className="cursor-pointer flex flex-row items-center">
                <img className=" rounded-full h-7 w-7 mr-2" src={logo} alt='' />
                <p className="font-bold text-sm">Metawise</p>
            </div>
            {notionStatus && (
                <div className="flex flex-row items-center justify-center">
                    <div className={"rounded-full h-4 w-4 " + (notionStatus.state !== 'online' ? 'bg-red-500' : 'bg-green-500')} /> {/* status symbol */}
                    <p className="mr-3 ml-1 text-sm">{notionStatus.state}</p>
                    <p className="text-sm">{notionStatus.battery}%</p>
                </div>
            )}
            <div>
                <MetaMaskAuth></MetaMaskAuth>
            </div>
            <div className="flex flex-row items-center">
                <img className="mr-1 w-10 h-10 rounded-full resize" src={profileImg} alt="" />
                <p className="mr-5 text-xs text-neutral-400">{notion?.api?.user?.email}</p>
                <AiOutlineLogout onClick={logout} size={25} className="cursor-pointer" />
            </div>
        </header>
    )
}

const mapStateToProps = (state: any) => {
    const {loading, authData, error} = state.neurosityAuth
    return {
        loading, authData, error
    }
}

export default connect(mapStateToProps)(Header)