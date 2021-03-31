import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { Header } from '../components/Header';
import { startSusu } from '../database/FirestoreDb';
import { useStore } from '../stateContext/AuthContext';
import { ItemSelect } from '../widgets/ItemSelect';


export const CreateSusu = () =>{
    const { user } = useStore();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const nameRef = useRef();
    const costRef = useRef();
    const dueDateRef = useRef();
    const durationRef = useRef();

    const clearFeilds = () =>{
        nameRef.current.value = "";
        costRef.current.value = "";
        dueDateRef.current.value = "";
        durationRef.current.value = "";
    }

    const onSubmit = async() =>{
        setError("");
        setSuccess("");
        if (nameRef.current.value || costRef.current.value || durationRef.current.value){
            const startData = {
                start: true,
                susuName: nameRef.current.value?.toLowerCase?.() || "",
                costPerMonth: costRef.current.value?.toLowerCase?.() || "",
                dueDate: dueDateRef.current.value?.toLowerCase?.() || "",
                duration: durationRef.current.value?.toLowerCase?.() || ""
            }
            const response = await startSusu(startData,user?.id);
            if (response) setSuccess("Susu Started");
            else setError("Susu already started");
            clearFeilds();
        }else setError("All fields must be entered");
    }
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
                                        <IonLabel>Create Susu Group</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Start a susu</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonItemDivider>Requirements</IonItemDivider>
                                    <IonItem>
                                        <IonLabel position="floating">Name of Group</IonLabel>
                                        <IonInput ref={nameRef}/>
                                    </IonItem>
                                    <ItemSelect
                                        label="Duration time"
                                        itemSelectRef={durationRef}
                                        options={["3 months","6 months","1 year"]}
                                    />
                                    <ItemSelect
                                        label="Due date per month"
                                        itemSelectRef={dueDateRef}
                                        options={["1st","5th","15th","20th","month end"]}
                                    />
                                    <IonItem>
                                        <IonLabel position="floating">Cost per month</IonLabel>
                                        <IonInput ref={costRef} type="number" class="price-input"/>
                                    </IonItem>
                                    <IonList>
                                        <IonCard onClick={onSubmit} class="round item-center" style={{marginTop:"20px"}}>
                                            <div className="round-inner">
                                                <IonLabel className="floating-center">START</IonLabel>
                                            </div>
                                        </IonCard>
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