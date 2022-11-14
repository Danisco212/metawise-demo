import React from "react";
import './pulcer_styles.css'

type PulserProps = {
    onClick: any
}

const Pulser = ({ onClick }: PulserProps) => {
    return(
        <div onClick={onClick} className="pulser">
            <p className="text-white text-lg font-bold">Click To Stop</p>
        </div>
    )
}

export default Pulser