import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type StartButtonProps = {
    onClick?: any
}
export const StartButton = ({ onClick }: StartButtonProps) => {
    return (
        <div onClick={onClick} className="cursor-pointer w-44 h-12 flex flex-row items-center justify-center rounded-3xl bg-purple-600">
            <p className="text-white text-m mr-2">Start Session</p>
            <AiOutlinePlus color="white" />
        </div>
    )
}