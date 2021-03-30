import { IonButton, IonCardContent, IonContent, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonModal, useIonViewWillEnter } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { updateSusuMembers } from '../database/FirestoreDb';
import { useStore } from '../stateContext/AuthContext';



export const ManageMember = ({isOpen, onClose, record}) =>{
    const { user, susuMembers, initSusuMembers } = useStore();

    const [lastDeposit, setLastDeposit] = useState("");
    const [totalDeposit, setTotalDeposit] = useState("");
    const [showDepositList, setShowDepositList] = useState([]);
    const [showTotalDeposit, setShowTotalDeposit] = useState({state:false,text:"Deposits"});
    const [showApplyDeposit, setShowApplyDeposit] = useState(false);

    const depositRef = useRef();

    const appyDeposit = async() =>{
        let index = 0;
        let instanseMember = JSON.parse(JSON.stringify(susuMembers));
        for (let dRecord of instanseMember || []){
            if (dRecord?.id === record?.id){
                let newInstant = instanseMember?.[index]?.deposit || [];
                newInstant.push({
                    date: new Date().getTime(),
                    amount: depositRef.current.value,
                });
                instanseMember[index]["deposit"] = newInstant;
                await updateSusuMembers({members:instanseMember}, user?.id);
                await initSusuMembers();
                break;
            }
            index ++;
        }
    }
    const initAllDepositList = () =>{
        for (let aRecord of susuMembers || []){
            if (aRecord?.id === record?.id){  
                setShowDepositList(aRecord?.deposit || []);
                //calc the total of the deposits
                let total = 0;
                for (let dep of aRecord?.deposit || []){
                    total = total + parseFloat(dep?.amount) || 0;
                }
                setTotalDeposit(total);
                //set last depost
                const lastDep = aRecord?.deposit?.[aRecord?.deposit?.length -1];
                if (lastDep?.date) setLastDeposit(`${handleDate(lastDep?.date)}, $${lastDep?.amount}`);
            }
        }    
    }
    const onView = () =>{
        initAllDepositList();
    };
    const handleDate = (date) =>{
        const newD = new Date(date).toDateString();
        const newT = new Date(date).toLocaleTimeString();
        return newD +" - "+ newT;
    }
    const toggleTotalDeposit = () =>{
        if (showTotalDeposit.state) setShowTotalDeposit({state:false,text:"Deposits"});
        else setShowTotalDeposit({state:true,text:"Close Deposits"});
    }
    //listen for change and recall
    useEffect(()=>{
        initAllDepositList();
    },[susuMembers])
    return(
        <IonModal isOpen={isOpen} onWillPresent={onView} onDidDismiss={onClose}>
            <IonIcon class="close" onClick={onClose} icon={closeOutline}/>
                <IonItem class="header" lines="none">
                    <IonLabel>Manage</IonLabel>
                </IonItem>
                <IonList class="sub-header" lines="none">
                    <IonLabel>Account of <b style={{color:"dodgerblue"}}>{record?.info?.name}</b></IonLabel>
                </IonList>
                <IonContent>
                    <IonCardContent>
                        <IonItemDivider>Apply Deposit</IonItemDivider>
                        <IonItem lines="full">
                            <span hidden={!showApplyDeposit} slot="start" className="float-center-left" style={{marginLeft:"7px"}}>$</span>
                            <IonButton hidden={showApplyDeposit} onClick={()=>setShowApplyDeposit(true)} fill="outline" slot="start">Add Deposit</IonButton>
                            <input hidden={!showApplyDeposit} ref={depositRef} slot="start" placeholder="Enter deposit amount" type="number" className="none-ion-input"/>
                            <IonButton hidden={!showApplyDeposit} onClick={appyDeposit} fill="outline" slot="start">Save</IonButton>
                            <IonButton hidden={!showApplyDeposit} onClick={()=>setShowApplyDeposit(false)} fill="outline" slot="start">Cancel</IonButton>
                        </IonItem>
                        <IonItemDivider>Last Transaction</IonItemDivider>
                        <IonItem lines="full">
                            <IonLabel>{lastDeposit || "$0"}</IonLabel>
                        </IonItem>
                        <IonItemDivider>Total Transactions</IonItemDivider>
                        <IonItem lines="full">
                            <IonLabel>${totalDeposit}</IonLabel>
                        </IonItem>
                        <IonItemDivider>All Deposits</IonItemDivider>
                        <IonItem lines="full">
                            <IonButton onClick={toggleTotalDeposit} fill="outline">{showTotalDeposit.text}</IonButton>
                        </IonItem>
                        <IonList hidden={!showTotalDeposit.state}>
                            {
                                showDepositList.map((deposit, key)=>(
                                    <IonList class="item-list-container pointer" key={key}>
                                        <IonLabel style={{float:"left"}}>{handleDate(deposit?.date)}</IonLabel>
                                        <IonLabel style={{float:"right"}}>${deposit?.amount}</IonLabel>
                                    </IonList>
                                ))
                            }
                        </IonList>
                    </IonCardContent>
                </IonContent>
            
        </IonModal>
    )
}