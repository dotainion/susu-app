import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonModal, IonPopover, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';


export const Header = () =>{
    const { signOut } = useStore();
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState(false);
    const cap = () =>{
        return history.location.pathname.replace("/","").replace("-"," ");
    }
    const taggleDropdown = () =>{
        if (showDropdown)setShowDropdown(false);
        else setShowDropdown(true);
    }
    return(
        <IonHeader class="bg">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonTitle>{tools.capitalize(cap())}</IonTitle>
                <IonItem slot="end" lines="none">
                    <IonIcon onClick={taggleDropdown} class="settigns-btn" icon={ellipsisVerticalOutline}/>
                </IonItem>
            </IonToolbar>
            <IonList hidden={!showDropdown} onClick={taggleDropdown} className="backdrop">
                <IonList className="float-right">
                    <IonLabel onClick={signOut} className="pointer list-block">Logout</IonLabel>
                </IonList>
            </IonList>
        </IonHeader>
    )
}