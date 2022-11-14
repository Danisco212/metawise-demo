import React, { ChangeEventHandler } from "react";

type InputProps = {
    value: string
    onChange: ChangeEventHandler;
}
export const FormInput = ({value, onChange}: InputProps) => {
    return (
        <input style={{
            color: '#0F1223',
            height: 40,
            paddingLeft: 10,
            paddingRight: 10,
            outline: 'none',
            width: 300,
            borderWidth: 0,
            borderRadius: 10,
        }} value={value} onChange={onChange}/>
    )
}