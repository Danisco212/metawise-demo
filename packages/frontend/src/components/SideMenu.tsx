import React from "react";
import { profileImg } from "../assets";
import { SideMenuItem } from "./SideMenuItem";
import { MdTrackChanges } from 'react-icons/md'
import { StartButton } from "./StartButton";
import { useCookies } from "react-cookie";

export const SideMenu = () => {
    const [cookies] = useCookies(['metawise_user'])
    return(
        <div className="relative pt-28 bg-white w-64 self-stretch">
            <div className="px-5 flex flex-row items-center">
                <img alt="" src={profileImg} className="mr-5 w-16 h-16 rounded-full" />
                <div>
                    <p className="font-medium text-m">Hello There,</p>
                    <p className="text-neutral-400 text-xs">{cookies.metawise_user}</p>
                </div>
            </div>
            <p className="mx-5 mb-2 mt-5 text-neutral-400 text-sm">MENU</p>
            <SideMenuItem icon={<MdTrackChanges color="purple" size={25} />} label="Track EEG" />

            <div className="absolute bottom-10 mx-3 flex flex-col items-center px-2 py-4 bg-slate-100 rounded-2xl">
                <p className="text-center mb-2">Ready to dive into a meditative state?</p>
                <StartButton />
            </div>
        </div>
    )
}