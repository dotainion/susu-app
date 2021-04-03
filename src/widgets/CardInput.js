import React, { useEffect, useReducer, useRef, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import 'styled-components';

export const CardInput = ({cardRef, label, color, onError}) =>{
    const [number, setNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const handleNumber = (e) =>{
        const cardNumber = e.target.value;
        setNumber(cardNumber);
        onError?.(false);
    }
    const handleExpiry = (e) =>{
        const cardNumber = e.target.value;
        setExpiry(cardNumber);
        onError?.(false);
    }
    const handleCvc = (e) =>{
        const cardNumber = e.target.value;
        setCvc(cardNumber);
        onError?.(false);
    }
    useEffect(()=>{
        try{
            cardRef.current = {
                value: {
                    number: number,
                    expiry: expiry,
                    cvc: cvc
                }
            }
        }catch{}
    },[number,expiry,cvc]);
    return(
        <div onClick={(e)=>e.stopPropagation()} style={{marginTop:"5px"}}>
            <div style={{color: color}}>{label}</div>
            <CreditCardInput
                cardNumberInputProps={{
                    value: number,
                    onChange: handleNumber
                }}
                cardExpiryInputProps={{
                    value: expiry,
                    onChange: handleExpiry
                }}
                cardCVCInputProps={{
                    value: cvc,
                    onChange: handleCvc
                }}
                containerStyle={{
                    borderRadius: "5px",
                    color: color
                }}
                fieldStyle={{
                    border: "1px solid dodgerblue",
                }}
                onError={()=>onError?.(true)}
            />
        </div>
    )
}