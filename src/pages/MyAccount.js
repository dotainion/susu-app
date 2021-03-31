import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';


export const MyAccount = () =>{
    const { susuGroups } = useStore();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const onMakePayment = () =>{
        setShowAlert(true);
    };
    return(
        <IonPage className="page">
            <Header/>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert({state:false,data:null})}
                cssClass='my-custom-class'
                header={'Alert!!'}
                subHeader={'Cannot continue.'}
                message={'Payment is not yet available in your area.'}
                buttons={["okay"]}
            />

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Account</IonLabel>
                                    </IonItem>
                                    <div className="sub-header">My account</div>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonList>
                                        <IonItemDivider color="primary"><b>My Susu Groups</b></IonItemDivider>
                                        <IonList>
                                            {
                                                susuGroups.length?
                                                susuGroups.map((group, key)=>(
                                                    <IonList class="item-list-container pointer" key={key}>
                                                        <div style={{color:"dodgerblue"}}>
                                                            <b>{group?.susuName}</b>
                                                        </div>
                                                        <div>{group?.city}</div>
                                                        <div>{group?.address}</div>
                                                        <div>{group?.number}</div>
                                                        <div>{group?.email}</div>
                                                        <IonList class="mini-list-scroll">
                                                            <IonItemDivider color="medium">breakdown of transactions</IonItemDivider>
                                                            {
                                                                group?.deposit?.map((dep, key)=>(
                                                                    <IonList class="item-list-container" key={key}>
                                                                        <IonLabel style={{float:"left"}}>{tools.handleDate(dep?.date)}</IonLabel>
                                                                        <IonLabel style={{float:"right"}}>${dep?.amount}</IonLabel>
                                                                    </IonList>
                                                                ))
                                                            }
                                                        </IonList>
                                                        <IonItemDivider color="medium">Make Deposit</IonItemDivider>
                                                        <IonItem lines="full">
                                                            <IonButton fill="outline" onClick={()=>onMakePayment(group)} slot="start">Payment</IonButton>
                                                        </IonItem>
                                                    </IonList>
                                                )):
                                                <IonList class="item-list-container pointer">
                                                    <IonLabel>Not in any group</IonLabel>
                                                </IonList>
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