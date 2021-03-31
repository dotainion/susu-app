import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Header } from '../components/Header';


export const Settings = () =>{
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return(
        <IonPage className="page">
            <Header/>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Settings</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonIcon style={{fontSize:"50px"}} icon={constructOutline}/>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}