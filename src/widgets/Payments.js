import { IonButton, IonCardContent, IonIcon, IonItem, IonList } from '@ionic/react';
import { getStates } from 'country-state-picker';
import { closeOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { CardInput } from './CardInput';
import { ItemInput } from './ItemInput';
import { ItemSelectOption } from './ItemSelectOption';


export const Payments = ({record, isOpen, onClose, onSubmit}) =>{
    const { user } = useStore();

    const [isCardError, setIsCardError] = useState(true);

    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();
    const cardRef = useRef();

    const setError = (refObject) =>{
        refObject.style.color = "red";
        refObject.style.border = "1px solid red";
    }

    const resetError = (refObject) =>{
        refObject.style.color = "#428cff";
        refObject.style.border = "1px solid #428cff";
    }

    const isValidated = () =>{
        let ISVALID = true;
        if (!nameRef.current.value){
            setError(nameRef.current);
            ISVALID = false;
        }
        if (!tools.validateEmail(emailRef.current.value)){
            setError(emailRef.current);
            ISVALID = false;
        }
        if (!cityRef.current.value){
            setError(cityRef.current);
            ISVALID = false;
        }
        if (!addressRef.current.value){
            setError(addressRef.current);
            ISVALID = false;
        }
        if (tools.isNumber(numberRef.current.value)){
            const newNumber = tools.validateNumber(numberRef.current.value)
            if (newNumber) numberRef.current.value = newNumber;
            else{
                setError(numberRef.current);
                ISVALID = false;
            }
        }else{
            setError(numberRef.current);
            ISVALID = false;
        }
        if (isCardError) ISVALID = false;
        return ISVALID;
    }

    const submitPaymentDetail = () =>{
        if (isValidated()){
            const card = cardRef.current.value;
            const object = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                number: numberRef.current.value,
                city: cityRef.current.value,
                address: addressRef.current.value,
                cardNumber: card.number,
                expiry: card.expiry,
                cvc: card.cvc
            }
            onSubmit?.(object);
        }
    }

    useEffect(()=>{
        nameRef.current.value = tools.capitalize(user?.name);
        emailRef.current.value = user?.email;
        numberRef.current.value = user?.number;
        cityRef.current.value = tools.capitalize(user?.city);
        addressRef.current.value = tools.capitalize(user?.address);
    },[]);

    return(
        <IonList hidden={!isOpen} className="backdrop backdrop-color">
            <IonList onClick={(e)=>e.stopPropagation()} class="floating-center pay-card">
                <IonIcon class="close rounded" onClick={onClose} icon={closeOutline}/>
                <IonCardContent>
                    <IonList class="header-bg-style">
                        <div>Make payment to {record?.susuName}</div>
                    </IonList>
                    <ItemInput inputRef={nameRef} onChange={()=>resetError(nameRef.current)} type="text" label="Card Holder Name" color="#428cff" placeholder="Enter card holder name"/>
                    <ItemInput inputRef={emailRef} onChange={()=>resetError(emailRef.current)} type="email" label="Email" color="#428cff" placeholder="Enter email"/>
                    <ItemInput inputRef={numberRef} onChange={()=>resetError(numberRef.current)} type="number" label="Phone Number" color="#428cff" placeholder="Enter phone number"/>                    
                    <ItemSelectOption inputRef={cityRef} onChange={()=>resetError(cityRef.current)} label="City" color="#428cff" options={getStates("gd")} style={{padding:"9px"}}/>
                    <ItemInput inputRef={addressRef} onChange={()=>resetError(addressRef.current)} type="text" label="Address" color="#428cff" placeholder="Enter address"/>
                    <CardInput cardRef={cardRef} label="Card Number" color="#428cff" onError={(isvalid)=>setIsCardError(isvalid)}/>
                    <IonItem>
                        <IonButton fill="outline" onClick={submitPaymentDetail} slot="end">Pay ${record?.costPerMonth}</IonButton>
                    </IonItem>
                </IonCardContent>
            </IonList>
        </IonList>
    )
}