import React from 'react';



export const ItemInput = ({label, type, color, disabled, inputRef, placeholder}) =>{
    return(
        <div
            onClick={(e)=>e.stopPropagation()}
            className="input-settings-container"
            style={{color:color}}>
            <div>{label}</div>
            <input 
                disabled={disabled} 
                type={type} 
                ref={inputRef} 
                placeholder={placeholder} 
                className="input-settings"
                style={{borderColor:color}}
            />
        </div>
    )
}