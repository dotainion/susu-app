import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import img from '../images/save.jpg';


export const Welcome = () =>{
    const { user } = useStore();
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
                                        <IonLabel>Welcome to the susu app</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Hi {tools.capitalize(user?.name)}, We appreciate you for choosing this app. we do hope you enjoy our service.</IonLabel>
                                    </IonList>
                                    <IonList>
                                        <IonImg class="welcome-logo" src={img}/>
                                    </IonList>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}