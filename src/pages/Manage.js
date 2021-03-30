import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonRow } from '@ionic/react';
import { chevronDownOutline, personOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ManageMember } from '../components/ManageMember';
import { useStore } from '../stateContext/AuthContext';




export const Manage = () =>{
    const { user, susuMembers, initSusuMembers } = useStore();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalRecord, setModalRecord] = useState({});

    const management = (dataRecord) =>{
        setModalRecord(dataRecord);
        setShowModal(true);
    }

    const showMore = (event,id) =>{
        event.stopPropagation();
        let element  = document.getElementById(id);
        if (element.hidden) element.hidden = false;
        else element.hidden = true;
    }

    return(
        <IonPage className="page">
            <Header/>

            <ManageMember
                isOpen={showModal}
                onClose={()=>setShowModal(false)}
                record={modalRecord}
            />

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Manage Susu</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Manage my susu</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonItemDivider>Members</IonItemDivider>
                                    <IonList>
                                        {
                                            susuMembers.length?
                                            susuMembers.map((record, key)=>(
                                                <IonList class="item-list-container pointer flexed" onClick={()=>management(record)} key={key}>
                                                    <IonCard class="round" style={{margin:"0px"}}>
                                                        <IonIcon class="round-inner" icon={personOutline}/>
                                                    </IonCard>
                                                    <div slot="end" style={{position:"relative"}}>
                                                        <div className="float-center-left">
                                                            <b style={{whiteSpace:"nowrap"}}>{record?.info?.name}</b>
                                                            <div hidden id={`${record?.id}more`}>
                                                                <div>{record?.info?.email}</div>
                                                                <div>{record?.info?.number}</div>
                                                                <div>{record?.info?.city}, {record?.info?.address}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <IonIcon class="float-right pad-l-r" onClick={(e)=>showMore(e,`${record?.id}more`)} icon={chevronDownOutline}/>
                                                </IonList>
                                            )):
                                            <IonList class="item-list-container">
                                                <IonLabel>No Members</IonLabel>
                                            </IonList>
                                        }
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