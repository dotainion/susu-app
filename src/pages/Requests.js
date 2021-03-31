import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonPopover, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { acceptRequest, declineRequest } from '../database/FirestoreDb';
import { useStore } from '../stateContext/AuthContext';
import { Loader } from '../widgets/Loader';


export const Requests = () =>{
    const { user, initPendingRequests, initSusuMembers } = useStore();
    const { pendingRequest } = useStore();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [showPopover, setShowPopover] = useState({state:false,data:null});

    const accept = async() =>{
        setShowLoader(true);
        const reqRecord = showPopover.data;
        setShowPopover({state:false, data:null});
        const res = await acceptRequest(reqRecord,user?.id);
        if (res){
            await initPendingRequests();
            await initSusuMembers();
            setSuccess("Member added");
        }else setError("Already one of you member");
        setShowLoader(false);
    }
    const decline = async() =>{
        setShowLoader(true);
        const reqRecord = showPopover.data;
        setShowPopover({state:false, data:null});
        const response = await declineRequest(reqRecord?.reqDocId);
        if (response){
            await initPendingRequests();
            setSuccess("Redord declined");
        }else setError("Something went wrong");
        setShowLoader(false);
    }
    return(
        <IonPage className="page">
            <Header/>
            
            <Loader isOpen={showLoader}/>

            <IonAlert
                isOpen={showPopover.state}
                onDidDismiss={() => setShowPopover({state:false,data:null})}
                cssClass='my-custom-class'
                header={'Susu Request'}
                subHeader={'Requsting to be part of your susu.'}
                message={'Click outside of this box to if you unable to make a decision now.'}
                buttons={[
                    {
                        text: 'Decline',
                        handler: () => {
                            decline();
                        }
                    },{
                        text: 'Accept',
                        handler: () => {
                            accept();
                        }
                    }
                ]}
            />

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Requests</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Members requsting to join your susu service.</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonItemDivider>Pending requests</IonItemDivider>
                                    <IonList>
                                        {
                                            pendingRequest.length?
                                            pendingRequest.map((record, key)=>(
                                                <IonList class="item-list-container pointer" onClick={()=>setShowPopover({state:true,data:record})} key={key}>
                                                    <div><b>{record?.info?.name}</b></div>
                                                    <div>{record?.info?.email}</div>
                                                    <div>{record?.info?.number}</div>
                                                    <div>{record?.info?.city}, {record?.info?.address}</div>
                                                </IonList>
                                            )):
                                            <IonList class="item-list-container">
                                                <IonLabel>No Requests</IonLabel>
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