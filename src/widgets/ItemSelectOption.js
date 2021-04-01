import { options } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';



export const ItemSelectOption = ({options, label, inputRef}) =>{
    return(
        <div className="input-settings-container">
            <div>{label}</div>
            <div className="parent-select">
                <select ref={inputRef} className="input-settings input-opt">
                    <option hidden defaultChecked>{inputRef?.current?.value}</option>
                    {
                        options.map((option, key)=>(
                            <option key={key}>{option}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}