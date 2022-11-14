import React, { ReactElement } from "react";
import { AiFillCaretRight } from 'react-icons/ai'

type SideMenuItemProps = {
    label: string
    icon: ReactElement
}
export const SideMenuItem = ({icon, label}: SideMenuItemProps) => {
    return (
        <div className="cursor-pointer flex flex-row items-center mx-0 px-0">
            <AiFillCaretRight color="purple" />
            <div className="mx-2">
                {icon}
            </div>
            <p className="text-m font-medium text-purple-800">{label}</p>
        </div>
    )
}