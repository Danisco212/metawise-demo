// @ts-nocheck
import React, { useEffect, useState } from "react";
import { logo, profileImg } from "../assets";
import { AiOutlineLogout } from 'react-icons/ai'
import { useCookies } from "react-cookie"
import { connect } from "react-redux";
import { useNotion } from "../contexts/NotionContext";
import detectEthereumProvider from "@metamask/detect-provider";
import UnconsciousEnergyToken from '../pages/Web3/abis/UnconsciousEnergyToken.json';
import  MetaMaskAuth  from "./Metamaskauth"
import Web3 from "web3";
import axios from "axios";
import { CONFIG } from "../utils/ApiHelper";
import { toast } from "react-toastify";

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
    const [notion, setNotion] = useState(null)
    const [UETBalance, setUETBalance] = useState('')
    const [wallet, setWallet] = useState()
    const [tokens, setTokens] = useState('')
    const [loading, setLoading] = useState(false)
    const [UET, setUET] = useState(null)

    const mintTokens = () => {
        let finalAmount = window.web3.utils.toWei(tokens, 'Ether')
        setLoading(true)
        UET.methods.mint2(wallet, finalAmount).send({from: wallet}).on('transactionHash', (hash) => {
            setLoading(false)
            clearUnclaimed()
            toast('Congrats! You have minted some $UE')
        })
    }

    const clearUnclaimed = () => {
        axios.post(CONFIG.claimTokens, {walletId: wallet})
        .then(async data => {
            console.log(data.data)
            if(data?.data?.data){
                setTokens(data.data.data.current_amount)
            }
            try {
                let mUETBalance = await UET.methods.balanceOf(wallet).call();
                setUETBalance(window.web3.utils.fromWei(mUETBalance.toString(), 'Ether'))
            } catch (error) {
                console.log(error)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getUnclaimed = () => {
        axios.get(CONFIG.getUnclaimed + wallet)
        .then(data => {
            if(data?.data?.data){
                setTokens(data.data.data.current_amount.toString())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if(wallet){
            getUnclaimed()
            setInterval(getUnclaimed, 5000)
        }
    }, [wallet])
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
        setWallet(accounts[0])
        const networkId = await web3.eth.net.getId();

        const UETData = UnconsciousEnergyToken.networks[networkId];
        if (UETData) {
            const mUET = new web3.eth.Contract(UnconsciousEnergyToken.abi, UETData.address);
            setUET(mUET)
            let mUETBalance = await mUET.methods.balanceOf(accounts[0]).call();
            setUETBalance(window.web3.utils.fromWei(mUETBalance.toString(), 'Ether'))
        } else {
            alert('Error!  UnconsciousEnergyToken contract not deployed - no detected network!')
        }
    }
    useEffect(() => {
        // console.log(props.authData)
        try {
            setNotion(props.authData.notion)
        } catch (error) {
            console.log(error)
        }
    }, [props])
    // const notion = useNotion()
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
        if(notion){
            notion.status().subscribe((status: any) => {
                console.log('notion status', status)
                setNotionStatus(status)
            })
        }
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
                <p className="font-bold text-sm">Metawise Dojo</p>
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
            {(tokens.length > 0 && parseFloat(tokens) !== 0) && (
                <div className="flex flex-row items-center">
                    <p title={tokens}>Unclaimed $UE: {tokens.substring(0, 6)}</p>
                    <button onClick={loading ? () => {} :mintTokens} className={`${loading ? 'bg-gray-500' : 'bg-purple-500'} ml-3 rounded text-white py-2 px-5`}>Claim</button>
                </div>
            )}
            
            <div className="flex flex-row items-center">
                <img className="mr-1 w-10 h-10 rounded-full resize" src={profileImg} alt="" />
                <p className="mr-5 text-xs text-neutral-400">{notion?.api?.user?.email} <p title={UETBalance}>({UETBalance.substring(0, 7)}$UE)</p> </p>
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