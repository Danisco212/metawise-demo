import React from "react";

type SizedProps = {
    width?: number
    height?: number
}
export const SizedBox = ({width = 0, height = 0}: SizedProps) => {
    return (
        <div style={{width, height}} />
    )
}