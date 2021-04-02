import { IonButton, IonCardContent, IonIcon, IonItem, IonList } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { ItemInput } from './ItemInput';


export const Payments = ({record, isOpen, onClose, onSubmit}) =>{
    return(
        <IonList hidden={!isOpen} className="backdrop backdrop-color">
            <IonList onClick={(e)=>e.stopPropagation()} class="floating-center pay-card">
                <IonIcon class="close rounded" onClick={onClose} icon={closeOutline}/>
                <IonCardContent>
                    <IonList class="header-bg-style">
                        <div>Make payment to {record?.susuName}</div>
                    </IonList>
                    <ItemInput type="text" label="Card Holder Name" color="#428cff" placeholder="Enter card holder name"/>
                    <ItemInput type="email" label="Email" color="#428cff" placeholder="Enter email"/>
                    <ItemInput type="number" label="Phone Number" color="#428cff" placeholder="Enter phone number"/>
                    <ItemInput type="text" label="City" color="#428cff" placeholder="Enter city"/>
                    <ItemInput type="text" label="Address" color="#428cff" placeholder="Enter address"/>
                    <ItemInput type="number" label="Payment" color="#428cff" placeholder="Enter card number"/>
                    <IonItem>
                        <IonButton fill="outline" onClick={onSubmit} slot="end">Pay ${record?.costPerMonth}</IonButton>
                    </IonItem>
                </IonCardContent>
            </IonList>
        </IonList>
    )
}