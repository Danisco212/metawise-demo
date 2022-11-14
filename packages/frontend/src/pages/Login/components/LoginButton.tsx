import React from "react";

type LoginProps = {
    label: string
    onClick: any
}
export const LoginButton = ({label, onClick}: LoginProps) => {
    return (
        <button className="login-btn" onClick={onClick}>
            {label}
        </button>
    )
}