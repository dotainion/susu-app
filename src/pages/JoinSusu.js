import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonPopover, IonRow } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Header } from '../components/Header';
import { getSusuAccounts, sendRequest } from '../database/FirestoreDb';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { Loader } from '../widgets/Loader';



export const JoinSusu = () =>{
    const { user } = useStore();
    const [showLoader, setShowLoader] = useState(false);
    const [showPopover, setShowPopover] = useState({state:false, data:null});
    const [results, setResults] = useState([]);
    const [noResult, setNoResult] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const searchValueRef = useRef();

    const valueChecks = () =>{
        setError("")
        const value = searchValueRef.current.value;
        if (!value){
            setError("Invalid search");
            return false;
        }
        if (tools.isNumber(value)){
            //if its a nubmer validate and add area code if not exist
            const valueNum = tools.validateNumber(value);
            if (valueNum){
                searchValueRef.current.value = valueNum;
                return true;
            }
            //if numer was not validated return error
            setError("Invalid phone number");
            return false;
        }
        //return true if not a number
        return true;
    }

    const search = async() =>{
        if (valueChecks()){
            setShowLoader(true);
            const valueKey = searchValueRef.current.value;
            const records = await getSusuAccounts(valueKey.toLowerCase());
            setResults(records);
            if (records.length === 0) setNoResult("No records found");
            setShowLoader(false);
        }
    }

    const joinShouldConfirm = (record) =>{
        setShowPopover({state:true,data:record});
    }

    const joinSusu = async() =>{
        setError("");
        setSuccess("");
        const susuRecord = showPopover.data;
        setShowPopover({state:false,data:null});
        setShowLoader(true);
        const response = await sendRequest({requestBy:user?.id,requestTo:susuRecord?.id});
        if (!response) setError("Request already sent");
        else setSuccess("Request sent");
        setShowLoader(false);
    }
    const onEnterKeyPress = (e) =>{
        if (e.key === "Enter") search();
    }
    return(
        <IonPage className="page">
            <Header/>
            
            <Loader isOpen={showLoader}/>

            <IonPopover isOpen={showPopover.state} onDidDismiss={()=>setShowPopover({state:false,data:null})}>
                <IonItem>
                    <IonLabel>Send requst to join <b>{showPopover.data?.info?.susuName}</b></IonLabel>
                </IonItem>
                <IonItem>
                    <IonButton slot="end" onClick={()=>setShowPopover({state:false,data:null})} fill="outline">Cancel</IonButton>
                    <IonButton slot="end" onClick={joinSusu} fill="outline">Join</IonButton>
                </IonItem>
            </IonPopover>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container" onKeyPress={onEnterKeyPress}>
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Search available susu's</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Search susu by phone number, email, user name, susu name, city and address.</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonItem className="input-search" lines="none">
                                        <IonInput ref={searchValueRef} clearInput placeholder="Enter search here"/>
                                        <IonIcon slot="end" onClick={search} icon={searchOutline}/>
                                    </IonItem>
                                    <IonItemDivider>Available records</IonItemDivider>
                                    {
                                        results.length?
                                        results.map((record, key)=>(
                                            <IonList class="item-list-container pointer" onClick={()=>joinShouldConfirm(record)} key={key}>
                                                <div>Susu Name: <b>{record?.info?.susuName}</b></div>
                                                <div>{record?.info?.name}</div>
                                                <div>{record?.info?.email}</div>
                                                <div>{record?.info?.number}</div>
                                                <div>{record?.info?.city}, {record?.info?.address}</div>
                                            </IonList>
                                        )):
                                        <IonList class="item-list-container">
                                            <IonLabel>{noResult}</IonLabel>
                                        </IonList>
                                    }
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}