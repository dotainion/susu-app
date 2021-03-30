import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { useStore } from '../stateContext/AuthContext';


export const MyAccount = () =>{
    const { susuGroups } = useStore();

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
                                        <IonLabel>Account</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>My account</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonList>
                                        <IonItemDivider>Last Transactions</IonItemDivider>
                                        <IonItem lines="full">

                                        </IonItem>
                                        <IonItemDivider>Total Transactions</IonItemDivider>
                                        <IonItem lines="full">

                                        </IonItem>
                                        <IonItemDivider>breakdown of transactions</IonItemDivider>
                                        <IonItem lines="full">

                                        </IonItem>
                                        <IonItemDivider>Make Deposit</IonItemDivider>
                                        <IonItem lines="full">
                                            <IonButton fill="outline" slot="start">Payment</IonButton>
                                        </IonItem>
                                        <div style={{marginTop:"20px",paddingBottom:"5px",textAlign:"center",borderBottom:"1px solid lightgray"}}><b>My Susu Groups</b></div>
                                        <IonList style={{textAlign:"center"}}>
                                            {
                                                susuGroups.map((group, key)=>(
                                                    <IonCard class="groups-item" key={key}>
                                                        <div className="groups-item-inner">
                                                            {console.log(group)}
                                                            <IonLabel class="list-block"><b>{group?.susuName}</b></IonLabel>
                                                            <IonLabel class="list-block">{group?.city}</IonLabel>
                                                            <IonLabel class="list-block">{group?.address}</IonLabel>
                                                            <IonLabel class="list-block">{group?.number}</IonLabel>
                                                            <IonLabel class="list-block">{group?.email}</IonLabel>
                                                        </div>
                                                    </IonCard>
                                                ))
                                            }
                                        </IonList>
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