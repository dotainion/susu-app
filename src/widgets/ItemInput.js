import React from 'react';



export const ItemInput = ({label, disabled, inputRef}) =>{
    return(
        <div className="input-settings-container">
            <div>{label}</div>
            <input disabled={disabled} ref={inputRef} className="input-settings"/>
        </div>
    )
}