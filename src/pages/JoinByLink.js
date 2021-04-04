import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Header } from '../components/Header';
import { getMember, joinSusuByLink } from '../database/FirestoreDb';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';



export const JoinByLink = () =>{
    const { user, initSusuGroups } = useStore();

    const history = useHistory();

    const [error, setError] = useState("");
    const [joinById, setJoinById] = useState("");
    const [joinByLink, setJoinByLink] = useState({
        susuName:"",
        costPerMonth:"",
        dueDate:"",
        duration:""
    });

    const join = async() =>{
        const response = await joinSusuByLink(joinById, user);
        if (!response) return setError("Already a mumber");
        await initSusuGroups();
        tools.alert(true,"You are now part of this group");
        history.push(routes?.myAccount);
    }

    const initJoinByLink = async(id) =>{
        setJoinById(id);
        const susuAcc = await getMember(id);
        setJoinByLink({
            susuName:susuAcc?.susuName,
            costPerMonth:susuAcc?.costPerMonth,
            dueDate:susuAcc?.dueDate,
            duration:susuAcc?.duration,
        });
    }

    useEffect(()=>{
        const fullPath = history.location.pathname;
        const param = routes.param.replace(":id","");
        const path = fullPath.replace(param,"");
        const id = path.replace(":","");
        initJoinByLink(id);
    },[]);
    return(
        <IonPage>
            <Header/>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <div className="background-extra-len">
                                <IonCard class="floating-center">
                                    <IonCardContent>
                                        <IonItem class="sub-header" style={{fontSize:"18px"}} lines="full">
                                            <IonLabel>Join this susu by link</IonLabel>
                                        </IonItem>
                                        <div className="error">{error}</div>
                                        <div className="tag-container" style={{fontSize:"15px",color:"black",padding:"10px"}}>
                                            <div>
                                                <div className="text-nowrap pad-l-r">Susu Name</div>
                                                <div className="text-nowrap pad-l-r">Cost Per Month</div>
                                                <div className="text-nowrap pad-l-r">Due Per Month</div>
                                                <div className="text-nowrap pad-l-r">Duration</div>
                                            </div>
                                            <div>
                                                <div className="text-nowrap pad-l-r"><b>{joinByLink?.susuName}</b></div>
                                                <div className="text-nowrap pad-l-r">{joinByLink?.costPerMonth}</div>
                                                <div className="text-nowrap pad-l-r">{joinByLink?.dueDate}</div>
                                                <div className="text-nowrap pad-l-r">{joinByLink?.duration}</div>
                                            </div>
                                        </div>
                                        <IonItem>
                                            <IonButton slot="end" onClick={join} fill="outline">Join</IonButton>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}