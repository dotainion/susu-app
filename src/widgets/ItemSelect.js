import { IonItem, IonLabel, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';



export const ItemSelect = ({itemSelectRef, options, label, style}) =>{
    const [selected, setSelected] = useState("");
    const floatLabelRef = useRef();
    const containerRef = useRef();
    const intervalLoop = useRef();

    const floatTop = () =>{
        floatLabelRef.current.transition = "all 0.5s ease";
        floatLabelRef.current.style.marginTop = "-10px";
        floatLabelRef.current.style.fontSize = "12px";
        floatLabelRef.current.style.color = "dodgerblue";
        containerRef.current.style.borderBottom = "2px solid dodgerblue";
    }
    const focusOut = () =>{
        floatLabelRef.current.style.color = "";
        containerRef.current.style.borderBottom = "2px solid white";
        if (!selected){
            floatLabelRef.current.style.marginTop = "";
            floatLabelRef.current.style.fontSize = "";
        }
    }
    useIonViewWillLeave(()=>{
        clearInterval(intervalLoop.current);
    });
    useIonViewDidEnter(()=>{
        intervalLoop.current = setInterval(() =>{
            if (!itemSelectRef.current?.value){
                if (document.activeElement !== itemSelectRef.current){
                    try{focusOut()}catch{};
                }
            }
        }, 400);
    })
    useEffect(()=>{
        containerRef.current.style.borderBottom = "2px solid white";
    },[]);

    return(
        <IonItem onClick={floatTop} ref={containerRef} style={style} onBlur={focusOut} lines="full">
            <IonLabel ref={floatLabelRef} onClick={floatTop} class="item-select-label">{label}</IonLabel>
            <select ref={itemSelectRef} onChange={(e)=>setSelected(e.target.value)} className="item-select">
                <option hidden defaultChecked></option>
                {
                    options?.map?.((item, key)=>(
                        <option key={key}>{item}</option>
                    ))
                }
            </select>
        </IonItem>
    )
}